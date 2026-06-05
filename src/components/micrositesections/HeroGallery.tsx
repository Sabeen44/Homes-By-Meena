// components/sections/HeroGallery.tsx
import Image from 'next/image'

interface HeroGalleryProps {
  heroImage?: string
  images?: string[]
  address: string
  city?: string
  state?: string
  price?: number
  beds?: number
  baths?: number
  sqft?: number
  lotSize?: number
}

function StatIcon({ type }: { type: string }) {
  const cls = 'w-6 h-6 text-neutral-400'
  if (type === 'bed') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v13M3 13h18M21 7v13M5 13V9a2 2 0 012-2h10a2 2 0 012 2v4" />
    </svg>
  )
  if (type === 'bath') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12V8a4 4 0 014-4h1m13 8v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    </svg>
  )
  if (type === 'floor') return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  )
  return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
}

export default function HeroGallery({
  heroImage,
  images,
  address,
  city,
  state,
  price,
  beds,
  baths,
  sqft,
  lotSize,
}: HeroGalleryProps) {
  const src = heroImage ?? images?.[0]

  const formattedPrice = price
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price)
    : null

  const stats = [
    beds != null    && { label: 'Bedrooms',  value: String(beds),                       type: 'bed' },
    baths != null   && { label: 'Bathrooms', value: String(baths),                      type: 'bath' },
    sqft != null    && { label: 'Home Size', value: `${sqft.toLocaleString()} sqft`,    type: 'floor' },
    lotSize != null && { label: 'Lot Size',  value: `${lotSize.toLocaleString()} sf`,   type: 'lot' },
  ].filter(Boolean) as { label: string; value: string; type: string }[]

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] max-h-[900px]">
      {src && (
        <Image
          src={src}
          alt={address}
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Left-side gradient for text legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/20 to-transparent" />

      {/* Diagonal cut — matches reference site */}
      <div
        className="absolute bottom-0 left-[-5%] w-[110%] h-28 bg-white z-1"
        style={{ transform: 'skewY(-1.5deg)', transformOrigin: 'bottom left' }}
      />

      {/* SCROLL indicator */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
        <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase flex items-center gap-3">
          <span className="inline-block w-6 h-px bg-white/40" />
          Scroll
        </p>
      </div>

      {/* Address + price — bottom left */}
      <div className="absolute bottom-36 left-10 md:left-16 max-w-xl z-10">
        <h1 className="font-cormorant text-white text-6xl md:text-8xl font-light leading-[0.9] tracking-tight mb-4">
          {address}
        </h1>
        {(formattedPrice || city) && (
          <p className="text-white/75 text-base tracking-wide">
            {[formattedPrice, city && state ? `${city}, ${state}` : city]
              .filter(Boolean)
              .join(' — ')}
          </p>
        )}
      </div>

      {/* Stats card — bottom right */}
      {stats.length > 0 && (
        <div className="absolute bottom-0 right-0 bg-white shadow-2xl z-10">
          <div className="flex divide-x divide-neutral-100">
            {stats.map(({ label, value, type }) => (
              <div
                key={label}
                className="flex flex-col items-center px-6 md:px-8 py-5 gap-2 min-w-22.5 md:min-w-27.5"
              >
                <StatIcon type={type} />
                <p className="text-base md:text-lg font-medium text-neutral-900 leading-none">
                  {value}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-neutral-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
