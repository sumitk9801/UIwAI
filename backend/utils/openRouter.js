import axios from "axios";

const PRIMARY_MODEL =
  process.env.OPENROUTER_MODEL ||
  "deepseek/deepseek-v4-flash-0731"

const FALLBACK_MODELS = [
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "google/gemma-3-27b-it:free",
  "google/gemma-3n-e4b-it:free",
  "mistralai/mistral-small-3.2-24b-instruct:free",
  "qwen/qwen3-coder:free",
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const extractContent = (response) => {
  const choice = response?.data?.choices?.[0];

  if (!choice) {
    throw new Error("No AI choice returned.");
  }

  if (choice.finish_reason === "length") {
    throw new Error(
      "AI response exceeded token limit."
    );
  }

  const content = choice.message?.content;

  if (!content || !content.trim()) {
    throw new Error("AI returned empty content.");
  }

  return content.trim();
};

export const openRouter = async (messages) => {
  if (!process.env.OPENROUTER_APIKEY) {
    throw new Error("Missing OPENROUTER_APIKEY");
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("Messages array is empty.");
  }

  const models = [
    PRIMARY_MODEL,
    ...FALLBACK_MODELS.filter(
      (m) => m !== PRIMARY_MODEL
    ),
  ];

  let lastError = null;

  for (const model of models) {
    const maxAttempts = 2;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(
          `\n========== OPENROUTER ==========`
        );

        console.log(
          `Model: ${model} | Attempt: ${attempt}`
        );

        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model,

            messages,

            temperature: 0.2,

            max_tokens: 8000,

            response_format: {
              type: "json_object",
            },
          },
          {
            timeout: 30000,

            headers: {
              Authorization:
                `Bearer ${process.env.OPENROUTER_APIKEY}`,

              "Content-Type":
                "application/json",
            },
          }
        );

        const text = extractContent(response);

        console.log("\nRAW RESPONSE:");
        console.log(text);
        console.log("===============================\n");

        try {
          return JSON.parse(text);
        } catch {
          return text;
        }
      } catch (error) {
        lastError = error;

        const status =
          error.response?.status;

        const apiError =
          error.response?.data?.error;

        const message =
          apiError?.metadata?.raw ||
          apiError?.message ||
          error.message;

        console.error(
          `Model ${model} Failed`
        );

        console.error(message);

        if (
          status === 400 ||
          status === 401
        ) {
          throw new Error(message);
        }

        if (
          attempt < maxAttempts &&
          (
            status === 429 ||
            error.code === "ECONNABORTED"
          )
        ) {
          console.log(
            `Retrying in ${attempt * 1000}ms...`
          );

          await sleep(attempt * 1000);

          continue;
        }

        break;
      }
    }
  }

  throw new Error(
    lastError?.response?.data?.error?.message ||
      lastError?.message ||
      "All OpenRouter models failed."
  );
};