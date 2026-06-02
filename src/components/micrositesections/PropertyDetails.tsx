// components/sections/PropertyDetails.tsx
interface PropertyDetailsProps {
  description: string
  features: string[]
}

export default function PropertyDetails({
  description,
  features = [],
}: PropertyDetailsProps) {
  return (
    <section className="border-b border-neutral-200 px-8 py-14 max-w-5xl mx-auto">

      {/* Section label */}
      <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-6">
        Property details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Description */}
        <div>
          <p className="text-neutral-600 text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        <div>
          <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-4">
            Features
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {(features ?? []).map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-neutral-700"
              >
                <span className="w-1 h-1 rounded-full bg-neutral-400 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
