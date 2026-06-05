// components/sections/FloorPlans.tsx
import Image from 'next/image'

interface FloorPlan {
  url: string
  label: string
  sqft: number
}

interface FloorPlansProps {
  plans: FloorPlan[]
}

export default function FloorPlans({ plans }: FloorPlansProps) {
  if (!plans?.length) return null

  return (
    <section id="floorplans" className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Floor plans
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(({ url, label, sqft }) => (
            <div
              key={label}
              className="group border border-neutral-200 rounded-sm overflow-hidden"
            >
              {/* Plan image */}
              <div className="relative aspect-4/3 bg-neutral-50">
                <Image
                  src={url}
                  alt={`${label} floor plan`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Label strip */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200">
                <p className="text-sm font-medium text-neutral-800">{label}</p>
                <p className="text-xs text-neutral-400">
                  {sqft?.toLocaleString() ?? '—'} sq ft
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
