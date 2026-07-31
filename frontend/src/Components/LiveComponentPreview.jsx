import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useLayoutEffect,
} from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import { motion } from "motion/react";
import { FiRefreshCw } from "react-icons/fi";

const tryParseJson = (input) => {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
};

const decodeBase64 = (value) => {
  try {
    return atob(value);
  } catch {
    return null;
  }
};

const normalizeCodeValue = (value) => {
  if (value && typeof value === "object") {
    if (typeof value.code === "string") return normalizeCodeValue(value.code);
    if (typeof value.code_b64 === "string") return decodeBase64(value.code_b64) || "";
    return "";
  }

  if (typeof value !== "string") return "";

  const parsed = tryParseJson(value.trim());

  if (typeof parsed === "string") return parsed;
  if (parsed && typeof parsed === "object") return normalizeCodeValue(parsed);

  if (/\\[nrt"'\\]/.test(value)) {
    const wrapped = `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    const unescaped = tryParseJson(wrapped);
    if (typeof unescaped === "string") return unescaped;
  }

  return value;
};

const sanitizeComponentCode = (source) =>
  source
    .replace(/^\s*["']use client["'];?\s*$/gm, "")
    .replace(/^\s*import\s+.*?from\s+["'].*?["'];?\s*$/gm, "")
    .replace(/^\s*import\s+["'].*?["'];?\s*$/gm, "")
    .replace(/^\s*export\s+default\s+/gm, "")
    .replace(/^\s*export\s+/gm, "")
    .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
    .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')
    .replace(/\bfixed\b/g, "absolute");

export default function LiveComponentPreview({ code }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // ─── Decode escaped code strings if needed ─────────────────────────────────────
  const codeString = normalizeCodeValue(code);

  // ─── Sanitize Code ─────────────────────────────────────
  const sanitized = sanitizeComponentCode(codeString);

  const match = sanitized.match(/(?:^|\n)\s*(?:export\s+default\s+)?(?:const|function|class)\s+([A-Z][\w$]*)\b/);
  const componentName = match ? match[1] : null;

  const wrappedCode = componentName
    ? `${sanitized}\n\nrender(<${componentName} />);`
    : sanitized;

  if (!componentName && !sanitized.trim()) {
    return (
      <div
        style={{
          padding: "20px",
          borderRadius: "12px",
          background: "#111827",
          color: "#e5e7eb",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        No preview available. Generate a component to see it here.
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* 🔄 Refresh Button */}
      <motion.button
        onClick={refreshPreview}
        whileTap={{ scale: 0.9, rotate: 90 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
          background: "#1e293b",
          border: "none",
          color: "#94a3b8",
          padding: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        <FiRefreshCw size={16} />
      </motion.button>

      <LiveProvider
        key={refreshKey}
        code={wrappedCode}
        noInline={Boolean(componentName)}
        scope={{
          React,
          useState,
          useEffect,
          useRef,
          useCallback,
          useMemo,
          useReducer,
          useLayoutEffect,
        }}
      >
        {/* 🔥 MAIN CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            width: "100%",
            minHeight: "300px",

            // 🔥 Responsive max width
            maxWidth: "100%",

            border: "1px solid #1e293b",
            borderRadius: "12px",
            background: "#020617",

            position: "relative",
            overflow: "hidden",

            // 🔥 Responsive padding
            padding: "clamp(10px, 2vw, 20px)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",

              // 🔥 Prevent overflow breaking layout
              overflow: "auto",
            }}
          >
            <LivePreview />
          </div>
        </motion.div>

        {/* ❌ Errors */}
        <LiveError
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#450a0a",
            color: "#f87171",
            borderRadius: "6px",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            overflowX: "auto",
          }}
        />

        {/* ⚠️ No Component */}
        {!componentName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#1e293b",
              borderRadius: "6px",
              color: "#94a3b8",
              fontSize: "clamp(12px, 1.5vw, 14px)",
            }}
          >
            Preview is not available. Copy the code and paste it into your project.
          </motion.div>
        )}
      </LiveProvider>
    </div>
  );
}
