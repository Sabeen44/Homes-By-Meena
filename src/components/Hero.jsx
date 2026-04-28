"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { STATS } from "@/lib/data";



export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0F0F0C" }}>
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />

      {/* Ambient gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full" style={{
        background: "radial-gradient(ellipse at 80% 30%, rgba(193,172,132,0.08) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center pt-24">
        <div>
          <div
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(.16,1,.3,1) 0.3s",
            }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C1AC84",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              Keller Williams Eastside — Kirkland, WA
            </p>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
              lineHeight: 1.1,
              color: "#FDFBF7",
              fontWeight: 400,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(40px)",
              transition: "all 1.1s cubic-bezier(.16,1,.3,1) 0.5s",
            }}
          >
            Your Eastside
            <br />
            <span style={{ color: "#C1AC84", fontStyle: "italic" }}>Real Estate</span>
            <br />
            Expert
          </h1>

          <p
            className="mt-6 max-w-md"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(253,251,247,0.55)",
              fontSize: "1.15rem",
              lineHeight: 1.7,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1s cubic-bezier(.16,1,.3,1) 0.7s",
            }}
          >
            Top 5% of Keller Williams worldwide. Guiding families across Kirkland, Bellevue, Redmond & the greater Eastside to find homes they love.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "all 1s cubic-bezier(.16,1,.3,1) 0.9s",
            }}
          >
            <Link
              href="/buy"
              className="px-8 py-3.5 text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 inline-block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                background: "#C1AC84",
                color: "#0F0F0C",
                fontWeight: 600,
              }}
            >
              Search Homes
            </Link>
            <Link
              href="/homevaluepage"
              className="px-8 py-3.5 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-white/5 inline-block"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                border: "1px solid rgba(193,172,132,0.3)",
                color: "#C1AC84",
              }}
            >
              Get a Home Valuation
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="mt-16 grid grid-cols-4 gap-6 border-t pt-8"
            style={{
              borderColor: "rgba(193,172,132,0.12)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s ease 1.1s",
            }}
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#C1AC84" }}>{s.num}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Image Composition */}
        <div
          className="relative hidden lg:block"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translate(0,0)" : "translate(30px, 20px)",
            transition: "all 1.2s cubic-bezier(.16,1,.3,1) 0.6s",
          }}
        >
          <div className="relative" style={{ aspectRatio: "4/5" }}>
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Luxury Eastside Home"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.85) contrast(1.05)" }}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(15,15,12,0.6) 0%, transparent 40%), linear-gradient(to right, rgba(15,15,12,0.3) 0%, transparent 30%)",
            }} />
            {/* Decorative frame accent */}
            <div className="absolute -top-4 -right-4 w-full h-full border pointer-events-none" style={{ borderColor: "rgba(193,172,132,0.2)" }} />
          </div>

          {/* Floating card */}
          <div
            className="absolute -bottom-6 -left-8 p-5"
            style={{
              background: "rgba(15,15,12,0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(193,172,132,0.15)",
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Meena Dhawan
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#C1AC84", fontSize: "1rem", marginTop: "0.25rem" }}>
              425-628-8863
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.5s ease 1.5s" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        <div className="w-px h-8 overflow-hidden">
          <div className="w-px h-8 bg-amber-400/40" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
