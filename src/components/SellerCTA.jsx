import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";

export default function SellerCTA() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#0F0F0C" }}>
      {/* Ambient gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(193,172,132,0.06) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Thinking About Selling?
          </p>
          <h2 className="mt-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#FDFBF7", fontWeight: 400, lineHeight: 1.15 }}>
            Find Out What Your
            <br />
            <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Home Is Worth Today</span>
          </h2>
          <p className="mt-6 mx-auto max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.5)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            Get a complimentary, no-obligation Comparative Market Analysis from a Top 5% Keller Williams agent. Real numbers, real expertise — delivered within 24 hours.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/homevaluepage"
            className="px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 inline-block"
            style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}
          >
            Get My Free Valuation
          </Link>
        
        </FadeUp>

        <FadeUp delay={0.25} className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { num: "Top 5%", label: "KW Worldwide" },
            { num: "24 hrs", label: "CMA Delivery" },
            { num: "100%", label: "Complimentary" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "#C1AC84" }}>{s.num}</div>
              <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
