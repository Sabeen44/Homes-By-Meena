'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'photos', label: 'Photos' },
  { id: 'video', label: 'Video' },
  { id: 'vtour', label: '3D Tour' },
  { id: 'floorplans', label: 'Floor Plans' },
  { id: 'map', label: 'Map' },
  { id: 'contact', label: 'Contact' },
]

interface PropertyNavProps {
  address?: string
}

export default function PropertyNav({ address }: PropertyNavProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    const hero = document.getElementById('hero')
    if (hero) heroObserver.observe(hero)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    return () => {
      heroObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 64
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between h-16 gap-6">

          {/* Left — property address */}
          <p className="text-sm font-medium text-neutral-800 tracking-tight truncate shrink-0 max-w-50 md:max-w-xs">
            {address}
          </p>

          {/* Centre — section links (desktop) */}
          <ul className="hidden md:flex items-center gap-1 overflow-x-auto flex-1 justify-center">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-colors rounded-sm ${
                    activeId === id
                      ? 'text-neutral-900 bg-neutral-100'
                      : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-4 shrink-0">

            {/* Request Info CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 1.5v19.637l-5.61-6.953a.5.5 0 00-.778.629l6.431 7.97a.579.579 0 00.457.217.579.579 0 00.458-.219l6.43-7.969a.5.5 0 00-.778-.628L12.5 21.137V1.5a.5.5 0 00-1 0z" />
              </svg>
              <span className="hidden sm:inline">Request Info</span>
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-px bg-neutral-800 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-neutral-800 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-neutral-800 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && visible && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 shadow-lg">
          <ul className="max-w-6xl mx-auto px-8 py-4 flex flex-col gap-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`w-full text-left px-3 py-2.5 text-xs tracking-widest uppercase transition-colors rounded-sm ${
                    activeId === id
                      ? 'text-neutral-900 bg-neutral-100'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
