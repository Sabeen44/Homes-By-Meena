// components/sections/Testimonials.tsx
interface Testimonial {
  quote: string
  author: string
  year: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null

  return (
    <section className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          What clients say
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, year }) => (
            <div
              key={author}
              className="flex flex-col justify-between gap-6 border border-neutral-200 rounded-sm p-6"
            >
              {/* Quote mark */}
              <div>
                <span className="text-3xl text-neutral-200 font-serif leading-none">
                  &ldquo;
                </span>
                <p className="text-sm text-neutral-600 leading-relaxed mt-1">
                  {quote}
                </p>
              </div>

              {/* Author */}
              <div className="border-t border-neutral-100 pt-4">
                <p className="text-sm font-medium text-neutral-800">{author}</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Purchased {year}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
