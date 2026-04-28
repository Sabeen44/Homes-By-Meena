'use client'
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { LISTINGS } from "@/lib/data";
import Image from "next/image";

import { useState } from "react";

export default function FeaturedListings() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="buy" className="py-24" style={{ background: "#0F0F0C" }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Notable Sales
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FDFBF7", fontWeight: 400 }}>
            Homes Sold by <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Meena</span>
          </h2>
        </FadeUp>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LISTINGS.map((listing, i) => (
            <FadeUp key={listing.id} delay={i * 0.1}>
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredId(listing.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={listing.img}
                    alt={listing.area}
                    fill
                    className="object-cover transition-transform duration-700"
                    style={{
                      transform: hoveredId === listing.id ? "scale(1.08)" : "scale(1)",
                      filter: "brightness(0.8)",
                    }}
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(15,15,12,0.85) 0%, rgba(15,15,12,0.1) 50%)",
                  }} />

                  {/* Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1"
                    style={{
                      background: listing.tag === "Sold" ? "rgba(193,172,132,0.9)" : "rgba(15,15,12,0.8)",
                      border: listing.tag === "Sold" ? "none" : "1px solid rgba(193,172,132,0.3)",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: listing.tag === "Sold" ? "#0F0F0C" : "#C1AC84",
                    }}>{listing.tag}</span>
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.6)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                      {listing.area}, WA
                    </div>
                    <div className="mt-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#FDFBF7" }}>
                      {listing.price}
                    </div>
                    <div className="mt-2 flex gap-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                      <span>{listing.beds} Beds</span>
                      <span>·</span>
                      <span>{listing.baths} Baths</span>
                      <span>·</span>
                      <span>{listing.sqft} Sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-12 text-center">
          <Link
            href="/recentsales"
            className="px-10 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-amber-400/10 inline-block"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              border: "1px solid rgba(193,172,132,0.3)",
              color: "#C1AC84",
            }}
          >
            View All Listings
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

