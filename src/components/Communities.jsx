import { FadeUp } from "@/components/animations/FadeUp";
import { COMMUNITIES } from "@/lib/data";

export default function Communities() {
  return (
    <section id="communities" className="py-24" style={{ background: "#13130F" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Areas of Expertise
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Eastside <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Communities</span>
          </h2>
        </FadeUp>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(193,172,132,0.08)" }}>
          {COMMUNITIES.map((c, i) => (
            <FadeUp key={c} delay={i * 0.06}>
              <div
                className="group relative p-8 text-center cursor-pointer transition-all duration-500 hover:bg-white/[0.02]"
                style={{ background: "#13130F" }}
              >
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.15rem",
                    color: "rgba(253,251,247,0.5)",
                  }}
                >
                  <span className="group-hover:text-amber-200 transition-colors duration-300">{c}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px transition-all duration-500 group-hover:w-12" style={{ background: "#C1AC84" }} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}