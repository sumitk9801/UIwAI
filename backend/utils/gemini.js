import axios from "axios";
import dotenv from "dotenv"
dotenv.config();
const GEMINI_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const buildContents = (messages) => {
  return messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content,
        },
      ],
    }));
};

const getSystemInstruction = (messages) => {
  const systemMessage = messages.find(
    (message) => message.role === "system"
  );

  return systemMessage?.content;
};

const extractText = (data) => {
  const candidate = data?.candidates?.[0];

  if (!candidate) {
    throw new Error("Gemini returned no candidate.");
  }

  const parts = candidate.content?.parts;

  if (!Array.isArray(parts) || parts.length === 0) {
    throw new Error("Gemini returned empty content.");
  }

  return parts
    .map((part) => part.text || "")
    .join("")
    .trim();
};

export const gemini = async (messages) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    const systemInstruction = getSystemInstruction(messages);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        contents: buildContents(messages),

        systemInstruction: systemInstruction
          ? {
              parts: [
                {
                  text: systemInstruction,
                },
              ],
            }
          : undefined,

        generationConfig: {
          temperature: 0.2,

          maxOutputTokens: 2500,

          responseMimeType: "application/json",

          responseSchema: {
            type: "OBJECT",

            properties: {
              name: {
                type: "STRING",
                description:
                  "React component name",
              },

              code: {
                type: "STRING",
                description:
                  "Complete React component source code",
              },

              props: {
                type: "ARRAY",

                items: {
                  type: "STRING",
                },

                description:
                  "List of component props",
              },
            },

            required: [
              "name",
              "code",
              "props",
            ],
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",

          "x-goog-api-key":
            process.env.GEMINI_API_KEY,
        },
      }
    );

    const candidate =
      response?.data?.candidates?.[0];

    if (!candidate) {
      throw new Error(
        "Gemini returned no candidate."
      );
    }

    if (candidate.finishReason === "MAX_TOKENS") {
      throw new Error(
        "Response exceeded token limit."
      );
    }

    const text = extractText(response.data);

    if (!text) {
      throw new Error(
        "Gemini returned empty text."
      );
    }

    console.log("\n========== GEMINI RAW ==========");
    console.log(text);
    console.log("================================\n");

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error(
      "\n========== GEMINI ERROR =========="
    );

    console.error(
      error.response?.data || error.message
    );

    console.error(
      "==================================\n"
    );

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Gemini API Error"
    );
  }
};