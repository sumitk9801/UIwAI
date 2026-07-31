import { parse } from "@babel/parser";

export const validateReactComponent = (code) => {
  try {
    parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
    });

    return {
      valid: true,
      error: null,
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message,
    };
  }
};