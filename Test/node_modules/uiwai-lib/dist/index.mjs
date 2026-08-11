// src/components/cards/Card.jsx
import React, { useState } from "react";
var Card = ({
  title = "Card Title",
  description = "This is a simple, clean, and reusable card component.",
  imageUrl = "https://picsum.photos/400/250",
  bgColor = "#FFFFFF",
  textColor = "#1E1E1E",
  accentColor = "#6C5CE7",
  buttonText = "Learn More",
  onButtonClick = () => {
  },
  width = "320px"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    card: {
      width,
      backgroundColor: bgColor,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: isHovered ? "0 12px 24px rgba(0,0,0,0.18)" : "0 6px 14px rgba(0,0,0,0.1)",
      transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      transition: "all 0.3s ease-in-out",
      fontFamily: "sans-serif"
    },
    image: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      display: "block"
    },
    content: {
      padding: "18px 20px"
    },
    title: {
      margin: "0 0 8px 0",
      fontSize: "20px",
      fontWeight: 700,
      color: textColor
    },
    description: {
      margin: "0 0 16px 0",
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#666666"
    },
    button: {
      padding: "10px 18px",
      backgroundColor: accentColor,
      color: "#FFFFFF",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "opacity 0.2s ease-in-out",
      opacity: isHovered ? 0.9 : 1
    }
  };
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: styles.card,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    /* @__PURE__ */ React.createElement("img", { src: imageUrl, alt: title, style: styles.image }),
    /* @__PURE__ */ React.createElement("div", { style: styles.content }, /* @__PURE__ */ React.createElement("h3", { style: styles.title }, title), /* @__PURE__ */ React.createElement("p", { style: styles.description }, description), /* @__PURE__ */ React.createElement("button", { style: styles.button, onClick: onButtonClick }, buttonText))
  );
};

// src/components/buttons/Button.jsx
import React2, { useState as useState2 } from "react";
var Button = ({
  text = "Click Me",
  bgColor = "#6C5CE7",
  hoverColor = "#5A4BD6",
  textColor = "#FFFFFF",
  size = "medium",
  borderRadius = "12px",
  onClick = () => {
  },
  disabled = false,
  style = {}
}) => {
  const [isHovered, setIsHovered] = useState2(false);
  const [isPressed, setIsPressed] = useState2(false);
  const sizeStyles = {
    small: { padding: "8px 16px", fontSize: "14px" },
    medium: { padding: "12px 24px", fontSize: "16px" },
    large: { padding: "16px 32px", fontSize: "18px" }
  };
  const styles = {
    ...sizeStyles[size],
    backgroundColor: style.backgroundColor ? style.backgroundColor : disabled ? "#B2B2B2" : isHovered ? hoverColor : bgColor,
    color: style.color || textColor,
    border: "none",
    borderRadius,
    fontWeight: 600,
    letterSpacing: "0.3px",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: isPressed ? "0 2px 6px rgba(0,0,0,0.15) inset" : isHovered ? "0 6px 16px rgba(0,0,0,0.2)" : "0 4px 10px rgba(0,0,0,0.12)",
    transform: isPressed ? "scale(0.97)" : isHovered ? "scale(1.03)" : "scale(1)",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    ...style
  };
  return /* @__PURE__ */ React2.createElement(
    "button",
    {
      style: styles,
      disabled,
      onClick,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsPressed(false);
      },
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false)
    },
    text
  );
};

// src/components/ProfileCards/ProfileCard.jsx
import React3, { useState as useState3 } from "react";
var ProfileCard = ({
  name = "Jane Doe",
  role = "Product Designer",
  bio = "Crafting simple, thoughtful digital experiences.",
  avatarUrl = "https://i.pravatar.cc/150?img=32",
  bgColor = "#F5F1EA",
  textColor = "#2B2B2B",
  accentColor = "#A89F91",
  width = "280px"
}) => {
  const [isHovered, setIsHovered] = useState3(false);
  const styles = {
    card: {
      width,
      backgroundColor: bgColor,
      borderRadius: "20px",
      padding: "32px 24px",
      textAlign: "center",
      fontFamily: "sans-serif",
      boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      transition: "all 0.3s ease",
      border: "1px solid #E8E2D6"
    },
    avatar: {
      width: "88px",
      height: "88px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "16px",
      border: `2px solid ${accentColor}`
    },
    name: {
      margin: "0 0 4px 0",
      fontSize: "18px",
      fontWeight: 600,
      color: textColor,
      letterSpacing: "0.2px"
    },
    role: {
      margin: "0 0 14px 0",
      fontSize: "13px",
      fontWeight: 500,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: "0.8px"
    },
    divider: {
      width: "32px",
      height: "2px",
      backgroundColor: accentColor,
      margin: "0 auto 14px auto",
      opacity: 0.5
    },
    bio: {
      margin: 0,
      fontSize: "14px",
      lineHeight: 1.6,
      color: "#6B6459"
    }
  };
  return /* @__PURE__ */ React3.createElement(
    "div",
    {
      style: styles.card,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false)
    },
    /* @__PURE__ */ React3.createElement("img", { src: avatarUrl, alt: name, style: styles.avatar }),
    /* @__PURE__ */ React3.createElement("h3", { style: styles.name }, name),
    /* @__PURE__ */ React3.createElement("p", { style: styles.role }, role),
    /* @__PURE__ */ React3.createElement("div", { style: styles.divider }),
    /* @__PURE__ */ React3.createElement("p", { style: styles.bio }, bio)
  );
};

