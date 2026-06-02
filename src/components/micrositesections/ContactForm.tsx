// components/sections/ContactForm.tsx
'use client'

import { useState } from 'react'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // TODO: wire up Supabase + Resend here later
    setSubmitted(true)
  }

  return (
    <section id="contact" className="px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Get in touch
        </p>

        {submitted ? (
          // Success state
          <div className="border border-neutral-200 rounded-sm px-8 py-16 text-center max-w-md mx-auto">
            <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-4 h-4 text-neutral-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-base font-medium text-neutral-800 mb-2">
              Enquiry received
            </p>
            <p className="text-sm text-neutral-500">
              We'll be in touch within 2 hours.
            </p>
            <button
              onClick={() => { setForm(initialState); setSubmitted(false) }}
              className="mt-6 text-xs tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors border-b border-neutral-200 pb-0.5"
            >
              Send another
            </button>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Left — form */}
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-widest uppercase text-neutral-400">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="border border-neutral-200 rounded-sm px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] tracking-widest uppercase text-neutral-400">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (415) 000 0000"
                    className="border border-neutral-200 rounded-sm px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-widest uppercase text-neutral-400">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="border border-neutral-200 rounded-sm px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-widest uppercase text-neutral-400">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="I'd like to arrange a viewing…"
                  rows={4}
                  className="border border-neutral-200 rounded-sm px-4 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 transition-colors bg-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-neutral-400">
                  We typically respond within 2 hours.
                </p>
                <button
                  onClick={handleSubmit}
                  className="text-xs tracking-widest uppercase text-neutral-700 border border-neutral-300 hover:border-neutral-600 hover:text-neutral-900 px-6 py-2.5 transition-colors rounded-sm"
                >
                  Send enquiry
                </button>
              </div>
            </div>

            {/* Right — reassurance block */}
            <div className="flex flex-col gap-8 md:border-l border-neutral-200 md:pl-16">
              {[
                {
                  label: 'Private & confidential',
                  body: 'Your details are never shared with third parties.',
                },
                {
                  label: 'No obligation',
                  body: 'Reach out with any questions — no commitment required.',
                },
                {
                  label: 'Fast response',
                  body: 'Our agents respond to all enquiries within 2 hours.',
                },
              ].map(({ label, body }) => (
                <div key={label}>
                  <p className="text-sm font-medium text-neutral-800 mb-1">{label}</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  )
}
