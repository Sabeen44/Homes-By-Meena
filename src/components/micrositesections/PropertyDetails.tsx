'use client'

import { useState, useRef } from 'react'

interface PropertyDetailsProps {
  description: string
  features: string[]
  documents?: { label: string; url: string }[]
}

const COLLAPSED_HEIGHT = 180

function DownloadIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 3v12" />
    </svg>
  )
}

export default function PropertyDetails({
  description,
  features,
  documents,
}: PropertyDetailsProps) {
  const [expanded, setExpanded] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  const isTruncatable = descRef.current
    ? descRef.current.scrollHeight > COLLAPSED_HEIGHT
    : true

  return (
    <>
      {/* About section */}
      <section id="overview" className="border-b border-neutral-100 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-20">

            {/* Left — heading + actions */}
            <div className="md:col-span-2 flex flex-col gap-8">

              {/* Heading with arrow decoration */}
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
                <span className="flex items-center gap-4">
                  About
                  <span className="flex items-center flex-1 gap-1.5 text-neutral-300">
                    <span className="flex-1 h-px bg-neutral-300" />
                    <span>→</span>
                  </span>
                </span>
                <span>the Property</span>
              </h2>

              {/* Document links */}
              <div className="flex flex-wrap gap-6">
                {documents?.length
                  ? documents.map((doc) => (
                      <a
                        key={doc.label}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <DownloadIcon />
                        {doc.label}
                      </a>
                    ))
                  : ['Brochure', 'Documents'].map((label) => (
                      <a
                        key={label}
                        href="#"
                        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <DownloadIcon />
                        {label}
                      </a>
                    ))
                }
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="px-6 py-2.5 text-sm border border-neutral-300 text-neutral-700 hover:border-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Get in Touch
                </a>
                <a
                  href="#contact"
                  className="px-6 py-2.5 text-sm bg-neutral-900 text-white hover:bg-neutral-700 transition-colors"
                >
                  Schedule a Tour
                </a>
              </div>

            </div>

            {/* Right — description */}
            <div className="md:col-span-3">
              <div
                className="relative overflow-hidden transition-all duration-500"
                style={{ maxHeight: expanded ? `${descRef.current?.scrollHeight}px` : `${COLLAPSED_HEIGHT}px` }}
              >
                <p ref={descRef} className="text-neutral-600 text-base leading-relaxed">
                  {description}
                </p>
                {!expanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white to-transparent" />
                )}
              </div>
              {isTruncatable && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-5 text-sm text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5"
                >
                  {expanded ? 'Read Less' : 'Read More'}
                  <span className="text-neutral-400">{expanded ? '‹' : '›'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="border-b border-neutral-100 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 items-start">

            {/* Left — feature pills */}
            <div className="md:col-span-2 flex flex-wrap gap-3">
              {(features ?? []).map((feature) => (
                <span
                  key={feature}
                  className="px-5 py-3 text-sm text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-lg"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Right — decorative heading */}
            <div className="flex justify-end">
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-neutral-900 leading-tight text-right">
                Features
                <br />
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white font-cormorant text-3xl italic leading-none">
                    &amp;
                  </span>
                  Amenities
                </span>
              </h2>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