// src/components/LaptopCard/LaptopCard.jsx
import React4 from "react";
var defaultLaptop = {
  brand: "TechNova",
  model: "ProBook X15",
  price: 1499,
  currency: "$",
  rating: 4.8,
  reviews: 1324,
  specs: {
    processor: "Intel Core i7-13700H",
    ram: "16GB DDR5",
    storage: "1TB NVMe SSD",
    gpu: "NVIDIA RTX 4060",
    display: '15.6" FHD 144Hz',
    battery: "78Wh, up to 12 hours",
    os: "Windows 11 Pro",
    weight: "1.8 kg"
  }
};
var LaptopCard = ({ laptop = defaultLaptop, onAddToCart = () => {
} }) => {
  const specsArray = [
    { icon: "\u26A1", label: "Processor", value: laptop.specs.processor },
    { icon: "\u{1F4BE}", label: "Memory", value: laptop.specs.ram },
    { icon: "\u{1F5C2}\uFE0F", label: "Storage", value: laptop.specs.storage },
    { icon: "\u{1F3AE}", label: "Graphics", value: laptop.specs.gpu },
    { icon: "\u{1F5A5}\uFE0F", label: "Display", value: laptop.specs.display },
    { icon: "\u{1F50B}", label: "Battery", value: laptop.specs.battery },
    { icon: "\u{1F4BF}", label: "OS", value: laptop.specs.os },
    { icon: "\u2696\uFE0F", label: "Weight", value: laptop.specs.weight }
  ];
  return /* @__PURE__ */ React4.createElement("div", { style: { maxWidth: 380, margin: "20px auto", borderRadius: 16, background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" } }, /* @__PURE__ */ React4.createElement("div", { style: { background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" } }, /* @__PURE__ */ React4.createElement("svg", { width: "220", height: "140", viewBox: "0 0 240 140", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, /* @__PURE__ */ React4.createElement("rect", { x: "30", y: "10", width: "180", height: "100", rx: "6", fill: "#1a1a2e" }), /* @__PURE__ */ React4.createElement("rect", { x: "38", y: "18", width: "164", height: "84", rx: "2", fill: "#0f3460" }), /* @__PURE__ */ React4.createElement("rect", { x: "38", y: "18", width: "164", height: "84", rx: "2", fill: "url(#screenGrad)" }), /* @__PURE__ */ React4.createElement("defs", null, /* @__PURE__ */ React4.createElement("linearGradient", { id: "screenGrad", x1: "0", y1: "0", x2: "1", y2: "1" }, /* @__PURE__ */ React4.createElement("stop", { offset: "0%", stopColor: "#4e54c8", stopOpacity: "0.4" }), /* @__PURE__ */ React4.createElement("stop", { offset: "100%", stopColor: "#8f94fb", stopOpacity: "0.1" }))), /* @__PURE__ */ React4.createElement("rect", { x: "10", y: "112", width: "220", height: "12", rx: "4", fill: "#2d2d44" }), /* @__PURE__ */ React4.createElement("rect", { x: "20", y: "124", width: "200", height: "6", rx: "3", fill: "#3d3d54" })), /* @__PURE__ */ React4.createElement("div", { style: { position: "absolute", top: 12, left: 12, background: "#ff6b35", color: "#fff", padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 } }, "New")), /* @__PURE__ */ React4.createElement("div", { style: { padding: 20 } }, /* @__PURE__ */ React4.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 } }, /* @__PURE__ */ React4.createElement("span", { style: { fontSize: 14, color: "#888", textTransform: "uppercase", letterSpacing: 1 } }, laptop.brand), /* @__PURE__ */ React4.createElement("span", { style: { fontSize: 14, color: "#666" } }, laptop.rating, " \u2605")), /* @__PURE__ */ React4.createElement("h2", { style: { margin: 0, fontSize: 22, fontWeight: 700, color: "#222" } }, laptop.model), /* @__PURE__ */ React4.createElement("p", { style: { margin: "8px 0 16px", fontSize: 14, color: "#777", lineHeight: 1.4 } }, laptop.specs.processor, " \xB7 ", laptop.specs.ram, " \xB7 ", laptop.specs.storage), /* @__PURE__ */ React4.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", background: "#f7f9fc", padding: 14, borderRadius: 12, marginBottom: 16 } }, specsArray.map((spec, idx) => /* @__PURE__ */ React4.createElement("div", { key: idx, style: { display: "flex", alignItems: "center", gap: 8, minWidth: 0 } }, /* @__PURE__ */ React4.createElement("span", { style: { fontSize: 16 } }, spec.icon), /* @__PURE__ */ React4.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 11, color: "#999", textTransform: "uppercase" } }, spec.label), /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 13, fontWeight: 500, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, spec.value))))), /* @__PURE__ */ React4.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 12, color: "#999" } }, "Price"), /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: "#1a1a2e" } }, laptop.currency, laptop.price.toLocaleString())), /* @__PURE__ */ React4.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 13, color: "#888" } }, laptop.rating, " / 5"), /* @__PURE__ */ React4.createElement("div", { style: { fontSize: 12, color: "#aaa" } }, laptop.reviews.toLocaleString(), " reviews"))), /* @__PURE__ */ React4.createElement(
    "button",
    {
      onClick: () => onAddToCart(laptop),
      style: {
        width: "100%",
        padding: "12px 20px",
        border: "none",
        borderRadius: 8,
        background: "#ff6b35",
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.2s"
      },
      onMouseEnter: (e) => e.target.style.background = "#e55a2b",
      onMouseLeave: (e) => e.target.style.background = "#ff6b35"
    },
    "Add to Cart"
  )));
};
export {
  Button,
  Card,
  LaptopCard,
  ProfileCard
};
