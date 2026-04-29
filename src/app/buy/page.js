"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SharedNavbar from "@/components/Navbar";
import { AGENT } from "@/lib/data";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
 
// ─── Sample Listing Data ───
const SAMPLE_LISTINGS = [
  // Kirkland
  { id: 1,  lat: 47.6815, lng: -122.2087, address: "14236 95th Ave NE",       city: "Kirkland",   price: 1250000, beds: 4, baths: 3,   sqft: 2850, year: 2019, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", daysOnMarket: 3  },
  { id: 7,  lat: 47.6901, lng: -122.2240, address: "405 Market St",            city: "Kirkland",   price: 1650000, beds: 4, baths: 3.5, sqft: 3100, year: 2024, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80", daysOnMarket: 2  },
  { id: 11, lat: 47.6760, lng: -122.2050, address: "11812 NE 128th St",        city: "Kirkland",   price: 1095000, beds: 3, baths: 2.5, sqft: 2100, year: 2016, type: "Townhome",      status: "Active",  img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80", daysOnMarket: 6  },
  { id: 12, lat: 47.6840, lng: -122.1960, address: "7823 112th Ave NE",        city: "Kirkland",   price: 1825000, beds: 5, baths: 4,   sqft: 3750, year: 2022, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", daysOnMarket: 1  },
  { id: 13, lat: 47.6720, lng: -122.2110, address: "3204 Lake Washington Blvd", city: "Kirkland",  price: 3200000, beds: 5, baths: 4.5, sqft: 4800, year: 2021, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=600&q=80", daysOnMarket: 8  },
  // Bothell
  { id: 2,  lat: 47.7610, lng: -122.2054, address: "18422 Bothell Way NE",     city: "Bothell",    price: 985000,  beds: 3, baths: 2.5, sqft: 2200, year: 2021, type: "Townhome",      status: "Active",  img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", daysOnMarket: 7  },
  { id: 8,  lat: 47.7502, lng: -122.1620, address: "22015 Country Dr",         city: "Bothell",    price: 725000,  beds: 2, baths: 2,   sqft: 1400, year: 2020, type: "Townhome",      status: "Active",  img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80", daysOnMarket: 12 },
  { id: 14, lat: 47.7680, lng: -122.1980, address: "2314 228th St SE",         city: "Bothell",    price: 1120000, beds: 4, baths: 3,   sqft: 2650, year: 2018, type: "Single Family", status: "Pending", img: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&q=80", daysOnMarket: 20 },
  { id: 15, lat: 47.7420, lng: -122.2080, address: "10523 Harbour Pointe Blvd", city: "Bothell",   price: 860000,  beds: 3, baths: 2,   sqft: 1950, year: 2015, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600&q=80", daysOnMarket: 15 },
  // Redmond
  { id: 3,  lat: 47.6740, lng: -122.1215, address: "8820 161st Ave NE",        city: "Redmond",    price: 1475000, beds: 5, baths: 3.5, sqft: 3400, year: 2022, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", daysOnMarket: 1  },
  { id: 9,  lat: 47.6580, lng: -122.1340, address: "15612 NE 80th St",         city: "Redmond",    price: 1320000, beds: 4, baths: 3,   sqft: 2900, year: 2021, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80", daysOnMarket: 9  },
  { id: 16, lat: 47.6810, lng: -122.1120, address: "7412 Redmond Way",         city: "Redmond",    price: 1180000, beds: 3, baths: 2.5, sqft: 2300, year: 2020, type: "Townhome",      status: "Active",  img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80", daysOnMarket: 4  },
  { id: 17, lat: 47.6650, lng: -122.1050, address: "16240 NE 87th St",         city: "Redmond",    price: 995000,  beds: 3, baths: 2,   sqft: 1900, year: 2017, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", daysOnMarket: 11 },
  // Sammamish
  { id: 4,  lat: 47.6164, lng: -122.0356, address: "1234 228th Ave SE",        city: "Sammamish",  price: 1150000, beds: 4, baths: 3,   sqft: 2600, year: 2018, type: "Single Family", status: "Pending", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80", daysOnMarket: 14 },
  { id: 10, lat: 47.6440, lng: -122.0580, address: "4500 Klahanie Blvd",       city: "Sammamish",  price: 1580000, beds: 5, baths: 4,   sqft: 3600, year: 2020, type: "Single Family", status: "Pending", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", daysOnMarket: 18 },
  { id: 18, lat: 47.6020, lng: -122.0420, address: "2890 Sahalee Dr E",        city: "Sammamish",  price: 2250000, beds: 6, baths: 4.5, sqft: 5100, year: 2023, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", daysOnMarket: 3  },
  { id: 19, lat: 47.6280, lng: -122.0310, address: "824 244th Ave NE",         city: "Sammamish",  price: 1045000, beds: 4, baths: 2.5, sqft: 2400, year: 2016, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80", daysOnMarket: 22 },
  // Bellevue
  { id: 5,  lat: 47.6101, lng: -122.2015, address: "520 Bellevue Way NE",      city: "Bellevue",   price: 2100000, beds: 5, baths: 4,   sqft: 4200, year: 2023, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", daysOnMarket: 5  },
  { id: 20, lat: 47.6200, lng: -122.1870, address: "1640 Bellevue Ave",        city: "Bellevue",   price: 1780000, beds: 4, baths: 3.5, sqft: 3300, year: 2022, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80", daysOnMarket: 7  },
  { id: 21, lat: 47.5980, lng: -122.1760, address: "3012 108th Ave SE",        city: "Bellevue",   price: 1395000, beds: 3, baths: 2.5, sqft: 2500, year: 2019, type: "Condo",         status: "Active",  img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", daysOnMarket: 10 },
  { id: 22, lat: 47.6050, lng: -122.1950, address: "10116 NE 4th St",          city: "Bellevue",   price: 3850000, beds: 6, baths: 5,   sqft: 6200, year: 2024, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80", daysOnMarket: 2  },
  // Issaquah
  { id: 6,  lat: 47.5301, lng: -122.0326, address: "980 NW Maple St",          city: "Issaquah",   price: 875000,  beds: 3, baths: 2,   sqft: 1850, year: 2017, type: "Condo",         status: "Active",  img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80", daysOnMarket: 21 },
  { id: 23, lat: 47.5420, lng: -122.0540, address: "1825 NW Gilman Blvd",      city: "Issaquah",   price: 1060000, beds: 4, baths: 3,   sqft: 2750, year: 2018, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=600&q=80", daysOnMarket: 16 },
  { id: 24, lat: 47.5180, lng: -122.0280, address: "675 Front St N",           city: "Issaquah",   price: 790000,  beds: 3, baths: 2,   sqft: 1700, year: 2015, type: "Townhome",      status: "Pending", img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80", daysOnMarket: 25 },
  // Mill Creek
  { id: 25, lat: 47.8601, lng: -122.2040, address: "15624 Main St",            city: "Mill Creek", price: 1025000, beds: 4, baths: 3,   sqft: 2700, year: 2019, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&q=80", daysOnMarket: 8  },
  { id: 26, lat: 47.8540, lng: -122.1950, address: "3201 164th St SW",         city: "Mill Creek", price: 885000,  beds: 3, baths: 2.5, sqft: 2050, year: 2020, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=600&q=80", daysOnMarket: 13 },
  // Snohomish
  { id: 27, lat: 47.9129, lng: -122.0982, address: "830 Pine Ave",             city: "Snohomish",  price: 765000,  beds: 3, baths: 2,   sqft: 1920, year: 2016, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=600&q=80", daysOnMarket: 19 },
  { id: 28, lat: 47.9240, lng: -122.1050, address: "1442 Bickford Ave",        city: "Snohomish",  price: 680000,  beds: 3, baths: 2,   sqft: 1650, year: 2014, type: "Single Family", status: "Active",  img: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=600&q=80", daysOnMarket: 30 },
];
 
const CITIES = ["All Cities", "Kirkland", "Bothell", "Redmond", "Sammamish", "Bellevue", "Issaquah", "Mill Creek", "Snohomish"];
const TYPES = ["All Types", "Single Family", "Townhome", "Condo"];
const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low", "Most Bedrooms", "Largest"];
 
const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
 

const MAP_CENTER = { lat: 47.65, lng: -122.13 };

// ─── Cluster Marker ───
function ClusterMarker({ cluster, onSelect, isActive = false }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => setShow(true);
    const leave = () => setShow(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", transform: "translate(-50%, -50%)", display: "inline-block" }}>
      <div
        onClick={() => cluster.listings.length === 1 && onSelect(cluster.listings[0].id)}
        style={{
          width: isActive ? "44px" : "36px",
          height: isActive ? "44px" : "36px",
          borderRadius: "50%",
          background: isActive ? "#FDFBF7" : "#C1AC84",
          color: "#0F0F0C",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", fontWeight: 600,
          cursor: "pointer",
          border: isActive ? "2px solid #C1AC84" : "2px solid #0F0F0C",
          boxShadow: isActive ? "0 0 16px rgba(193,172,132,0.4)" : "0 2px 10px rgba(0,0,0,0.35)",
          userSelect: "none", transition: "all 0.2s ease",
        }}
      >
        {cluster.listings.length}
      </div>

      {show && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 2px)", left: "50%",
          transform: "translateX(-50%)", background: "rgba(15,15,12,0.96)",
          border: "1px solid rgba(193,172,132,0.25)", padding: "8px 12px",
          whiteSpace: "nowrap", backdropFilter: "blur(12px)", zIndex: 50,
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}>
          {cluster.listings.map((l) => (
            <div key={l.id} onClick={() => onSelect(l.id)} style={{
              fontFamily: "'Cormorant Garamond', serif", color: "#C1AC84",
              fontSize: "0.82rem", padding: "3px 0", cursor: "pointer",
              borderBottom: "1px solid rgba(193,172,132,0.08)",
            }}>
              {fmt(l.price)} · {l.beds} bd · {l.sqft.toLocaleString()} sqft
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Map Component ───
function MapView({ listings, onSelect, selectedId }) {
  const [viewport, setViewport] = useState({
    latitude: MAP_CENTER.lat,
    longitude: MAP_CENTER.lng,
    zoom: 11,
  });

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: "#13130F" }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "rgba(253,251,247,0.4)" }}>Map unavailable</span>
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.15em" }}>
        Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
      </span>
    </div>
  );

  const clusters = useMemo(() => {
    const map = {};
    listings.forEach((l) => {
      if (!map[l.city]) map[l.city] = { city: l.city, lat: l.lat, lng: l.lng, listings: [] };
      map[l.city].listings.push(l);
    });
    return Object.values(map);
  }, [listings]);

  const activeListing = selectedId ? listings.find((l) => l.id === selectedId) : null;

  return (
    <div className="relative w-full h-full">
      <Map
        {...viewport}
        onMove={(e) => setViewport(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
        style={{ width: "100%", height: "100%" }}
      >
        {clusters.map((cluster) => {
          const isActive = !!selectedId && cluster.listings.some((l) => l.id === selectedId);
          return (
            <Marker
              key={cluster.city}
              latitude={cluster.lat}
              longitude={cluster.lng}
            >
              <ClusterMarker cluster={cluster} onSelect={onSelect} isActive={isActive} />
            </Marker>
          );
        })}

        {activeListing && (
          <Marker
            key={`highlight-${activeListing.id}`}
            latitude={activeListing.lat}
            longitude={activeListing.lng}
            style={{ zIndex: 999 }}
          >
            <div style={{
              transform: "translate(-50%, -50%)",
              width: "52px", height: "52px", borderRadius: "50%",
              background: "rgba(193,172,132,0.15)",
              border: "2px solid rgba(193,172,132,0.8)",
              animation: "ping 1.2s ease-out infinite",
              pointerEvents: "none",
            }} />
          </Marker>
        )}
      </Map>

      {/* Results count overlay */}
      <div
        className="absolute bottom-4 left-4 px-4 py-2 pointer-events-none"
        style={{
          background: "rgba(15,15,12,0.85)",
          border: "1px solid rgba(193,172,132,0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(193,172,132,0.6)", letterSpacing: "0.15em" }}>
          {listings.length} {listings.length === 1 ? "PROPERTY" : "PROPERTIES"} FOUND
        </span>
      </div>
    </div>
  );
}

// ─── Listing Card ───
function ListingCard({ listing, isHovered, onHover, onSelect, isSelected }) {
  return (
    <div
      className="group cursor-pointer transition-all duration-300"
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(listing.id)}
      style={{
        background: isSelected ? "rgba(193,172,132,0.12)" : isHovered ? "rgba(255,255,255,0.02)" : "transparent",
        borderBottom: "1px solid rgba(193,172,132,0.06)",
        borderLeft: isSelected ? "3px solid #C1AC84" : "3px solid transparent",
        boxShadow: isSelected ? "inset 0 0 24px rgba(193,172,132,0.04)" : "none",
      }}
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative w-28 h-24 flex-shrink-0 overflow-hidden rounded-sm">
          <img
            src={listing.img}
            alt={listing.address}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ filter: "brightness(0.85)" }}
          />
          {listing.status === "Pending" && (
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5" style={{ background: "rgba(139,115,85,0.9)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.55rem", color: "#FDFBF7", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Pending
              </span>
            </div>
          )}
          {listing.daysOnMarket <= 3 && listing.status === "Active" && (
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5" style={{ background: "rgba(193,172,132,0.9)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.55rem", color: "#0F0F0C", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                New
              </span>
            </div>
          )}
        </div>
 
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#C1AC84" }}>
            {fmt(listing.price)}
          </div>
          <div className="mt-1 flex gap-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(253,251,247,0.45)" }}>
            <span>{listing.beds} bd</span>
            <span style={{ color: "rgba(193,172,132,0.2)" }}>|</span>
            <span>{listing.baths} ba</span>
            <span style={{ color: "rgba(193,172,132,0.2)" }}>|</span>
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>
          <div
            className="mt-1.5 truncate"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "rgba(253,251,247,0.35)" }}
          >
            {listing.address}, {listing.city}
          </div>
          <div className="mt-1 flex items-center gap-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.3)", letterSpacing: "0.1em" }}>
            <span>{listing.type}</span>
            <span>·</span>
            <span>Built {listing.year}</span>
            <span>·</span>
            <span>{listing.daysOnMarket}d on market</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
// ─── Filter Bar ───
function FilterBar({ filters, setFilters, sortBy, setSortBy, search, setSearch }) {
  const [expanded, setExpanded] = useState(null);
  const filterRef = useRef(null);
 
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setExpanded(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
 
  const Dropdown = ({ label, value, options, filterKey }) => (
    <div className="relative">
      <button
        onClick={() => setExpanded(expanded === filterKey ? null : filterKey)}
        className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200 hover:bg-white/[0.03]"
        style={{
          border: "1px solid rgba(193,172,132,0.12)",
          background: expanded === filterKey ? "rgba(193,172,132,0.06)" : "transparent",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.85rem", color: "#FDFBF7" }}>
          {value}
        </span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ marginLeft: "4px", transform: expanded === filterKey ? "rotate(180deg)" : "", transition: "transform 0.2s" }}>
          <path d="M1 1L5 5L9 1" stroke="rgba(193,172,132,0.4)" strokeWidth="1.2" />
        </svg>
      </button>
 
      {expanded === filterKey && (
        <div
          className="absolute top-full left-0 mt-1 min-w-[180px] z-50 py-1"
          style={{
            background: "rgba(20,20,16,0.97)",
            border: "1px solid rgba(193,172,132,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                setFilters({ ...filters, [filterKey]: opt });
                setExpanded(null);
              }}
              className="w-full text-left px-4 py-2 transition-colors duration-150 hover:bg-white/[0.04]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.85rem",
                color: filters[filterKey] === opt ? "#C1AC84" : "rgba(253,251,247,0.5)",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
 
  return (
    <div ref={filterRef} className="flex flex-wrap items-center gap-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(193,172,132,0.06)" }}>
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(193,172,132,0.3)" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Address, city, or ZIP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 outline-none transition-all duration-200 focus:border-gold/30"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(193,172,132,0.12)",
            color: "#FDFBF7",
          }}
        />
      </div>
 
      <Dropdown label="" value={filters.city} options={CITIES} filterKey="city" />
      <Dropdown label="" value={filters.type} options={TYPES} filterKey="type" />
 
      {/* Price range */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="w-24 px-3 py-2.5 outline-none text-center transition-all duration-200 focus:border-gold/30"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.8rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(193,172,132,0.12)",
            color: "#FDFBF7",
          }}
        />
        <span style={{ color: "rgba(193,172,132,0.2)", fontSize: "0.7rem" }}>to</span>
        <input
          type="text"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="w-24 px-3 py-2.5 outline-none text-center transition-all duration-200 focus:border-gold/30"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.8rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(193,172,132,0.12)",
            color: "#FDFBF7",
          }}
        />
      </div>
 
      {/* Beds filter */}
      <div className="flex items-center">
        {["Any", "2+", "3+", "4+", "5+"].map((b) => (
          <button
            key={b}
            onClick={() => setFilters({ ...filters, beds: b })}
            className="px-3 py-2.5 transition-all duration-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.8rem",
              background: filters.beds === b ? "rgba(193,172,132,0.12)" : "transparent",
              border: "1px solid rgba(193,172,132,0.12)",
              borderLeft: b !== "Any" ? "none" : undefined,
              color: filters.beds === b ? "#C1AC84" : "rgba(253,251,247,0.4)",
            }}
          >
            {b === "Any" ? "Beds" : b}
          </button>
        ))}
      </div>
 
      {/* Sort */}
      <div className="ml-auto">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2.5 outline-none cursor-pointer"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.8rem",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(193,172,132,0.12)",
            color: "rgba(253,251,247,0.5)",
            appearance: "none",
            paddingRight: "24px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='rgba(193,172,132,0.4)' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o} value={o} style={{ background: "#14140F", color: "#FDFBF7" }}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
 
// ─── Property Detail Panel ───
function DetailPanel({ listing, onClose }) {
  if (!listing) return null;
 
  return (
    <div
      className="absolute inset-0 z-50 overflow-y-auto"
      style={{
        background: "rgba(15,15,12,0.98)",
        backdropFilter: "blur(20px)",
        animation: "slideUp 0.4s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
 
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center transition-colors hover:bg-white/5"
        style={{ border: "1px solid rgba(193,172,132,0.15)" }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" stroke="#C1AC84" strokeWidth="1.5">
          <path d="M1 1l10 10M11 1L1 11" />
        </svg>
      </button>
 
      {/* Hero image */}
      <div className="relative w-full" style={{ height: "240px" }}>
        <img src={listing.img} alt={listing.address} className="w-full h-full object-cover" style={{ filter: "brightness(0.8)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,12,1) 0%, transparent 60%)" }} />
      </div>
 
      <div className="px-6 pb-8 -mt-12 relative z-10">
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(193,172,132,0.5)", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          {listing.city}, WA · {listing.type}
        </div>
        <div className="mt-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: "#C1AC84" }}>
          {fmt(listing.price)}
        </div>
        <div className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "rgba(253,251,247,0.5)" }}>
          {listing.address}, {listing.city}, WA
        </div>
 
        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-4 gap-4 py-5" style={{ borderTop: "1px solid rgba(193,172,132,0.08)", borderBottom: "1px solid rgba(193,172,132,0.08)" }}>
          {[
            { label: "Beds", value: listing.beds },
            { label: "Baths", value: listing.baths },
            { label: "Sqft", value: listing.sqft.toLocaleString() },
            { label: "Year", value: listing.year },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#FDFBF7" }}>{s.value}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* Details */}
        <div className="mt-6 space-y-3">
          {[
            { label: "Status", value: listing.status },
            { label: "Days on Market", value: listing.daysOnMarket },
            { label: "Property Type", value: listing.type },
            { label: "MLS #", value: `NWMLS-${2500000 + listing.id}` },
          ].map((d) => (
            <div key={d.label} className="flex justify-between items-baseline">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(193,172,132,0.35)", letterSpacing: "0.1em" }}>{d.label}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.65)" }}>{d.value}</span>
            </div>
          ))}
        </div>
 
        {/* CTA buttons */}
        <div className="mt-8 flex gap-3">
          <a
            href={`tel:${AGENT.phoneTel}`}
            className="flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif", background: "#C1AC84", color: "#0F0F0C", fontWeight: 600 }}
          >
            Schedule Tour
          </a>
          <a
            href="/#contact"
            className="flex-1 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5 text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif", border: "1px solid rgba(193,172,132,0.3)", color: "#C1AC84" }}
          >
            Request Info
          </a>
        </div>
 
        <div className="mt-6 text-center">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.3)", letterSpacing: "0.15em" }}>
            Listed by Meena Dhawan · Keller Williams Eastside
          </span>
        </div>
      </div>
    </div>
  );
}
 
 
// ─── Main App ───
export default function MapSearchPage() {
  const [filters, setFilters] = useState({ city: "All Cities", type: "All Types", beds: "Any", minPrice: "", maxPrice: "" });
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // map highlight + scroll
  const [detailId, setDetailId] = useState(null);     // list card detail panel
  const [viewMode, setViewMode] = useState("split"); // split | list | map
  const cardRefs = useRef({});

  useEffect(() => {
    if (selectedId && cardRefs.current[selectedId]) {
      cardRefs.current[selectedId].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  // Filter logic
  const filtered = SAMPLE_LISTINGS.filter((l) => {
    if (search) {
      const q = search.toLowerCase();
      if (!l.address.toLowerCase().includes(q) && !l.city.toLowerCase().includes(q)) return false;
    }
    if (filters.city !== "All Cities" && l.city !== filters.city) return false;
    if (filters.type !== "All Types" && l.type !== filters.type) return false;
    if (filters.beds !== "Any") {
      const min = parseInt(filters.beds);
      if (l.beds < min) return false;
    }
    if (filters.minPrice && l.price < parseInt(filters.minPrice.replace(/\D/g, ""))) return false;
    if (filters.maxPrice && l.price > parseInt(filters.maxPrice.replace(/\D/g, ""))) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High": return a.price - b.price;
      case "Price: High to Low": return b.price - a.price;
      case "Most Bedrooms": return b.beds - a.beds;
      case "Largest": return b.sqft - a.sqft;
      default: return a.daysOnMarket - b.daysOnMarket;
    }
  });
 
  const detailListing = SAMPLE_LISTINGS.find((l) => l.id === detailId);
 
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#0F0F0C" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Cormorant+Garamond:wght@300;400;500;600&display=swap" rel="stylesheet" />
 
      <SharedNavbar />

      {/* Demo data notice */}
      <div className="px-6 py-2 text-center" style={{ background: "rgba(193,172,132,0.06)", borderBottom: "1px solid rgba(193,172,132,0.08)" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(193,172,132,0.5)", letterSpacing: "0.15em" }}>
          Showing demo listings · Live NWMLS data coming soon
        </span>
      </div>

      <FilterBar filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} search={search} setSearch={setSearch} />
 
      {/* View mode toggle */}
      <div className="flex items-center gap-1 px-6 py-2" style={{ borderBottom: "1px solid rgba(193,172,132,0.06)" }}>
        {[
          { id: "split", label: "Split View", icon: "◫" },
          { id: "list", label: "List", icon: "☰" },
          { id: "map", label: "Map", icon: "◻" },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className="px-3 py-1.5 flex items-center gap-1.5 transition-all duration-200"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: viewMode === mode.id ? "#C1AC84" : "rgba(253,251,247,0.3)",
              background: viewMode === mode.id ? "rgba(193,172,132,0.08)" : "transparent",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
 
        <span className="ml-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(253,251,247,0.3)" }}>
          {filtered.length} results
        </span>
      </div>
 
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Listings panel */}
        {viewMode !== "map" && (
          <div
            className="overflow-y-auto relative"
            style={{
              width: viewMode === "split" ? "420px" : "100%",
              flexShrink: 0,
              borderRight: viewMode === "split" ? "1px solid rgba(193,172,132,0.06)" : "none",
            }}
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "rgba(253,251,247,0.3)" }}>
                  No properties found
                </div>
                <p className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "rgba(253,251,247,0.2)" }}>
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <>
                {viewMode === "list" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ background: "rgba(193,172,132,0.04)" }}>
                    {filtered.map((listing) => (
                      <div key={listing.id} ref={(el) => { cardRefs.current[listing.id] = el; }} style={{ background: "#0F0F0C" }}>
                        <ListingCard
                          listing={listing}
                          isHovered={hoveredId === listing.id}
                          isSelected={selectedId === listing.id}
                          onHover={setHoveredId}
                          onSelect={(id) => { setDetailId(id); setSelectedId(id); }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  filtered.map((listing) => (
                    <div key={listing.id} ref={(el) => { cardRefs.current[listing.id] = el; }}>
                      <ListingCard
                        listing={listing}
                        isHovered={hoveredId === listing.id}
                        isSelected={selectedId === listing.id}
                        onHover={setHoveredId}
                        onSelect={setDetailId}
                      />
                    </div>
                  ))
                )}
              </>
            )}
 
            {/* Detail overlay */}
            <DetailPanel listing={detailListing} onClose={() => { setDetailId(null); setSelectedId(null); }} />
          </div>
        )}
 
        {/* Map panel */}
        {viewMode !== "list" && (
          <div className="flex-1">
            <MapView
              listings={filtered}
              hoveredId={hoveredId}
              selectedId={selectedId}
              onHover={setHoveredId}
              onSelect={(id) => { setSelectedId(id); setViewMode("split"); }}
            />
          </div>
        )}
      </div>
 
      {/* Bottom bar */}
      <div className="px-6 py-2 flex items-center justify-between" style={{ borderTop: "1px solid rgba(193,172,132,0.06)", background: "rgba(10,10,8,0.9)" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.25)", letterSpacing: "0.1em" }}>
          Listing data courtesy of NWMLS. Information deemed reliable but not guaranteed.
        </span>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(193,172,132,0.25)", letterSpacing: "0.1em" }}>
          © 2026 Meena Dhawan · Keller Williams Eastside
        </span>
      </div>
    </div>
  );
}
 