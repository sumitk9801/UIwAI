import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
import { gemini } from "../utils/gemini.js";
import { openRouter } from "../utils/openRouter.js";
import { validateReactComponent } from "../validators/reactValidator.js";

const componentSystemPrompt = `
You are a senior React UI engineer.

Return ONLY a valid JSON object.

Do NOT return:
- Markdown
- Triple backticks
- Explanations
- Notes
- Comments

Output format:

{
  "name": "ComponentName",
  "code": "Complete React Component",
  "props": ["prop1","prop2"]
}

Rules:
- act as a best ui desginer and developer 
-understand the need and then design the component accordingly(if prompt is too shot then make it more descriptive and then design the component from  best of your skills but optimally)
- Use React functional component.
- Export using: export const ComponentName = ({ ...props }) => { ... }
- Import only from "react".
- No Tailwind.
- No CSS files.
- No styled-components.
- No external libraries.
- Inline styles only.
- Component must be self-contained.
- Every prop must have a default value.
- Return complete JSX.
- The JSON must be directly parsable using JSON.parse().
`;

const extractJson = (text) => {
  if (typeof text !== "string") {
    throw new Error("AI response is not a string.");
  }

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");

  if (first === -1 || last === -1 || last <= first) {
    throw new Error("No JSON object found in AI response.");
  }

  return cleaned.substring(first, last + 1);
};

const parseAiResponse = (response) => {
  if (response && typeof response === "object") {
    return response;
  }

  const jsonText = extractJson(response);

  try {
    return JSON.parse(jsonText);
  } catch (err) {
    console.error("========== AI RAW RESPONSE ==========");
    console.error(response);
    console.error("========== EXTRACTED JSON ==========");
    console.error(jsonText);
    throw new Error("AI returned invalid JSON.");
  }
};

