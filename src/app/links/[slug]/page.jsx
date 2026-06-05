// app/links/[slug]/page.jsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'

// ── GROQ query ────────────────────────────────────────────────────────────────
const QUERY = `
  *[_type == "micrositeLinkList" && slug.current == $slug][0] {
    heading,
    subheading,
    "logo": logo { alt, asset },
    "links": links[isActive == true] {
      title,
      url,
      description,
      "icon": icon { alt, asset }
    }
  }
`

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await client.fetch(
    `*[_type == "micrositeLinkList" && defined(slug.current)]{ "slug": slug.current }`
  )
  return slugs.map(({ slug }) => ({ slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params
  const data = await client.fetch(QUERY, { slug })
  if (!data) return {}
  return {
    title: `${data.heading ?? 'Links'} | Homes by Meena`,
    description: data.subheading ?? 'Eastside Real Estate Expert',
  }
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function MicrositePage({ params }) {
  const { slug } = await params
  const data = await client.fetch(QUERY, { slug })
  if (!data) notFound()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream:   #F9F6F1;
          --warm:    #EDE8DF;
          --gold:    #B8935A;
          --gold-lt: #D4AE7A;
          --ink:     #1C1917;
          --muted:   #6B6560;
          --border:  #DDD8CF;
        }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: 'Jost', sans-serif;
          min-height: 100dvh;
        }

        .page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1.5rem 4rem;
        }

        .inner {
          width: 100%;
          max-width: 1400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ── Header ── */
        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 3rem;
          animation: fadeUp 0.6s ease both;
        }

        .logo-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--gold);
          margin-bottom: 1.25rem;
          background: var(--warm);
          flex-shrink: 0;
          box-shadow: 0 4px 20px rgba(184,147,90,0.3);
        }

        .logo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wordmark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.6rem;
        }

        .heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 5vw, 2.2rem);
          font-weight: 600;
          line-height: 1.2;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }

        .subheading {
          font-size: 0.85rem;
          font-weight: 300;
          color: var(--muted);
          line-height: 1.6;
          max-width: 30ch;
        }

        /* ── Divider ── */
        .divider {
          width: 40px;
          height: 1px;
          background: var(--gold);
          margin: 1.5rem auto;
          opacity: 0.5;
        }

        /* ── Card grid ── */
        .links {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          list-style: none;
        }

        @media (max-width: 700px) {
          .links {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 701px) and (max-width: 900px) {
          .links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Centre a lone card */
        .links li:only-child {
          grid-column: 1 / -1;
          max-width: 400px;
          margin: 0 auto;
          width: 100%;
        }

        /* ── Image card ── */
        .link-card {
          position: relative;
          display: block;
          aspect-ratio: 4 / 5;
          border-radius: 16px;
          overflow: hidden;
          background: #2a2724;
          text-decoration: none;
          color: inherit;
          animation: fadeUp 0.5s ease both;
        }

        .link-card:nth-child(1) { animation-delay: 0.05s; }
        .link-card:nth-child(2) { animation-delay: 0.13s; }
        .link-card:nth-child(3) { animation-delay: 0.21s; }
        .link-card:nth-child(4) { animation-delay: 0.29s; }
        .link-card:nth-child(5) { animation-delay: 0.37s; }
        .link-card:nth-child(6) { animation-delay: 0.45s; }

        .card-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .link-card:hover .card-image {
          transform: scale(1.06);
        }

        /* Always-visible bottom gradient + title */
        .card-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          transition: background 0.3s ease;
        }

        .link-card:hover .card-bottom {
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%);
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .card-desc {
          font-size: 0.8rem;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          line-height: 1.5;
          margin-bottom: 0.9rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--gold);
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.55rem 1.2rem;
          border-radius: 8px;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          width: fit-content;
        }

        .link-card:hover .card-btn {
          opacity: 1;
          transform: translateY(0);
        }

        /* No-image fallback */
        .card-no-image {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2a2724;
        }

        /* ── Footer ── */
        .footer {
          margin-top: 3rem;
          text-align: center;
          animation: fadeUp 0.6s 0.5s ease both;
        }

        .footer-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .footer-brand:hover { opacity: 1; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page">
        <div className="inner">

          {/* Header */}
          <header className="header">
            {data.logo?.asset && (
              <div className="logo-wrap">
                <NextImage
                  src={urlFor(data.logo).width(160).height(160).url()}
                  alt={data.logo.alt || 'Logo'}
                  width={160}
                  height={160}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
            <p className="wordmark">Homes by Meena</p>
            {data.heading && <h1 className="heading">{data.heading}</h1>}
            {data.subheading && <p className="subheading">{data.subheading}</p>}
          </header>

          <div className="divider" />

          {/* Image card grid */}
          <ul className="links" role="list">
            {data.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  {link.icon?.asset ? (
                    <NextImage
                      fill
                      className="card-image"
                      src={urlFor(link.icon).width(800).height(1000).auto('format').url()}
                      alt={link.icon.alt || link.title}
                      sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="card-no-image" />
                  )}

                  <div className="card-bottom">
                    <p className="card-title">{link.title}</p>
                    {link.description && (
                      <p className="card-desc">{link.description}</p>
                    )}
                    <span className="card-btn">View Now →</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <footer className="footer">
            <Link href="/" className="footer-brand">
              eastsidehomesbymeena.com
            </Link>
          </footer>

        </div>
      </div>
    </>
  )
}
