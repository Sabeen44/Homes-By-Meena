// components/sections/PhotoGallery.tsx
'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface PhotoGalleryProps {
  images: string[]
  address: string
}

export default function PhotoGallery({ images, address }: PhotoGalleryProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  if (!images?.length) return null

  const slides = images.map((src) => ({ src }))

  // Show max 5 images in the grid, rest in lightbox
  const gridImages = images.slice(0, 5)
  const remaining = images.length - 5

  return (
    <section id="photos" className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-[11px] tracking-widest uppercase text-neutral-400">
            Photo gallery
          </p>
          <button
            onClick={() => openAt(0)}
            className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-900 transition-colors border-b border-neutral-200 pb-0.5"
          >
            View all {images.length} photos
          </button>
        </div>

        {/* Grid — 2 layouts depending on image count */}
        {images.length === 1 ? (

          // Single image — full width
          <div
            className="relative w-full aspect-[16/9] cursor-pointer overflow-hidden rounded-sm group"
            onClick={() => openAt(0)}
          >
            <Image
              src={gridImages[0]}
              alt={`${address} photo 1`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="100vw"
            />
          </div>

        ) : (

          // Multi-image — Kit-style grid
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px]">

            {/* Main large image — spans 2 cols, 2 rows */}
            <div
              className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden rounded-sm group"
              onClick={() => openAt(0)}
            >
              <Image
                src={gridImages[0]}
                alt={`${address} photo 1`}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="50vw"
              />
            </div>

            {/* Remaining 4 thumbnails */}
            {gridImages.slice(1).map((src, i) => (
              <div
                key={src}
                className="relative cursor-pointer overflow-hidden rounded-sm group"
                onClick={() => openAt(i + 1)}
              >
                <Image
                  src={src}
                  alt={`${address} photo ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="25vw"
                />

                {/* "View more" overlay on last thumbnail */}
                {i === 3 && remaining > 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-2xl font-medium">+{remaining}</p>
                      <p className="text-white/70 text-xs tracking-widest uppercase mt-1">
                        more photos
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>

        )}

      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        styles={{
          container: { backgroundColor: 'rgba(0,0,0,0.95)' },
        }}
        carousel={{ finite: false }}
      />

    </section>
  )
}