const normalizeProps = (props) => {
  if (!props) return [];

  if (Array.isArray(props)) {
    return props.filter((p) => typeof p === "string");
  }

  if (typeof props === "string") {
    try {
      const parsed = JSON.parse(props);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {}

    return props
      .replace(/[\[\]"]/g, "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [];
};

const validateComponent = (component) => {
  if (!component) {
    throw new Error("AI returned empty response.");
  }

  if (typeof component.name !== "string" || !component.name.trim()) {
    throw new Error("Missing component name.");
  }

  if (typeof component.code !== "string" || !component.code.trim()) {
    throw new Error("Missing component code.");
  }

  component.props = normalizeProps(component.props);

  return component;
};

// Moved getAiProvider UP before askAi to avoid hoisting issues
const getAiProvider = (provider) => {
  const selected = (provider || process.env.AI_PROVIDER || "openrouter").toLowerCase();

  switch (selected) {
    case "gemini":
      return gemini;
    case "openrouter":
      return openRouter;
    default:
      throw new Error("Unsupported AI Provider.");
  }
};

// askAi is completely fine as written!
const askAi = async (providerName, messages) => {
  const provider = getAiProvider(providerName);
  return await provider(messages);
};

const repairJson = async (providerName, invalidResponse) => {
  return askAi(providerName, [
    {
      role: "system",
      content: "The following text contains invalid JSON. Return ONLY corrected JSON. No markdown. No explanation.",
    },
    {
      role: "user",
      content: invalidResponse,
    },
  ]);
};

// ==========================================
// NEW HELPER FUNCTIONS (Place these above generateComponent)
// ==========================================

// This strips out markdown backticks that the AI often sneaks into the code string
const cleanReactCode = (code) => {
  if (!code) return code;
  return code
    .replace(/```(?:jsx|javascript|js|tsx|ts)?\n?/gi, "")
    .replace(/```/g, "")
    .trim();
};

// This specifically asks the AI to fix bad React syntax, NOT bad JSON
const repairReactCode = async (providerName, invalidCode) => {
  const response = await askAi(providerName, [
    {
      role: "system",
      content: "The following React component code has syntax errors. Return ONLY the corrected raw React code. No markdown formatting, no explanations, no backticks. Just the code.",
    },
    {
      role: "user",
      content: invalidCode,
    },
  ]);
  
  // The AI might still return markdown as a text string, so we clean it again
  const textResponse = typeof response === "object" ? JSON.stringify(response) : response;
  return cleanReactCode(textResponse); 
};

// ==========================================
// UPDATED generateComponent FUNCTION
// ==========================================

export const generateComponent = async (req, res) => {
  try {
    const { prompt, provider } = req.body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const currentCredits = user.aiCredits ?? user.AiCradits ?? 0;

    if (user.role === "user" && currentCredits < 50) {
      return res.status(400).json({ message: "Not enough AI credits." });
    }

    const primaryProvider = (provider || process.env.AI_PROVIDER || "openrouter").toLowerCase();
    const backupProvider = primaryProvider === "gemini" ? "openrouter" : "gemini";

    let rawResponse = null;
    let parsed = null;
    let usedProvider = primaryProvider;

    const generateWithProvider = async (providerName) => {
      const messages = [
        { role: "system", content: componentSystemPrompt },
        { role: "user", content: prompt.trim() },
      ];
      return await askAi(providerName, messages);
    };

    // -----------------------------
    // GENERATE INITIAL RESPONSE
    // -----------------------------
    try {
      console.log(`Using AI Provider: ${primaryProvider}`);
      rawResponse = await generateWithProvider(primaryProvider);
    } catch (err) {
      console.error(`Primary Provider Failed (${primaryProvider})`, err.message);
      try {
        console.log(`Trying Backup Provider: ${backupProvider}`);
        rawResponse = await generateWithProvider(backupProvider);
        usedProvider = backupProvider;
      } catch (backupErr) {
        console.error(`Backup Provider Failed (${backupProvider})`, backupErr.message);
        return res.status(500).json({ message: "Both AI providers failed." });
      }
    }

    // -----------------------------
    // 1. PARSE & VALIDATE JSON
    // -----------------------------
    try {
      parsed = validateComponent(parseAiResponse(rawResponse));
    } catch (parseError) {
      console.warn("Initial JSON parsing failed. Attempting JSON repair...");
      try {
        const repairedResponse = await repairJson(usedProvider, rawResponse);
        parsed = validateComponent(parseAiResponse(repairedResponse));
      } catch (repairError) {
        console.error("JSON Repair Failed:", repairError);
        return res.status(500).json({
          message: "AI generated invalid JSON that could not be repaired.",
        });
      }
    }

    // -----------------------------
    // 2. CLEAN & VALIDATE REACT CODE
    // -----------------------------
    parsed.code = cleanReactCode(parsed.code);
    let validation = validateReactComponent(parsed.code);

    if (!validation.valid) {
      console.log("React validation failed, triggering React code repair...");
      try {
        const fixedCode = await repairReactCode(usedProvider, parsed.code);
        parsed.code = fixedCode;
        
        // Check if the AI actually fixed it
        validation = validateReactComponent(parsed.code);
        if (!validation.valid) {
          throw new Error("AI could not fix the React syntax.");
        }
      } catch (codeRepairErr) {
        console.error("React Code Repair Failed:", codeRepairErr.message);
        return res.status(500).json({
          message: "Generated React component had invalid syntax and could not be repaired.",
        });
      }
    }

    // -----------------------------
    // FINAL SANITY CHECKS
    // -----------------------------
    if (!parsed.code.includes("export const")) {
      return res.status(500).json({
        message: "Generated component is incomplete.",
      });
    }

    if (!parsed.code.includes("import React")) {
      parsed.code = `import React from "react";\n\n` + parsed.code;
    }

    // -----------------------------
    // DEDUCT CREDITS
    // -----------------------------
    if (user.role === "user") {
      user.aiCredits = currentCredits - 50;
      await user.save();
    }

    console.log("================================");
    console.log("Provider :", usedProvider);
    console.log("Component:", parsed.name);
    console.log("Props    :", parsed.props);
    console.log("================================");

    return res.status(200).json({
      success: true,
      parsed,
      provider: usedProvider,
      remainingCredits: user.role === "user" ? user.aiCredits : null,
    });
  } catch (err) {
    console.error("Generate Component Error");
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};