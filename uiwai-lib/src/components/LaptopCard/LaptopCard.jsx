import React from "react";

const defaultLaptop = {
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
    display: "15.6\" FHD 144Hz",
    battery: "78Wh, up to 12 hours",
    os: "Windows 11 Pro",
    weight: "1.8 kg"
  }
};

export const LaptopCard = ({ laptop = defaultLaptop, onAddToCart = () => {} }) => {
  const specsArray = [
    { icon: "⚡", label: "Processor", value: laptop.specs.processor },
    { icon: "💾", label: "Memory", value: laptop.specs.ram },
    { icon: "🗂️", label: "Storage", value: laptop.specs.storage },
    { icon: "🎮", label: "Graphics", value: laptop.specs.gpu },
    { icon: "🖥️", label: "Display", value: laptop.specs.display },
    { icon: "🔋", label: "Battery", value: laptop.specs.battery },
    { icon: "💿", label: "OS", value: laptop.specs.os },
    { icon: "⚖️", label: "Weight", value: laptop.specs.weight },
  ];

  return (
    <div style={{ maxWidth: 380, margin: "20px auto", borderRadius: 16, background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <svg width="220" height="140" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="10" width="180" height="100" rx="6" fill="#1a1a2e" />
          <rect x="38" y="18" width="164" height="84" rx="2" fill="#0f3460" />
          <rect x="38" y="18" width="164" height="84" rx="2" fill="url(#screenGrad)" />
          <defs>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4e54c8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8f94fb" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect x="10" y="112" width="220" height="12" rx="4" fill="#2d2d44" />
          <rect x="20" y="124" width="200" height="6" rx="3" fill="#3d3d54" />
        </svg>
        <div style={{ position: "absolute", top: 12, left: 12, background: "#ff6b35", color: "#fff", padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>New</div>
      </div>

      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 14, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>{laptop.brand}</span>
          <span style={{ fontSize: 14, color: "#666" }}>{laptop.rating} ★</span>
        </div>
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#222" }}>{laptop.model}</h2>
        <p style={{ margin: "8px 0 16px", fontSize: 14, color: "#777", lineHeight: 1.4 }}>
          {laptop.specs.processor} · {laptop.specs.ram} · {laptop.specs.storage}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", background: "#f7f9fc", padding: 14, borderRadius: 12, marginBottom: 16 }}>
          {specsArray.map((spec, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 16 }}>{spec.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase" }}>{spec.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#333", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{spec.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12, color: "#999" }}>Price</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e" }}>
              {laptop.currency}{laptop.price.toLocaleString()}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#888" }}>{laptop.rating} / 5</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>{laptop.reviews.toLocaleString()} reviews</div>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(laptop)}
          style={{
            width: "100%",
            padding: "12px 20px",
            border: "none",
            borderRadius: 8,
            background: "#ff6b35",
            color: "#fff",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#e55a2b")}
          onMouseLeave={(e) => (e.target.style.background = "#ff6b35")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};