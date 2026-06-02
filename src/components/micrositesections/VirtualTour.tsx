// components/sections/VirtualTour.tsx
interface VirtualTourProps {
  tourUrl: string
}

function getEmbedUrl(url: string): { type: 'youtube' | 'matterport' | 'unknown'; embedUrl: string } {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0&modestbranding=1`,
    }
  }

  // Matterport
  if (url.includes('matterport.com')) {
    const modelMatch = url.match(/m=([a-zA-Z0-9]+)/)
    return {
      type: 'matterport',
      embedUrl: modelMatch
        ? `https://my.matterport.com/show/?m=${modelMatch[1]}&play=1`
        : url,
    }
  }

  // Fallback — use URL as-is (Vimeo, custom, etc.)
  return { type: 'unknown', embedUrl: url }
}

export default function VirtualTour({ tourUrl }: VirtualTourProps) {
  if (!tourUrl) return null

  const { embedUrl } = getEmbedUrl(tourUrl)

  return (
    <section className="border-b border-neutral-200 px-8 py-14">
      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <p className="text-[11px] tracking-widest uppercase text-neutral-400 mb-8">
          Virtual tour
        </p>

        {/* Embed */}
        <div className="relative w-full aspect-video bg-neutral-50 border border-neutral-200 rounded-sm overflow-hidden">
          <iframe
            src={embedUrl}
            title="Property virtual tour"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Caption */}
        <p className="text-xs text-neutral-400 mt-3 tracking-wide">
          Use fullscreen for the best experience
        </p>

      </div>
    </section>
  )
}
