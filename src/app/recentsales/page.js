import { useState, useEffect, useRef } from "react";

// ─── Animation ───
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

// ─── Data ───
const SOLD = [
  { id: 1, address: "14236 95th Ave NE", city: "Kirkland", zip: "98034", price: 1285000, listed: 1250000, beds: 4, baths: 3, sqft: 2850, year: 2019, type: "Single Family", soldDate: "Mar 2026", daysOnMarket: 6, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80" },
  { id: 2, address: "8820 161st Ave NE", city: "Redmond", zip: "98052", price: 1510000, listed: 1475000, beds: 5, baths: 3.5, sqft: 3400, year: 2022, type: "Single Family", soldDate: "Mar 2026", daysOnMarket: 4, img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80" },
  { id: 3, address: "22015 Country Dr", city: "Bothell", zip: "98021", price: 748000, listed: 725000, beds: 3, baths: 2, sqft: 1850, year: 2020, type: "Townhome", soldDate: "Feb 2026", daysOnMarket: 9, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80" },
  { id: 4, address: "1234 228th Ave SE", city: "Sammamish", zip: "98075", price: 1380000, listed: 1350000, beds: 4, baths: 3, sqft: 2900, year: 2018, type: "Single Family", soldDate: "Feb 2026", daysOnMarket: 11, img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=80" },
  { id: 5, address: "520 Bellevue Way NE", city: "Bellevue", zip: "98004", price: 2175000, listed: 2100000, beds: 5, baths: 4, sqft: 4200, year: 2023, type: "Single Family", soldDate: "Jan 2026", daysOnMarket: 8, img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=700&q=80" },
  { id: 6, address: "980 NW Maple St", city: "Issaquah", zip: "98027", price: 895000, listed: 875000, beds: 3, baths: 2.5, sqft: 2100, year: 2017, type: "Condo", soldDate: "Jan 2026", daysOnMarket: 15, img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=700&q=80" },
  { id: 7, address: "405 Market St", city: "Kirkland", zip: "98033", price: 1720000, listed: 1650000, beds: 4, baths: 3.5, sqft: 3100, year: 2024, type: "Single Family", soldDate: "Dec 2025", daysOnMarket: 5, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80" },
  { id: 8, address: "7312 NE 145th St", city: "Kirkland", zip: "98034", price: 1050000, listed: 1025000, beds: 3, baths: 2.5, sqft: 2200, year: 2015, type: "Single Family", soldDate: "Dec 2025", daysOnMarket: 7, img: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=700&q=80" },
  { id: 9, address: "4500 Klahanie Blvd", city: "Sammamish", zip: "98029", price: 1620000, listed: 1580000, beds: 5, baths: 4, sqft: 3600, year: 2020, type: "Single Family", soldDate: "Nov 2025", daysOnMarket: 10, img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=700&q=80" },
  { id: 10, address: "19845 40th Ave W", city: "Bothell", zip: "98012", price: 680000, listed: 669000, beds: 2, baths: 2, sqft: 1400, year: 2021, type: "Townhome", soldDate: "Nov 2025", daysOnMarket: 13, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80" },
  { id: 11, address: "3201 Lakemont Blvd", city: "Bellevue", zip: "98006", price: 1890000, listed: 1850000, beds: 5, baths: 3.5, sqft: 3800, year: 2019, type: "Single Family", soldDate: "Oct 2025", daysOnMarket: 6, img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=80" },
  { id: 12, address: "11245 NE 120th St", city: "Kirkland", zip: "98034", price: 925000, listed: 899000, beds: 3, baths: 2, sqft: 1950, year: 2016, type: "Single Family", soldDate: "Oct 2025", daysOnMarket: 12, img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&q=80" },
];

const CITIES_FILTER = ["All", "Kirkland", "Bellevue", "Redmond", "Bothell", "Sammamish", "Issaquah"];
const TYPES_FILTER = ["All", "Single Family", "Townhome", "Condo"];
const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// ─── Summary Stats ───
function SummaryStats({ listings }) {
  const totalVolume = listings.reduce((s, l) => s + l.price, 0);
  const avgDOM = Math.round(listings.reduce((s, l) => s + l.daysOnMarket, 0) / listings.length);
  const avgOverList = ((listings.reduce((s, l) => s + (l.price / l.listed), 0) / listings.length) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(193,172,132,0.06)" }}>
      {[
        { label: "Properties Sold", value: listings.length },
        { label: "Total Volume", value: fmt(totalVolume) },
        { label: "Avg. Days on Market", value: avgDOM },
        { label: "Avg. Sale-to-List", value: `${avgOverList}%` },
      ].map((s, i) => (
        <div key={i} className="py-8 px-6 text-center" style={{ background: "#13130F" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#C1AC84" }}>
            {s.value}
          </div>
          <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Property Card ───
function SoldCard({ listing, index }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const overList = (((listing.price - listing.listed) / listing.listed) * 100).toFixed(1);
  const isOver = listing.price > listing.listed;

  return (
    <FadeUp delay={index * 0.06}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{ border: "1px solid rgba(193,172,132,0.06)", background: hovered ? "rgba(193,172,132,0.02)" : "transparent", transition: "background 0.3s" }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/11" }}>
          <img
            src={listing.img} alt={listing.address}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)", filter: "brightness(0.75)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,12,0.85) 0%, rgba(15,15,12,0.1) 50%)" }} />

          {/* Sold badge */}
          <div className="absolute top-4 left-4 px-3 py-1" style={{ background: "rgba(193,172,132,0.9)" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "#0F0F0C", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>Sold</span>
          </div>

          {/* Over-list badge */}
          {isOver && (
            <div className="absolute top-4 right-4 px-3 py-1" style={{ background: "rgba(15,15,12,0.8)", border: "1px solid rgba(193,172,132,0.2)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "#C1AC84", letterSpacing: "0.1em" }}>+{overList}% over list</span>
            </div>
          )}

          {/* Bottom overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#FDFBF7" }}>{fmt(listing.price)}</div>
            <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.55)" }}>
              {listing.address}
            </div>
            <div className="mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.5)", letterSpacing: "0.1em" }}>
              {listing.city}, WA {listing.zip}
            </div>
          </div>
        </div>

        {/* Details bar */}
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderTop: "1px solid rgba(193,172,132,0.04)" }}>
          <div className="flex gap-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "rgba(253,251,247,0.4)" }}>
            <span>{listing.beds} bd</span>
            <span style={{ color: "rgba(193,172,132,0.15)" }}>|</span>
            <span>{listing.baths} ba</span>
            <span style={{ color: "rgba(193,172,132,0.15)" }}>|</span>
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.35)", letterSpacing: "0.1em" }}>
            {listing.soldDate}
          </div>
        </div>

        {/* Expanded detail panel */}
        <div className="overflow-hidden transition-all duration-500" style={{ maxHeight: expanded ? "200px" : "0", opacity: expanded ? 1 : 0 }}>
          <div className="px-5 pb-5 pt-1 grid grid-cols-2 gap-y-3 gap-x-8" style={{ borderTop: "1px solid rgba(193,172,132,0.06)" }}>
            {[
              { label: "Listed At", val: fmt(listing.listed) },
              { label: "Sold At", val: fmt(listing.price) },
              { label: "Days on Market", val: listing.daysOnMarket },
              { label: "Sale-to-List", val: `${((listing.price / listing.listed) * 100).toFixed(1)}%` },
              { label: "Property Type", val: listing.type },
              { label: "Year Built", val: listing.year },
            ].map((d) => (
              <div key={d.label} className="flex justify-between items-baseline">
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{d.label}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.55)" }}>{d.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Main Page ───
export default function RecentSalesPage() {
  const [loaded, setLoaded] = useState(false);
  const [cityFilter, setCityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [layout, setLayout] = useState("grid"); // grid | list

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const filtered = SOLD
    .filter((l) => cityFilter === "All" || l.city === cityFilter)
    .filter((l) => typeFilter === "All" || l.type === typeFilter)
    .sort((a, b) => {
      if (sortBy === "date") return 0; // already sorted by date
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "fastest") return a.daysOnMarket - b.daysOnMarket;
      return 0;
    });

  return (
    <div style={{ background: "#0F0F0C", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{ background: "rgba(15,15,12,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(193,172,132,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#C1AC84", letterSpacing: "0.04em" }}>HOMES</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.6)", letterSpacing: "0.35em", textTransform: "uppercase" }}>by Meena</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Buy", href: "/buy" },
              { label: "Home Value", href: "/home-value" },
              { label: "Recent Sales", href: "/recent-sales", active: true },
              { label: "Communities", href: "/communities" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="relative group"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: item.active ? "#C1AC84" : "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full"
                  style={{ width: item.active ? "100%" : "0" }} />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "#0F0F0C" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(193,172,132,0.06) 0%, transparent 60%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 1s cubic-bezier(.16,1,.3,1) 0.3s" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
            Proven Track Record
          </p>
          <h1 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1, color: "#FDFBF7", fontWeight: 400 }}>
            Recent <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Sales</span>
          </h1>
          <p className="mt-4 max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.45)", fontSize: "1.1rem", lineHeight: 1.7 }}>
            Every home tells a story of strategy, preparation, and results. Here are the properties Meena has recently sold across the Eastside — most above asking price and in under two weeks.
          </p>
        </div>
      </section>

      {/* ── Summary Stats ── */}
      <section className="max-w-7xl mx-auto px-6 -mt-2 relative z-10">
        <FadeUp>
          <SummaryStats listings={filtered} />
        </FadeUp>
      </section>

      {/* ── Filters ── */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <FadeUp>
          <div className="flex flex-wrap items-center gap-4 pb-8" style={{ borderBottom: "1px solid rgba(193,172,132,0.06)" }}>
            {/* City pills */}
            <div className="flex flex-wrap gap-2">
              {CITIES_FILTER.map((c) => (
                <button key={c} onClick={() => setCityFilter(c)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.1em",
                    border: `1px solid ${cityFilter === c ? "#C1AC84" : "rgba(193,172,132,0.1)"}`,
                    background: cityFilter === c ? "rgba(193,172,132,0.1)" : "transparent",
                    color: cityFilter === c ? "#C1AC84" : "rgba(253,251,247,0.35)",
                  }}>
                  {c}
                </button>
              ))}
            </div>

            <div className="w-px h-6 mx-2" style={{ background: "rgba(193,172,132,0.08)" }} />

            {/* Type pills */}
            <div className="flex gap-2">
              {TYPES_FILTER.map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)}
                  className="px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.1em",
                    border: `1px solid ${typeFilter === t ? "#C1AC84" : "rgba(193,172,132,0.1)"}`,
                    background: typeFilter === t ? "rgba(193,172,132,0.1)" : "transparent",
                    color: typeFilter === t ? "#C1AC84" : "rgba(253,251,247,0.35)",
                  }}>
                  {t}
                </button>
              ))}
            </div>

            {/* Right side: sort + layout */}
            <div className="ml-auto flex items-center gap-4">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 outline-none cursor-pointer"
                style={{
                  fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(193,172,132,0.1)",
                  color: "rgba(253,251,247,0.45)", appearance: "none", paddingRight: "24px",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='rgba(193,172,132,0.4)' stroke-width='1.2'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center",
                }}>
                <option value="date" style={{ background: "#14140F" }}>Most Recent</option>
                <option value="priceHigh" style={{ background: "#14140F" }}>Price: High to Low</option>
                <option value="priceLow" style={{ background: "#14140F" }}>Price: Low to High</option>
                <option value="fastest" style={{ background: "#14140F" }}>Fastest Sale</option>
              </select>

              {/* Layout toggle */}
              <div className="flex">
                {[
                  { id: "grid", icon: "⊞" },
                  { id: "list", icon: "☰" },
                ].map((v) => (
                  <button key={v.id} onClick={() => setLayout(v.id)}
                    className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                    style={{
                      border: "1px solid rgba(193,172,132,0.1)",
                      borderLeft: v.id === "list" ? "none" : undefined,
                      background: layout === v.id ? "rgba(193,172,132,0.08)" : "transparent",
                      color: layout === v.id ? "#C1AC84" : "rgba(193,172,132,0.25)",
                      fontSize: "0.9rem",
                    }}>
                    {v.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 mb-2">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(193,172,132,0.35)", letterSpacing: "0.15em" }}>
              {filtered.length} {filtered.length === 1 ? "PROPERTY" : "PROPERTIES"}
            </span>
          </div>
        </FadeUp>
      </section>

      {/* ── Listings Grid / List ── */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <FadeUp className="py-20 text-center">
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "rgba(253,251,247,0.25)" }}>No properties match your filters</div>
            <p className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(253,251,247,0.15)" }}>Try adjusting your selections above.</p>
          </FadeUp>
        ) : layout === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((listing, i) => (
              <SoldCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((listing, i) => (
              <FadeUp key={listing.id} delay={i * 0.04}>
                <div className="group flex gap-5 p-4 cursor-pointer transition-all duration-300 hover:bg-white/[0.015]"
                  style={{ border: "1px solid rgba(193,172,132,0.06)" }}>
                  {/* Thumb */}
                  <div className="relative w-36 h-24 flex-shrink-0 overflow-hidden">
                    <img src={listing.img} alt={listing.address} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ filter: "brightness(0.8)" }} />
                    <div className="absolute top-2 left-2 px-2 py-0.5" style={{ background: "rgba(193,172,132,0.9)" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.5rem", color: "#0F0F0C", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>Sold</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex items-center">
                    <div className="flex-1">
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#C1AC84" }}>{fmt(listing.price)}</div>
                      <div className="mt-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.45)" }}>
                        {listing.address}, {listing.city}
                      </div>
                      <div className="mt-1 flex gap-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(253,251,247,0.3)" }}>
                        <span>{listing.beds} bd</span>
                        <span style={{ color: "rgba(193,172,132,0.15)" }}>|</span>
                        <span>{listing.baths} ba</span>
                        <span style={{ color: "rgba(193,172,132,0.15)" }}>|</span>
                        <span>{listing.sqft.toLocaleString()} sqft</span>
                        <span style={{ color: "rgba(193,172,132,0.15)" }}>|</span>
                        <span>{listing.type}</span>
                      </div>
                    </div>

                    {/* Right meta */}
                    <div className="text-right ml-6 hidden md:block">
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.35)", letterSpacing: "0.1em" }}>
                        Listed {fmt(listing.listed)}
                      </div>
                      <div className="mt-1 flex items-center gap-3 justify-end">
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(253,251,247,0.3)" }}>
                          {listing.daysOnMarket} days
                        </span>
                        {listing.price > listing.listed && (
                          <span className="px-2 py-0.5" style={{
                            fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "#C1AC84",
                            border: "1px solid rgba(193,172,132,0.2)", letterSpacing: "0.1em",
                          }}>
                            +{(((listing.price - listing.listed) / listing.listed) * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.25)" }}>
                        {listing.soldDate}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 relative" style={{ background: "#13130F" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(193,172,132,0.05) 0%, transparent 60%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <FadeUp>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84", letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "0.75rem" }}>
              Your Home Could Be Next
            </p>
            <h2 className="mt-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#FDFBF7", fontWeight: 400, lineHeight: 1.2 }}>
              Ready to Join the
              <br />
              <span style={{ fontStyle: "italic", color: "#C1AC84" }}>Success Stories?</span>
            </h2>
            <p className="mt-5 max-w-md mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(253,251,247,0.4)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Whether buying or selling, Meena's Eastside expertise and proven results make all the difference.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}>
                Get Your Home's Value
              </button>
              <button className="px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5"
                style={{ fontFamily: "'Cormorant Garamond', serif", border: "1px solid rgba(193,172,132,0.3)", color: "#C1AC84" }}>
                Contact Meena
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10" style={{ background: "#0A0A08", borderTop: "1px solid rgba(193,172,132,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#C1AC84" }}>HOMES</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.35em", textTransform: "uppercase" }}>by Meena</span>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.12em" }}>
            © 2026 Meena Dhawan · Keller Williams Eastside · All Rights Reserved · Data courtesy NWMLS
          </p>
          <div className="flex gap-6">
            {["Facebook", "Instagram", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="hover:text-amber-200 transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}