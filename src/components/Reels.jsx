"use client";

import { useState } from "react";

const REELS = [
  {
    id: 1,
    thumbnail: "/images/meenareel1.png", // Replace with your actual reel thumbnail
    title: "Meet Meena",
    views: "12.4K",
    caption: "Helping Buyers & Sellers Make Smart Moves. Trust. Knowledge. Results",
    link: "https://www.instagram.com/reel/DK-C7paxD2w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", // Replace with actual reel URL
  },
  {
    id: 2,
    thumbnail: "/images/meenareel2.png",
    title: "Tax Benefits",
    views: "8.7K",
    caption: "Owning a home isn’t just about building equity, it can also unlock powerful financial advantages if used correctly:",
    link: "https://www.instagram.com/reel/DXhagxQj-pU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    id: 3,
    thumbnail: "/images/meenareel3.png",
    title: "Common Mistakes",
    views: "15.1K",
    caption: "Share this with a friend on the Eastside of Seattle who’s thinking about selling — because these mistakes happen in almost every listing I see.",
    link: "https://www.instagram.com/reel/DXaSfLyAqIG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
    <path d="M8 5.5V22.5L23 14L8 5.5Z" fill="white" />
  </svg>
);

const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const EyeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ReelIconSmall = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

export default function ReelsSection() {
  const [hoveredReel, setHoveredReel] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyLink = (e, reel) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(reel.link).then(() => {
      setCopiedId(reel.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section
      id="reels"
      style={{
      
        padding: "70px 20px 80px",
        background: "#c1ac84",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle light overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
                          radial-gradient(circle at 70% 80%, rgba(44,41,36,0.06) 0%, transparent 40%)`,
        pointerEvents: "none",
      }} />

      {/* Decorative line */}
      <div style={{
        width: "40px",
        height: "1px",
        background: "rgba(44,41,36,0.2)",
        marginBottom: "20px",
        position: "relative",
        zIndex: 1,
      }} />

      {/* Section label */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        color: "rgba(44,41,36,0.5)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        marginBottom: "12px",
        position: "relative",
        zIndex: 1,
      }}>
        <ReelIconSmall />
        Latest from Meena
      </div>

      {/* Heading */}
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(28px, 4vw, 40px)",
        fontWeight: 500,
        color: "#2c2924",
        textAlign: "center",
        margin: "0 0 8px 0",
        lineHeight: 1.2,
        position: "relative",
        zIndex: 1,
      }}>
        Tour with <span style={{ fontStyle: "italic", color: "#4a3c28" }}>Meena</span>
      </h2>

      <p style={{
        color: "#5c4a30",
        fontSize: "14px",
        textAlign: "center",
        maxWidth: "420px",
        lineHeight: 1.6,
        margin: "0 0 40px 0",
        fontWeight: 300,
        position: "relative",
        zIndex: 1,
      }}>
        Home tours, market tips, and behind-the-scenes of Eastside living — straight from Instagram.
      </p>

      {/* Reels Grid */}
      <div style={{
        display: "flex",
        gap: "42px",
        justifyContent: "center",
        maxWidth: "900px",
        position: "relative",
        zIndex: 1,
      }}>
        {REELS.map((reel, i) => (
          <a
            key={reel.id}
            href={reel.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={() => setHoveredReel(reel.id)}
            onMouseLeave={() => setHoveredReel(null)}
          >
            <div style={{
              width: "300px",
              borderRadius: "12px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.92)",
              boxShadow: hoveredReel === reel.id
                ? "0 20px 50px rgba(44,41,36,0.2), 0 8px 20px rgba(44,41,36,0.08)"
                : "0 4px 20px rgba(44,41,36,0.08)",
              transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
              transform: hoveredReel === reel.id ? "translateY(-5px)" : "translateY(0)",
              cursor: "pointer",
            }}>
              {/* Thumbnail */}
              <div style={{
                position: "relative",
                width: "300px",
                height: "310px",
                overflow: "hidden",
              }}>
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: hoveredReel === reel.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(44,41,36,0.6) 0%, rgba(0,0,0,0.05) 40%, transparent 55%)",
                }} />

                {/* Play button */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: hoveredReel === reel.id
                    ? "translate(-50%, -50%) scale(1)"
                    : "translate(-50%, -50%) scale(0.8)",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(44,41,36,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "2px",
                  opacity: hoveredReel === reel.id ? 1 : 0.6,
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                }}>
                  <PlayIcon />
                </div>

                {/* Instagram badge */}
                <div style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "rgba(44,41,36,0.5)",
                  backdropFilter: "blur(8px)",
                  padding: "4px 10px",
                  borderRadius: "14px",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 500,
                }}>
                  <InstagramIcon size={11} /> Reel
                </div>

                {/* Views */}
                <div style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "11px",
                }}>
                  <EyeIcon /> {reel.views} views
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "13px 14px 12px" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#2c2924",
                  marginBottom: "4px",
                }}>{reel.title}</div>
                <div style={{
                  fontSize: "11.5px",
                  color: "#8a8177",
                  lineHeight: 1.5,
                  fontWeight: 300,
                  marginBottom: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>{reel.caption}</div>

                <button
                  onClick={(e) => handleCopyLink(e, reel)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    background: copiedId === reel.id ? "#e0d5c1" : "#f0ebe2",
                    border: "none",
                    borderRadius: "6px",
                    padding: "7px 10px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: copiedId === reel.id ? "#4a3c28" : "#7a6844",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    width: "100%",
                    justifyContent: "center",
                    letterSpacing: "0.2px",
                  }}
                >
                  <LinkIcon />
                  {copiedId === reel.id ? "Link Copied!" : "Share Reel Link"}
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Follow CTA */}
      <a
        href="https://www.instagram.com/meenadhawan.realtor"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "9px",
          marginTop: "40px",
          padding: "12px 28px",
          background: "#2c2924",
          color: "#fff",
          borderRadius: "50px",
          fontSize: "13px",
          fontWeight: 500,
          textDecoration: "none",
          letterSpacing: "0.4px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <InstagramIcon size={15} />
        Follow @meenadhawan.realtor
      </a>

      {/* Bottom decorative line */}
      <div style={{
        width: "40px",
        height: "1px",
        background: "rgba(44,41,36,0.15)",
        marginTop: "36px",
        position: "relative",
        zIndex: 1,
      }} />
    </section>
  );
}