export default function Footer() {
  return (
    <footer className="py-12" style={{ background: "#0A0A08", borderTop: "1px solid rgba(193,172,132,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#C1AC84", letterSpacing: "0.04em" }}>HOMES</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.35em", textTransform: "uppercase" }}>by Meena</span>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>
          © 2026 Meena Dhawan · Keller Williams Eastside · All Rights Reserved
        </p>
        <div className="flex gap-6">
          {[
            { label: "Facebook", href: "https://www.facebook.com/meena.dhawan.realtor" },
            { label: "Instagram", href: "https://www.instagram.com/meenadhawan.realtor" },
            { label: "Zillow", href: "https://www.zillow.com/profile/Meena%20Dhawan" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}
              className="hover:text-amber-200 transition-colors">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

