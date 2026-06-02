// components/sections/AgentCard.tsx
import Image from 'next/image'

interface Agent {
  name: string
  role: string
  phone: string
  email: string
  photo: string
}

interface AgentCardProps {
  agent: Agent
}

export default function AgentCard({ agent }: AgentCardProps) {
  if (!agent) return null

  const initials = agent.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <section className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Your agent
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left — agent info */}
          <div className="flex items-center gap-6">

            {/* Photo or initials fallback */}
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
              {agent.photo ? (
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400 text-lg font-medium">
                  {initials}
                </div>
              )}
            </div>

            {/* Name & role */}
            <div>
              <p className="text-xl font-medium text-neutral-900">{agent.name}</p>
              <p className="text-sm text-neutral-500 mt-0.5">{agent.role}</p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 pb-0.5"
                >
                  Call
                </a>
                <span className="text-neutral-200">|</span>
                <a
                  href={`mailto:${agent.email}`}
                  className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 pb-0.5"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          {/* Right — contact details */}
          <div className="flex flex-col gap-4 md:border-l border-neutral-200 md:pl-12">
            <div>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-1">
                Phone
              </p>
              <a
                href={`tel:${agent.phone}`}
                className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {agent.phone}
              </a>
            </div>
            <div className="border-t border-neutral-100" />
            <div>
              <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-1">
                Email
              </p>
              <a
                href={`mailto:${agent.email}`}
                className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                {agent.email}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
