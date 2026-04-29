"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { AGENT } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

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
              { label: "Phone", value: AGENT.phone },
              { label: "Office", value: AGENT.office },
              { label: "Location", value: AGENT.location },
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
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-14 h-14 flex items-center justify-center rounded-full mb-6" style={{ border: "1px solid rgba(193,172,132,0.3)" }}>
                <span style={{ color: "#C1AC84", fontSize: "1.3rem" }}>✓</span>
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#FDFBF7" }}>Message Sent</h3>
              <p className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.45)", fontSize: "0.95rem" }}>
                Meena will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { key: "name", placeholder: "Full Name", type: "text" },
                { key: "email", placeholder: "Email Address", type: "email" },
                { key: "phone", placeholder: "Phone Number", type: "tel" },
              ].map((field) => (
                <input
                  key={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.key !== "phone"}
                  value={form[field.key]}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full px-5 py-4 outline-none transition-all duration-300 focus:border-amber-400/40"
                  style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(193,172,132,0.12)", color: "#FDFBF7", fontSize: "0.9rem" }}
                />
              ))}
              <textarea
                placeholder="Tell me about your real estate goals..."
                rows={4}
                required
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className="w-full px-5 py-4 outline-none resize-none transition-all duration-300 focus:border-amber-400/40"
                style={{ fontFamily: "'Cormorant Garamond', serif", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(193,172,132,0.12)", color: "#FDFBF7", fontSize: "0.9rem" }}
              />
              {status === "error" && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(220,100,100,0.8)", fontSize: "0.85rem" }}>
                  Something went wrong. Please try again or call directly.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
