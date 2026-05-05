"use client";
import { useState } from "react";
import { FadeUp } from "./animations/FadeUp";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    // ─────────────────────────────────────────────
    // TODO: Replace with your Mailchimp form action
    // ─────────────────────────────────────────────
    // Option 1: Mailchimp embedded form action URL
    // Change the fetch URL to your Mailchimp endpoint:
    // https://xyz.us1.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX
    //
    // Option 2: API route (recommended for Next.js)
    // Create an API route at /api/subscribe that posts
    // to Mailchimp's API, then fetch("/api/subscribe", ...)
    // ─────────────────────────────────────────────

    try {
      // Simulating a successful submission for now
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative py-24"
      style={{
        background: "#0F0F0C",
        borderTop: "1px solid rgba(193,172,132,0.06)",
      }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(193,172,132,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <FadeUp>
          {/* Section label */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#C1AC84",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            Stay Informed
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 400,
              color: "rgba(253,251,247,0.85)",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Get <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Eastside</span> Market Updates
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.7,
              maxWidth: "420px",
              margin: "0 auto 2.5rem",
              letterSpacing: "0.02em",
            }}
          >
            Monthly insights on Kirkland, Bellevue, Redmond & the greater
            Eastside — new listings, pricing trends, and neighborhood
            highlights delivered to your inbox.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          {/* Form */}
          {status === "success" ? (
            <div
              className="transition-all duration-500"
              style={{
                padding: "20px",
                border: "1px solid rgba(193,172,132,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  color: "#C1AC84",
                  marginBottom: "6px",
                }}
              >
                Welcome to the list
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.05em",
                }}
              >
                You'll receive your first market update soon.
              </p>
            </div>
          ) : (
            <div
              className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Your email address"
                className="flex-1 outline-none transition-all duration-300 focus:border-[#C1AC84]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  color: "rgba(253,251,247,0.8)",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${
                    status === "error"
                      ? "rgba(200,100,100,0.4)"
                      : "rgba(193,172,132,0.15)"
                  }`,
                  padding: "14px 18px",
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="transition-all duration-300 hover:opacity-90"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "#0F0F0C",
                  background: "#C1AC84",
                  border: "none",
                  padding: "14px 28px",
                  cursor: status === "loading" ? "wait" : "pointer",
                  whiteSpace: "nowrap",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          )}

          {/* Error message */}
          {status === "error" && (
            <p
              className="mt-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.75rem",
                color: "rgba(200,130,130,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              Please enter a valid email address.
            </p>
          )}

          {/* Privacy note */}
          {status !== "success" && (
            <p
              className="mt-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "rgba(253,251,247,0.8)",
                letterSpacing: "0.1em",
              }}
            >
              No spam, ever. Unsubscribe anytime.
            </p>
          )}
        </FadeUp>
      </div>
    </section>
  );
}