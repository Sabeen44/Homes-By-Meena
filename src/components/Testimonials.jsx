"use client";
import { FadeUp } from "./animations/FadeUp";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="py-28 relative" style={{ background: "#13130F" }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp>
          <p
            className="text-center mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C1AC84",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            Client Stories
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div
                className="h-full transition-all duration-500 hover:translate-y-[-4px]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderLeft: "2px solid #C1AC84",
                  padding: "28px 24px",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "3rem",
                    color: "rgba(193,172,132,0.12)",
                    lineHeight: 1,
                    marginBottom: "-8px",
                  }}
                >
                  "
                </div>

                {/* Testimonial text */}
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                    color: "rgba(253,251,247,0.65)",
                    lineHeight: 1.75,
                    fontWeight: 400,
                    fontStyle: "italic",
                    marginBottom: "24px",
                  }}
                >
                  {t.text}
                </p>

                {/* Divider */}
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "rgba(193,172,132,0.25)",
                    marginBottom: "16px",
                  }}
                />

                {/* Client name */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#C1AC84",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  {t.name}
                </div>

                {/* Location */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Happily living in {t.location}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Zillow link */}
        <FadeUp delay={0.5}>
          <div className="text-center mt-14">
            <a
              href="https://www.zillow.com/profile/Meena%20Dhawan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-all duration-300 hover:opacity-80"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(193,172,132,0.4)",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderBottom: "1px solid rgba(193,172,132,0.15)",
                paddingBottom: "2px",
              }}
            >
              Read more reviews on Zillow
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}