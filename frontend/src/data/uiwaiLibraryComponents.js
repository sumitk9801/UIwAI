export const uiwaiLibraryComponents = [
  {
    _id: "uiwai-lib-button",
    name: "Button",
    visibility: "public",
    description: "A reusable button component with hover and pressed states.",
    props: ["text", "bgColor", "hoverColor", "textColor", "size", "borderRadius", "onClick", "disabled", "style"],
    code: `import React, { useState } from "react";

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

export { Button };`,
  },
  {
    _id: "uiwai-lib-card",
    name: "Card",
    visibility: "public",
    description: "A clean content card with image, title, description, and action button.",
    props: ["title", "description", "imageUrl", "bgColor", "textColor", "accentColor", "buttonText", "onButtonClick", "width"],
    code: `import React, { useState } from "react";

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

export { Card };`,
  },
  {
    _id: "uiwai-lib-profilecard",
    name: "ProfileCard",
    visibility: "public",
    description: "A profile card for showcasing user details, role, and bio.",
    props: ["name", "role", "bio", "avatarUrl", "bgColor", "textColor", "accentColor", "width"],
    code: `import React, { useState } from "react";

const ProfileCard = ({
  name = "Jane Doe",
  role = "Product Designer",
  bio = "Crafting simple, thoughtful digital experiences.",
  avatarUrl = "https://i.pravatar.cc/150?img=32",
  bgColor = "#F5F1EA",
  textColor = "#2B2B2B",
  accentColor = "#A89F91",
  width = "280px",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      width,
      backgroundColor: bgColor,
      borderRadius: "20px",
      padding: "32px 24px",
      textAlign: "center",
      fontFamily: "sans-serif",
      boxShadow: isHovered
        ? "0 10px 20px rgba(0,0,0,0.08)"
        : "0 2px 8px rgba(0,0,0,0.04)",
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      transition: "all 0.3s ease",
      border: "1px solid #E8E2D6",
    },
    avatar: {
      width: "88px",
      height: "88px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "16px",
      border: `2px solid ${accentColor}`,
    },
    name: {
      margin: "0 0 4px 0",
      fontSize: "18px",
      fontWeight: 600,
      color: textColor,
      letterSpacing: "0.2px",
    },
    role: {
      margin: "0 0 14px 0",
      fontSize: "13px",
      fontWeight: 500,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    divider: {
      width: "32px",
      height: "2px",
      backgroundColor: accentColor,
      margin: "0 auto 14px auto",
      opacity: 0.5,
    },
    bio: {
      margin: 0,
      fontSize: "14px",
      lineHeight: 1.6,
      color: "#6B6459",
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={avatarUrl} alt={name} style={styles.avatar} />
      <h3 style={styles.name}>{name}</h3>
      <p style={styles.role}>{role}</p>
      <div style={styles.divider} />
      <p style={styles.bio}>{bio}</p>
    </div>
  );
};

export { ProfileCard };`,
  },
];
