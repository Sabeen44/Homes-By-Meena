"use client";

export default function Footer() {
  return (
    <footer
      className="py-12"
      style={{
        background: "#0A0A08",
        borderTop: "1px solid rgba(193,172,132,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              color: "#C1AC84",
              letterSpacing: "0.04em",
            }}
          >
            HOMES
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.6rem",
              color: "rgba(193,172,132,0.4)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            by Meena
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.15em",
          }}
        >
          © 2026 Meena Dhawan · Keller Williams Eastside · All Rights Reserved
        </p>

        <div className="flex items-center gap-5">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/meena.dhawan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(193,172,132,0.4)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#C1AC84")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(193,172,132,0.4)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/meenadhawan_realtor/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(193,172,132,0.4)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#C1AC84")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(193,172,132,0.4)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Zillow (house icon) */}
          <a
            href="https://www.zillow.com/profile/Meena%20Dhawan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zillow"
            className="transition-all duration-300 hover:scale-110"
            style={{ color: "rgba(193,172,132,0.4)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#C1AC84")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(193,172,132,0.4)")
            }
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}