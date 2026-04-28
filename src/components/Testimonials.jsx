
"use client"
import { useState, useEffect } from "react";
import { FadeUp } from "./animations/FadeUp";
import { TESTIMONIALS } from "@/lib/data";

export default function  Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 relative" style={{ background: "#0F0F0C" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Client Stories
          </p>
          {/* Large quote mark */}
          <div className="mt-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", color: "rgba(193,172,132,0.15)", lineHeight: 1 }}>"</div>
        </FadeUp>

        <div className="relative mt-2" style={{ minHeight: "200px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(20px)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                color: "rgba(253,251,247,0.75)",
                lineHeight: 1.7,
                fontWeight: 400,
                fontStyle: "italic",
                maxWidth: "600px",
              }}>
                {t.text}
              </p>
              <div className="mt-8">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "0.25rem" }}>
                  Happily living in {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300"
              style={{
                width: active === i ? "24px" : "8px",
                height: "2px",
                background: active === i ? "#C1AC84" : "rgba(193,172,132,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

