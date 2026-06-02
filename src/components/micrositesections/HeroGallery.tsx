// components/sections/HeroGallery.tsx
import Image from 'next/image'

interface HeroGalleryProps {
  images: string[]
  address: string
  suburb: string
  city: string
  price: number
  status: string
}

export default function HeroGallery({
  images,
  address,
  suburb,
  city,
  price,
  status,
}: HeroGalleryProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px]">

      {/* Background image */}
      {images?.[0] && (
        <Image
          src={images[0]}
          alt={address}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

      {/* Nav bar */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-10">
        <span className="text-white text-sm font-medium tracking-widest uppercase">
          Haven
        </span>
        <div className="hidden md:flex items-center gap-8">
          {['Gallery', 'Details', 'Location', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm text-white border border-white/50 hover:border-white px-5 py-2 transition-colors"
        >
          Enquire
        </a>
      </nav>

      {/* Bottom overlay content */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 z-10 flex items-end justify-between">
        <div>
          <p className="text-white/60 text-xs tracking-widest uppercase mb-2">
            {status} · Residential
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-1">
            {address}
          </h1>
          <p className="text-white/75 text-base">
            {suburb}, {city}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white text-3xl font-medium">{formattedPrice}</p>
          <p className="text-white/60 text-xs tracking-widest uppercase mt-1">USD</p>
        </div>
      </div>

      {/* Image counter */}
      {images?.length > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <span className="text-white/50 text-xs tracking-widest">
            1 / {images.length}
          </span>
        </div>
      )}

    </section>
  )
}