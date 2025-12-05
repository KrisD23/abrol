// components/TestimonialCard.jsx
import React from "react";
import Image from "next/image";

const TestimonialCard = ({
  author,
  company,
  text,
  rating = 4.8,
  avatar = "/avatar-placeholder.jpg",
}) => {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-xl p-6 md:p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(180deg,#071728 0%, rgba(7,23,40,0.85) 45%, #000 100%)",
        borderRadius: "18px",
        minHeight: "220px",
        height: "245px",
        border: "1px solid rgba(0,116,255,0.35)",
    boxShadow: `
      0 0 18px rgba(0,116,255,0.25),
      0 0 32px rgba(0,116,255,0.15),
      inset 0 0 12px rgba(0,116,255,0.10)
    `,
      }}
    >
      {/* Light vignette + spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 25%, rgba(255,255,255,0.03), transparent 35%), radial-gradient(circle at 50% 120%, rgba(0,0,0,0.45), transparent 60%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            
            {/* name + role */}
            <div style={{ marginLeft: 6 }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  marginBottom: 4,
                }}
              >
                {author}
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                {company}
              </p>
            </div>
          </div>
        </div>


        {/* Quote text */}
        <p className="text-gray-200 mt-4 leading-relaxed text-sm md:text-base">
          “{text}”
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
