// components/sections/MediaSection.tsx
'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'

interface FloorPlan {
  label: string
  sqft: number
  url: string
}

interface MediaSectionProps {
  videoUrl?: string
  tourUrl?: string
  floorPlans?: FloorPlan[]
}

function getEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`
  }
  if (url.includes('matterport.com')) {
    const modelMatch = url.match(/m=([a-zA-Z0-9]+)/)
    return modelMatch
      ? `https://my.matterport.com/show/?m=${modelMatch[1]}&play=1`
      : url
  }
  return url
}

// Determine which tabs to show
function useTabs(videoUrl?: string, tourUrl?: string, floorPlans?: FloorPlan[]) {
  const tabs = []
  if (videoUrl) tabs.push({ id: 'video', label: 'Video' })
  if (tourUrl) tabs.push({ id: 'vtour', label: '3D Tour' })
  if (floorPlans?.length) tabs.push({ id: 'floorplans', label: 'Floor Plans' })
  return tabs
}

export default function MediaSection({
  videoUrl,
  tourUrl,
  floorPlans,
}: MediaSectionProps) {
  const tabs = useTabs(videoUrl, tourUrl, floorPlans)
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? '')

  if (!tabs.length) return null

  return (
    <section id="video" className="border-b border-neutral-200 px-8 py-14">
      {/* Anchor targets for vtour + floorplans so scrollspy can find them */}
      <span id="vtour" className="absolute" />
      <span id="floorplans" className="absolute" />

      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Media
        </p>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>

          {/* Tab list */}
          <Tabs.List className="flex items-center gap-1 border-b border-neutral-200 mb-8">
            {tabs.map(({ id, label }) => (
              <Tabs.Trigger
                key={id}
                value={id}
                className={`px-4 py-2.5 text-xs tracking-widest uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === id
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* Video tab */}
          {videoUrl && (
            <Tabs.Content value="video">
              <div className="relative w-full aspect-video bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  title="Property video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-neutral-400 mt-3 tracking-wide">
                Use fullscreen for the best experience
              </p>
            </Tabs.Content>
          )}

          {/* 3D Tour tab */}
          {tourUrl && (
            <Tabs.Content value="vtour">
              <div className="relative w-full aspect-video bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
                <iframe
                  src={getEmbedUrl(tourUrl)}
                  title="3D virtual tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-xs text-neutral-400 mt-3 tracking-wide">
                Use fullscreen for the best experience
              </p>
            </Tabs.Content>
          )}

          {/* Floor Plans tab */}
          {floorPlans?.length && (
            <Tabs.Content value="floorplans">

              {/* Sub-tabs for each floor */}
              <Tabs.Root defaultValue={floorPlans[0].label}>
                <Tabs.List className="flex items-center gap-1 mb-6">
                  {floorPlans.map(({ label }) => (
                    <Tabs.Trigger
                      key={label}
                      value={label}
                      className="px-4 py-1.5 text-xs tracking-widest uppercase rounded-sm transition-colors
                        data-[state=active]:bg-neutral-900 data-[state=active]:text-white
                        data-[state=inactive]:text-neutral-400 data-[state=inactive]:hover:text-neutral-700
                        border border-neutral-200 data-[state=active]:border-neutral-900"
                    >
                      {label}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>

                {floorPlans.map(({ label, sqft, url }) => (
                  <Tabs.Content key={label} value={label}>
                    <div className="border border-neutral-200 rounded-sm overflow-hidden bg-neutral-50">
                      {/* Plan image */}
                      <div className="relative w-full aspect-4/3">
                        <img
                          src={url}
                          alt={`${label} floor plan`}
                          className="w-full h-full object-contain p-8"
                        />
                      </div>
                      {/* Footer strip */}
                      <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-200">
                        <p className="text-sm font-medium text-neutral-800">{label} Floor</p>
                        <p className="text-xs text-neutral-400">
                          {sqft?.toLocaleString() ?? '—'} sq ft
                        </p>
                      </div>
                    </div>
                  </Tabs.Content>
                ))}
              </Tabs.Root>

            </Tabs.Content>
          )}

        </Tabs.Root>
      </div>
    </section>
  )
}
