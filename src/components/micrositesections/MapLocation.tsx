// components/sections/MapLocation.tsx
interface Proximity {
  label: string
  distance: string
  icon: string
}

interface MapLocationProps {
  address: string
  suburb: string
  city: string
  proximities?: Proximity[]
}

const defaultProximities: Proximity[] = [
  { label: 'Shops', distance: '0.3 mi', icon: '🏪' },
  { label: 'Schools', distance: '0.5 mi', icon: '🎓' },
  { label: 'Park', distance: '0.2 mi', icon: '🌳' },
  { label: 'Transport', distance: '0.4 mi', icon: '🚇' },
]

export default function MapLocation({
  address,
  suburb,
  city,
  proximities = defaultProximities,
}: MapLocationProps) {
  const encodedAddress = encodeURIComponent(`${address}, ${suburb}, ${city}`)
  const embedUrl = `https://maps.google.com/maps?q=${encodedAddress}&output=embed&z=15`

  return (
    <section id="map" className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Location
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Map embed — takes up 2/3 */}
          <div className="md:col-span-2 border border-neutral-200 rounded-sm overflow-hidden aspect-16/10 relative bg-neutral-50">
            <iframe
              src={embedUrl}
              title={`Map of ${address}`}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col justify-between gap-6">

            {/* Address block */}
            <div>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-2">
                Address
              </p>
              <p className="text-base font-medium text-neutral-800">{address}</p>
              <p className="text-sm text-neutral-500">{suburb}, {city}</p>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200" />

            {/* Proximities */}
            <div>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-4">
                Nearby
              </p>
              <ul className="flex flex-col gap-3">
                {(proximities ?? defaultProximities).map(({ label, distance, icon }) => (
                  <li
                    key={label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2 text-neutral-600">
                      <span aria-hidden="true">{icon}</span>
                      {label}
                    </span>
                    <span className="text-neutral-400">{distance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Directions link */}
            <a
              href={`https://maps.google.com/maps?q=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 pb-1 w-fit"
            >
              Get directions →
            </a>

          </div>
        </div>
      </div>
    </section>
  )
}
