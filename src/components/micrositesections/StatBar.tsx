// components/sections/StatBar.tsx
import { BedDouble, Bath, Maximize2, CalendarDays } from 'lucide-react'

interface StatBarProps {
  beds: number
  baths: number
  sqft: number
  yearBuilt: number
}

const stats = (beds: number, baths: number, sqft: number, yearBuilt: number) => [
  { icon: BedDouble, label: 'Beds', value: beds },
  { icon: Bath, label: 'Baths', value: baths },
  { icon: Maximize2, label: 'Sq Ft', value: sqft.toLocaleString() },
  { icon: CalendarDays, label: 'Year Built', value: yearBuilt },
]

export default function StatBar({ beds, baths, sqft, yearBuilt }: StatBarProps) {
  return (
    <section id="details" className="border-b border-neutral-200">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats(beds, baths, sqft, yearBuilt).map(({ icon: Icon, label, value }, i) => (
          <div
            key={label}
            className={`flex items-center gap-4 px-8 py-6 ${
              i < 3 ? 'border-b md:border-b-0 md:border-r border-neutral-200' : ''
            }`}
          >
            <Icon className="w-5 h-5 text-neutral-400 shrink-0" />
            <div>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-0.5">
                {label}
              </p>
              <p className="text-xl font-medium text-neutral-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}