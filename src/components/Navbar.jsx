"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Search Homes", href: "/buy" },
  { label: "Home Value", href: "/homevaluepage" },
  { label: "Recent Sales", href: "/recentsales" },
  { label: "Contact", href: "/#contact" },
];

const ZILLOW_URL = "https://www.zillow.com/profile/Meena%20Dhawan";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${scrolled ? "bg-dark/90 backdrop-blur-xl border-b border-gold/15" : "border-b border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-playfair text-2xl text-gold tracking-wider">
            HOMES
          </span>
          <span className="font-cormorant text-[0.7rem] text-gold/50 tracking-[0.35em] uppercase">
            by Meena
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative group font-cormorant text-[0.85rem] text-white/60 tracking-[0.2em] uppercase hover:text-white/90 transition-colors"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Zillow reviews */}
          <a
            href={ZILLOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 transition-all duration-300 hover:bg-gold/10 group"
            style={{ border: "1px solid rgba(193,172,132,0.45)", background: "rgba(193,172,132,0.06)" }}
            title="Reviews on Zillow"
          >
            <svg width="15" height="15" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L4 28h10v32h36V28h10L32 4z" fill="#C1AC84" />
            </svg>
            <span className="font-cormorant text-[0.78rem] text-gold tracking-[0.15em] uppercase group-hover:text-cream transition-colors">
              Reviews
            </span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-px bg-gold/80 transition-all ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-px bg-gold/80 transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-gold/80 transition-all ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 px-6 pb-6 overflow-hidden"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 border-b border-white/5 font-cormorant text-white/60 tracking-[0.2em] uppercase text-sm"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={ZILLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 border-b border-white/5 font-cormorant text-gold/60 tracking-[0.2em] uppercase text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 64 64" fill="none"><path d="M32 4L4 28h10v32h36V28h10L32 4z" fill="#C1AC84" fillOpacity="0.8"/></svg>
              Zillow Reviews
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

