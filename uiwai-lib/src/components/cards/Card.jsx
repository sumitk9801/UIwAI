import React, { useState } from "react";

const Card = ({
  title = "Card Title",
  description = "This is a simple, clean, and reusable card component.",
  imageUrl = "https://picsum.photos/400/250",
  bgColor = "#FFFFFF",
  textColor = "#1E1E1E",
  accentColor = "#6C5CE7",
  buttonText = "Learn More",
  onButtonClick = () => {},
  width = "320px",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      width,
      backgroundColor: bgColor,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: isHovered
        ? "0 12px 24px rgba(0,0,0,0.18)"
        : "0 6px 14px rgba(0,0,0,0.1)",
      transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      transition: "all 0.3s ease-in-out",
      fontFamily: "sans-serif",
    },
    image: {
      width: "100%",
      height: "180px",
      objectFit: "cover",
      display: "block",
    },
    content: {
      padding: "18px 20px",
    },
    title: {
      margin: "0 0 8px 0",
      fontSize: "20px",
      fontWeight: 700,
      color: textColor,
    },
    description: {
      margin: "0 0 16px 0",
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#666666",
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
      opacity: isHovered ? 0.9 : 1,
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
        <button style={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export  {Card};