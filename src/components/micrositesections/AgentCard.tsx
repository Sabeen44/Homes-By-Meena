// components/sections/AgentCard.tsx
import Image from 'next/image'

interface Agent {
  name: string
  role: string
  company?: string
  phone: string
  email: string
  photo?: string
  licenseNumber?: string
  websiteUrl?: string
}

interface AgentCardProps {
  agents: Agent[]
  brokerageLogo?: string
}

function AgentProfile({ agent }: { agent: Agent }) {
  const initials = agent.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center gap-5">

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

        {/* Name, role, company */}
        <div>
          <p className="text-base font-medium text-neutral-900">{agent.name}</p>
          {agent.role && (
            <p className="text-sm text-neutral-500 mt-0.5">{agent.role}</p>
          )}
          {agent.company && (
            <p className="text-sm text-neutral-400 mt-0.5">{agent.company}</p>
          )}
        </div>

      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-3">
        <div className="border-t border-neutral-100 pt-4">
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

        <div className="border-t border-neutral-100 pt-3">
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

        {agent.licenseNumber && (
          <div className="border-t border-neutral-100 pt-3">
            <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-1">
              License
            </p>
            <p className="text-sm text-neutral-500">{agent.licenseNumber}</p>
          </div>
        )}

        {agent.websiteUrl && (
          <div className="border-t border-neutral-100 pt-3">
            <a
              href={agent.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors border-b border-neutral-200 pb-0.5"
            >
              Website →
            </a>
          </div>
        )}
      </div>

    </div>
  )
}

export default function AgentCard({ agents, brokerageLogo }: AgentCardProps) {
  if (!agents?.length) return null

  return (
    <section className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label + brokerage logo */}
        <div className="flex items-center justify-between mb-10">
          <p className="text-[11px] tracking-widest uppercase text-neutral-400">
            Presented by
          </p>
          {brokerageLogo && (
            <div className="relative h-8 w-32">
              <Image
                src={brokerageLogo}
                alt="Brokerage logo"
                fill
                className="object-contain object-right"
                sizes="128px"
              />
            </div>
          )}
        </div>

        {/* One or two agents */}
        <div className={`grid grid-cols-1 gap-10 ${
          agents.length > 1 ? 'md:grid-cols-2 md:gap-0 md:divide-x divide-neutral-200' : ''
        }`}>
          {agents.map((agent, i) => (
            <div
              key={agent.email}
              className={agents.length > 1 && i === 1 ? 'md:pl-10' : ''}
            >
              <AgentProfile agent={agent} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
