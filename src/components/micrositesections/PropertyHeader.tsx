// components/sections/PropertyHeader.tsx
interface PropertyHeaderProps {
  address: string
  suburb: string
  city: string
  state: string
  zip: string
  price: number
  status: string
  beds: number
  baths: number
  sqft: number
  lotSize?: number
}

export default function PropertyHeader({
  address,
  suburb,
  city,
  state,
  zip,
  price,
  status,
  beds,
  baths,
  sqft,
  lotSize,
}: PropertyHeaderProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <section className="border-b border-neutral-200 px-8 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

          {/* Left — address block */}
          <div>
            <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-3">
              {status}
            </p>
            <h1 className="text-3xl md:text-4xl font-medium text-neutral-900 tracking-tight mb-1">
              {address}
            </h1>
            <p className="text-base text-neutral-500">
              {suburb}, {city}, {state} {zip}
            </p>
          </div>

          {/* Right — price */}
          <div className="md:text-right shrink-0">
            <p className="text-3xl md:text-4xl font-medium text-neutral-900">
              {formattedPrice}
            </p>
            <p className="text-[11px] tracking-widest uppercase text-neutral-400 mt-1">
              Asking price
            </p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-neutral-100 my-8" />

        {/* Stats row */}
        <div className="flex flex-wrap gap-8">
          {[
            { label: 'Bedrooms', value: beds },
            { label: 'Bathrooms', value: baths },
            { label: 'Home Size', value: `${sqft.toLocaleString()} sqft` },
            ...(lotSize
              ? [{ label: 'Lot Size', value: `${lotSize.toLocaleString()} sqft` }]
              : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xl font-medium text-neutral-900">{value}</p>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
