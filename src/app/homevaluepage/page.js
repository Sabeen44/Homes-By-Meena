"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

// ─── Animation Hooks ───
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function SlideIn({ children, delay = 0, from = "left", className = "" }) {
  const [ref, vis] = useInView();
  const x = from === "left" ? "-60px" : "60px";
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translate(0,0)" : `translateX(${x})`,
      transition: `opacity 0.9s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Animated Counter ───
function Counter({ end, suffix = "", prefix = "" }) {
  const [ref, vis] = useInView(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Hero with Valuation Form ───
function HeroValuation() {
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0); // 0=address, 1=details, 2=contact, 3=success
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    street: "", city: "Kirkland", state: "WA", zip: "",
    beds: "", baths: "", sqft: "", condition: "",
    name: "", email: "", phone: "",
  });

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const updateField = (key, val) => setFormData((prev) => ({ ...prev, [key]: val }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setStep(3);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#0F0F0C" }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.25) contrast(1.1)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,15,12,0.95) 0%, rgba(15,15,12,0.7) 50%, rgba(15,15,12,0.85) 100%)" }} />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center pt-28 pb-20">
        {/* Left: Copy */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.1s cubic-bezier(.16,1,.3,1) 0.3s",
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "1.5rem" }}>
            Free Home Valuation
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "#FDFBF7", fontWeight: 400 }}>
            What's Your Home
            <br />
            <span style={{ color: "#C1AC84", fontStyle: "italic" }}>Really Worth?</span>
          </h1>
          <p className="mt-6 max-w-md" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.5)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Get a complimentary, personalized Comparative Market Analysis from a Top 5% Keller Williams agent. Not an algorithm — a real expert analysis based on your home's unique features and current Eastside market conditions.
          </p>

          {/* Trust signals */}
          <div className="mt-10 flex gap-8" style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 1s",
          }}>
            {[
              { icon: "✦", text: "No obligation" },
              { icon: "✦", text: "Delivered within 24hrs" },
              { icon: "✦", text: "100% complimentary" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span style={{ color: "#C1AC84", fontSize: "0.6rem" }}>{t.icon}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(253,251,247,0.4)", letterSpacing: "0.1em" }}>{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Multi-step Form */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(.16,1,.3,1) 0.6s",
        }}>
          <div className="relative p-8 lg:p-10" style={{
            background: "rgba(15,15,12,0.8)",
            border: "1px solid rgba(193,172,132,0.12)",
            backdropFilter: "blur(20px)",
          }}>
            {/* Decorative corner */}
            <div className="absolute -top-px -left-px w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: "#C1AC84" }} />
              <div className="absolute top-0 left-0 w-px h-full" style={{ background: "#C1AC84" }} />
            </div>
            <div className="absolute -bottom-px -right-px w-12 h-12">
              <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: "#C1AC84" }} />
              <div className="absolute bottom-0 right-0 w-px h-full" style={{ background: "#C1AC84" }} />
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {["Address", "Details", "Contact"].map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 flex items-center justify-center text-xs transition-all duration-300"
                      style={{
                        border: `1px solid ${step >= i ? "#C1AC84" : "rgba(193,172,132,0.15)"}`,
                        background: step > i ? "#C1AC84" : "transparent",
                        color: step > i ? "#0F0F0C" : step === i ? "#C1AC84" : "rgba(193,172,132,0.25)",
                        fontFamily: "'Cormorant Garamond', serif",
                      }}>
                      {step > i ? "✓" : i + 1}
                    </div>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.7rem",
                      color: step >= i ? "#C1AC84" : "rgba(193,172,132,0.25)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}>{s}</span>
                  </div>
                  {i < 2 && <div className="w-8 h-px" style={{ background: step > i ? "#C1AC84" : "rgba(193,172,132,0.1)" }} />}
                </div>
              ))}
            </div>

            {/* Step 0: Address */}
            {step === 0 && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#FDFBF7", marginBottom: "0.5rem" }}>
                  Enter your property address
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.35)", marginBottom: "1.5rem" }}>
                  We'll prepare a detailed market analysis for your specific property.
                </p>
                <input type="text" placeholder="Street Address" value={formData.street} onChange={(e) => updateField("street", e.target.value)}
                  className="w-full px-5 py-4 outline-none mb-3 transition-all duration-200 focus:border-amber-400/40"
                  style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={formData.city} onChange={(e) => updateField("city", e.target.value)}
                    className="w-full px-5 py-4 outline-none transition-all duration-200 focus:border-amber-400/40"
                    style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="State" value={formData.state} onChange={(e) => updateField("state", e.target.value)}
                      className="w-full px-5 py-4 outline-none transition-all duration-200 focus:border-amber-400/40"
                      style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />
                    <input type="text" placeholder="ZIP" value={formData.zip} onChange={(e) => updateField("zip", e.target.value)}
                      className="w-full px-5 py-4 outline-none transition-all duration-200 focus:border-amber-400/40"
                      style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />
                  </div>
                </div>
                <button onClick={() => setStep(1)}
                  className="w-full mt-5 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}>
                  Continue
                </button>
              </div>
            )}

            {/* Step 1: Property Details */}
            {step === 1 && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#FDFBF7", marginBottom: "0.5rem" }}>
                  Tell us about your home
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.35)", marginBottom: "1.5rem" }}>
                  These details help us provide a more accurate valuation.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {[
                    { key: "beds", label: "Bedrooms", options: ["1", "2", "3", "4", "5", "6+"] },
                    { key: "baths", label: "Bathrooms", options: ["1", "1.5", "2", "2.5", "3", "3.5", "4+"] },
                  ].map((field) => (
                    <div key={field.key}>
                      <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                        {field.label}
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {field.options.map((opt) => (
                          <button key={opt} onClick={() => updateField(field.key, opt)}
                            className="px-3 py-2 text-sm transition-all duration-200"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              border: `1px solid ${formData[field.key] === opt ? "#C1AC84" : "rgba(193,172,132,0.12)"}`,
                              background: formData[field.key] === opt ? "rgba(193,172,132,0.1)" : "transparent",
                              color: formData[field.key] === opt ? "#C1AC84" : "rgba(253,251,247,0.4)",
                            }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <input type="text" placeholder="Approx. Square Footage" value={formData.sqft} onChange={(e) => updateField("sqft", e.target.value)}
                  className="w-full px-5 py-4 outline-none mb-3 transition-all duration-200 focus:border-amber-400/40"
                  style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />

                <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Overall Condition
                </label>
                <div className="flex gap-2 mb-5">
                  {["Excellent", "Good", "Fair", "Needs Work"].map((c) => (
                    <button key={c} onClick={() => updateField("condition", c)}
                      className="flex-1 py-2.5 text-xs transition-all duration-200"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        letterSpacing: "0.1em",
                        border: `1px solid ${formData.condition === c ? "#C1AC84" : "rgba(193,172,132,0.12)"}`,
                        background: formData.condition === c ? "rgba(193,172,132,0.1)" : "transparent",
                        color: formData.condition === c ? "#C1AC84" : "rgba(253,251,247,0.4)",
                      }}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(0)}
                    className="px-6 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", border: "1px solid rgba(193,172,132,0.2)", color: "#C1AC84" }}>
                    Back
                  </button>
                  <button onClick={() => setStep(2)}
                    className="flex-1 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}>
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {step === 2 && (
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#FDFBF7", marginBottom: "0.5rem" }}>
                  Where should we send your report?
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.35)", marginBottom: "1.5rem" }}>
                  Meena will personally review and deliver your CMA within 24 hours.
                </p>
                {[
                  { key: "name", placeholder: "Full Name", type: "text" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                  { key: "phone", placeholder: "Phone Number", type: "tel" },
                ].map((f) => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} value={formData[f.key]}
                    onChange={(e) => updateField(f.key, e.target.value)}
                    className="w-full px-5 py-4 outline-none mb-3 transition-all duration-200 focus:border-amber-400/40"
                    style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,172,132,0.15)", color: "#FDFBF7", fontSize: "0.95rem" }} />
                ))}
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setStep(1)}
                    className="px-6 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", border: "1px solid rgba(193,172,132,0.2)", color: "#C1AC84" }}>
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}>
                    {submitting ? "Sending..." : "Get My Free Valuation"}
                  </button>
                </div>
                <p className="mt-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(253,251,247,0.2)" }}>
                  Your information is private and will never be shared.
                </p>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center py-8" style={{ animation: "fadeIn 0.4s ease" }}>
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full" style={{ border: "1px solid rgba(193,172,132,0.3)" }}>
                  <span style={{ color: "#C1AC84", fontSize: "1.5rem" }}>✓</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#FDFBF7", marginBottom: "0.75rem" }}>
                  Request Received
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "rgba(253,251,247,0.5)", lineHeight: 1.7 }}>
                  Meena will personally review your property and deliver a complimentary CMA to <span style={{ color: "#C1AC84" }}>{formData.email}</span> within 24 hours.
                </p>
                <p className="mt-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(193,172,132,0.5)", letterSpacing: "0.1em" }}>
                  Questions? Call directly at{" "}
                  <a href="tel:4256288863" style={{ color: "#C1AC84" }}>425-628-8863</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </form>
  );
}

// ─── Eastside Market Stats ───
function MarketStats() {
  return (
    <section className="py-24" style={{ background: "#13130F" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Eastside Market Snapshot
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Today's <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Market</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(193,172,132,0.06)" }}>
          {[
            { value: 1285, prefix: "$", suffix: "K", label: "Median Home Price", sub: "Kirkland, WA" },
            { value: 12, prefix: "", suffix: " Days", label: "Avg. Days on Market", sub: "Eastside Average" },
            { value: 97, prefix: "", suffix: "%", label: "Sale-to-List Ratio", sub: "Seller's Advantage" },
            { value: 18, prefix: "", suffix: "%", label: "YoY Appreciation", sub: "Eastside Growth" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="p-10 text-center" style={{ background: "#13130F" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#C1AC84" }}>
                  <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.5)" }}>
                  {stat.label}
                </div>
                <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {stat.sub}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Sell With Meena ───
function WhySellWithMeena() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: "Personalized CMA",
      desc: "Receive a comprehensive Comparative Market Analysis tailored to your property — not a one-size-fits-all algorithm. Meena evaluates recent comparable sales, active competition, and hyperlocal trends to pinpoint your ideal listing price.",
      icon: "📊",
    },
    {
      num: "02",
      title: "Strategic Staging & Prep",
      desc: "From professional staging consultation to pre-listing repairs, Meena coordinates every detail to present your home at its absolute best. First impressions drive offers — and Meena ensures yours is unforgettable.",
      icon: "🏡",
    },
    {
      num: "03",
      title: "Premium Marketing",
      desc: "Professional photography, drone aerial views, 3D virtual tours, and cinematic video walkthroughs. Your listing reaches qualified buyers through targeted digital campaigns, the KW global network, and Meena's Eastside connections.",
      icon: "📸",
    },
    {
      num: "04",
      title: "Expert Negotiation",
      desc: "With $34M+ in transaction volume, Meena brings sharp negotiation skills to protect your bottom line. From multiple offer strategies to inspection negotiations, every dollar matters.",
      icon: "🤝",
    },
    {
      num: "05",
      title: "Seamless Closing",
      desc: "Meena manages the entire closing process — inspections, appraisals, title, escrow — so you can focus on your next chapter. You'll always know exactly where things stand.",
      icon: "✨",
    },
  ];

  return (
    <section className="py-28" style={{ background: "#0F0F0C" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <SlideIn>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
              The Selling Experience
            </p>
            <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "#FDFBF7", fontWeight: 400, lineHeight: 1.2 }}>
              A Proven Process
              <br />
              <span style={{ fontStyle: "italic", color: "#C1AC84" }}>from List to Close</span>
            </h2>
            <p className="mt-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.4)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Selling your home is one of the most significant financial decisions you'll make. Meena's five-step process ensures nothing is left to chance — and that you net the highest possible return.
            </p>

            {/* Process image */}
            <div className="mt-10 relative" style={{ aspectRatio: "16/10" }}>
              <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" alt="Luxury Home Interior" className="w-full h-full object-cover" style={{ filter: "brightness(0.7) sepia(0.1)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,12,0.8) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#FDFBF7" }}>$34M+</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Total Volume Sold</div>
              </div>
            </div>
          </SlideIn>

          {/* Steps accordion */}
          <SlideIn from="right">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="cursor-pointer group" onClick={() => setActiveStep(i)}
                  style={{ borderBottom: "1px solid rgba(193,172,132,0.06)" }}>
                  <div className="flex items-center gap-5 py-5 transition-all duration-300">
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "0.85rem",
                      color: activeStep === i ? "#C1AC84" : "rgba(193,172,132,0.2)",
                      transition: "color 0.3s",
                      width: "28px",
                    }}>
                      {step.num}
                    </span>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      color: activeStep === i ? "#FDFBF7" : "rgba(253,251,247,0.4)",
                      transition: "color 0.3s",
                      flex: 1,
                    }}>
                      {step.title}
                    </h3>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      style={{ transform: activeStep === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                      <path d="M2 4L6 8L10 4" stroke={activeStep === i ? "#C1AC84" : "rgba(193,172,132,0.2)"} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="overflow-hidden transition-all duration-500"
                    style={{ maxHeight: activeStep === i ? "200px" : "0", opacity: activeStep === i ? 1 : 0 }}>
                    <p className="pl-12 pb-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(253,251,247,0.4)", lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

// ─── CMA vs Online Estimate ───
function CMAComparison() {
  return (
    <section className="py-24" style={{ background: "#13130F" }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Know the Difference
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Online Estimate vs. <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Expert CMA</span>
          </h2>
        </FadeUp>

        <FadeUp>
          <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(193,172,132,0.06)" }}>
            {/* Online */}
            <div className="p-10" style={{ background: "#13130F" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(193,172,132,0.12)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🖥</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "rgba(253,251,247,0.5)" }}>
                  Online Estimates
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "Algorithm-based, generic data",
                  "Can't assess renovations or upgrades",
                  "Ignores unique features & lot characteristics",
                  "Median error rate of 5-8%",
                  "No strategy or pricing guidance",
                  "One-size-fits-all snapshot",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: "rgba(193,172,132,0.25)", fontSize: "0.75rem", marginTop: "2px" }}>—</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(253,251,247,0.35)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CMA */}
            <div className="p-10 relative" style={{ background: "rgba(193,172,132,0.03)" }}>
              <div className="absolute top-4 right-4 px-3 py-1" style={{ background: "rgba(193,172,132,0.12)" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.55rem", color: "#C1AC84", letterSpacing: "0.2em", textTransform: "uppercase" }}>Recommended</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 flex items-center justify-center" style={{ border: "1px solid rgba(193,172,132,0.3)", background: "rgba(193,172,132,0.06)" }}>
                  <span style={{ fontSize: "1.2rem" }}>✦</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#FDFBF7" }}>
                  Meena's Expert CMA
                </h3>
              </div>
              <div className="space-y-4">
                {[
                  "In-person evaluation of your home",
                  "Accounts for upgrades, condition & finishes",
                  "Analyzes lot, views, location & neighborhood",
                  "Hyper-accurate with local market data",
                  "Includes pricing strategy & timeline",
                  "Personalized to your goals",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span style={{ color: "#C1AC84", fontSize: "0.65rem", marginTop: "4px" }}>✦</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(253,251,247,0.6)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Recent Sales ───
function RecentSales() {
  const sales = [
    { address: "14236 95th Ave NE", city: "Kirkland", price: "$1,285,000", listed: "$1,250,000", days: 6, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" },
    { address: "8820 161st Ave NE", city: "Redmond", price: "$1,510,000", listed: "$1,475,000", days: 4, img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80" },
    { address: "22015 Country Dr", city: "Bothell", price: "$748,000", listed: "$725,000", days: 9, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80" },
  ];

  return (
    <section className="py-24" style={{ background: "#0F0F0C" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Proven Results
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Recently <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Sold</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {sales.map((sale, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="group relative overflow-hidden" style={{ border: "1px solid rgba(193,172,132,0.06)" }}>
                <div className="relative" style={{ aspectRatio: "4/3" }}>
                  <img src={sale.img} alt={sale.address} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "brightness(0.75)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,12,0.9) 0%, transparent 50%)" }} />
                  <div className="absolute top-4 left-4 px-3 py-1" style={{ background: "rgba(193,172,132,0.9)" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "#0F0F0C", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>Sold</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#FDFBF7" }}>{sale.price}</div>
                    <div className="mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "rgba(253,251,247,0.5)" }}>
                      {sale.address}, {sale.city}
                    </div>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center" style={{ background: "rgba(15,15,12,0.8)" }}>
                  <div>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Listed at</span>
                    <span className="ml-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.5)" }}>{sale.listed}</span>
                  </div>
                  <div className="text-right">
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Days</span>
                    <span className="ml-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "#C1AC84" }}>{sale.days}</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bottom CTA ───
function BottomCTA() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#13130F" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(193,172,132,0.06) 0%, transparent 60%)" }} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Ready to Take the Next Step?
          </p>
          <h2 className="mt-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#FDFBF7", fontWeight: 400, lineHeight: 1.2 }}>
            Let's Discover Your Home's
            <br />
            <span style={{ fontStyle: "italic", color: "#C1AC84" }}>True Value Together</span>
          </h2>
          <p className="mt-6 max-w-md mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.4)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            Whether you're ready to list tomorrow or just curious about your options, a conversation with Meena costs nothing and could be worth everything.
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}>
              Get Your Free CMA
            </button>
            <button className="px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5"
              style={{ fontFamily: "'Cormorant Garamond', serif", border: "1px solid rgba(193,172,132,0.3)", color: "#C1AC84" }}>
              Call 425-628-8863
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-12" style={{ background: "#0A0A08", borderTop: "1px solid rgba(193,172,132,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#C1AC84" }}>HOMES</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.35em", textTransform: "uppercase" }}>by Meena</span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
          © 2026 Meena Dhawan · Keller Williams Eastside · All Rights Reserved
        </p>
        <div className="flex gap-6">
          {["Facebook", "Instagram", "LinkedIn"].map((s) => (
            <a key={s} href="#" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }} className="hover:text-amber-200 transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───
export default function HomeValuePage() {
  return (
    <div style={{ background: "#0F0F0C", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      <Navbar />
      <HeroValuation />
      <MarketStats />
      <WhySellWithMeena />
      <CMAComparison />
      <RecentSales />
      <BottomCTA />
      <Footer />
    </div>
  );
}
