import { FadeUp } from "@/components/animations/FadeUp";

export default function Contact() {
  return (
    <section id="contact" className="py-24" style={{ background: "#13130F" }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Let's Connect
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Ready to Start
            <br />
            <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Your Journey?</span>
          </h2>

          <div className="mt-10 space-y-6">
            {[
              { label: "Phone", value: "425-628-8863" },
              { label: "Office", value: "Keller Williams Eastside" },
              { label: "Location", value: "Kirkland, WA" },
            ].map((item) => (
              <div key={item.label} className="flex gap-6 items-baseline">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(193,172,132,0.4)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", width: "80px", flexShrink: 0 }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "rgba(253,251,247,0.7)", fontSize: "1.1rem" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="space-y-5">
            {[
              { placeholder: "Full Name", type: "text" },
              { placeholder: "Email Address", type: "email" },
              { placeholder: "Phone Number", type: "tel" },
            ].map((field) => (
              <input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-5 py-4 outline-none transition-all duration-300 focus:border-amber-400/40"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(193,172,132,0.12)",
                  color: "#FDFBF7",
                  fontSize: "0.9rem",
                }}
              />
            ))}
            <textarea
              placeholder="Tell me about your real estate goals..."
              rows={4}
              className="w-full px-5 py-4 outline-none resize-none transition-all duration-300 focus:border-amber-400/40"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(193,172,132,0.12)",
                color: "#FDFBF7",
                fontSize: "0.9rem",
              }}
            />
            <button
              className="w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                background: "#C1AC84",
                color: "#0F0F0C",
                fontWeight: 600,
              }}
            >
              Send Message
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
