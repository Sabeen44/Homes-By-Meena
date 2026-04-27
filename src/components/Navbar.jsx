"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = ["Buy", "Sell", "Communities", "About", "Contact"];

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
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group font-cormorant text-[0.85rem] text-white/60 tracking-[0.2em] uppercase hover:text-white/90 transition-colors"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button className="ml-4 px-6 py-2 font-cormorant text-xs tracking-widest uppercase border border-gold/50 text-gold hover:bg-gold hover:text-dark transition-all duration-300">
            Schedule a Call
          </button>
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
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block py-3 border-b border-white/5 font-cormorant text-white/60 tracking-[0.2em] uppercase text-sm"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

