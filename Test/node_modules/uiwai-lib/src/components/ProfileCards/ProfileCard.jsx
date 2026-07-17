import React, { useState } from "react";

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

export {ProfileCard};