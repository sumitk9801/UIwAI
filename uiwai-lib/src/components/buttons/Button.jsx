import React, { useState } from "react";

const Button = ({
  text = "Click Me",
  bgColor = "#6C5CE7",
  hoverColor = "#5A4BD6",
  textColor = "#FFFFFF",
  size = "medium",
  borderRadius = "12px",
  onClick = () => {},
  disabled = false,
  style = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeStyles = {
    small: { padding: "8px 16px", fontSize: "14px" },
    medium: { padding: "12px 24px", fontSize: "16px" },
    large: { padding: "16px 32px", fontSize: "18px" },
  };

  const styles = {
    ...sizeStyles[size],
    backgroundColor: style.backgroundColor
      ? style.backgroundColor
      : disabled
      ? "#B2B2B2"
      : isHovered
      ? hoverColor
      : bgColor,
    color: style.color || textColor,
    border: "none",
    borderRadius,
    fontWeight: 600,
    letterSpacing: "0.3px",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: isPressed
      ? "0 2px 6px rgba(0,0,0,0.15) inset"
      : isHovered
      ? "0 6px 16px rgba(0,0,0,0.2)"
      : "0 4px 10px rgba(0,0,0,0.12)",
    transform: isPressed ? "scale(0.97)" : isHovered ? "scale(1.03)" : "scale(1)",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    ...style,
  };

  return (
    <button
      style={styles}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {text}
    </button>
  );
};

export  {Button};