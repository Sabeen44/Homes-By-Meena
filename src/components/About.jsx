import { SlideIn } from "./animations/FadeUp";

export default function About() {
  return (
    <section id="about" className="py-28 relative overflow-hidden" style={{ background: "#13130F" }}>
      {/* Subtle accent */}
      <div className="absolute top-0 left-0 w-1/3 h-full" style={{
        background: "radial-gradient(ellipse at 20% 50%, rgba(193,172,132,0.04) 0%, transparent 70%)",
      }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <SlideIn className="lg:col-span-2">
            <div className="relative">
              <div style={{ aspectRatio: "3/4", background: "rgba(193,172,132,0.05)" }}>
                <img
                  src="/images/meena.jpeg"
                  alt="Real Estate Professional"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.9) sepia(0.15)" }}
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border pointer-events-none" style={{ borderColor: "rgba(193,172,132,0.15)" }} />
            </div>
          </SlideIn>

          <SlideIn from="right" className="lg:col-span-3">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
              About Meena Dhawan
            </p>
            <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#FDFBF7", fontWeight: 400, lineHeight: 1.2 }}>
              A Trusted Advisor
              <br />
              <span style={{ fontStyle: "italic", color: "#C1AC84" }}>on Your Side</span>
            </h2>

            <div className="mt-8 space-y-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "rgba(253,251,247,0.5)", lineHeight: 1.8 }}>
              <p>
                With deep roots in the Pacific Northwest real estate market, Meena Dhawan has established herself among the top 5% of agents at Keller Williams Eastside — and the top 5% of Keller Williams worldwide by volume.
              </p>
              <p>
                Whether guiding first-time buyers through an exciting milestone or crafting dynamic marketing strategies for sellers, Meena brings an unmatched combination of local expertise, creative problem-solving, and genuine care for every client's unique journey.
              </p>
              <p>
                Specializing in Kirkland, Bothell, Redmond, Sammamish, Bellevue, and the greater Eastside, she turns the complex process of buying or selling into a seamless, confident experience.
              </p>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                className="px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}
              >
                Meet Meena
              </button>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

