// app/links/[slug]/page.jsx

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'


import Link from 'next/link'
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

// ── Static params (optional but recommended for performance) ──────────────────
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
          padding: 3rem 1.25rem 4rem;
          position: relative;
        }

        /* Subtle warm gradient bg */
        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(184,147,90,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(184,147,90,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .inner {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
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
          margin-bottom: 2.5rem;
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
          box-shadow: 0 4px 20px rgba(184,147,90,0.2);
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
          font-size: clamp(1.6rem, 5vw, 2rem);
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

        /* ── Link cards ── */
        .links {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .link-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          animation: fadeUp 0.5s ease both;
        }

        .link-card:hover {
          border-color: var(--gold-lt);
          box-shadow: 0 6px 24px rgba(184,147,90,0.15);
          transform: translateY(-2px);
        }

        .link-card:active {
          transform: translateY(0);
        }

        /* stagger each card */
        .link-card:nth-child(1) { animation-delay: 0.1s; }
        .link-card:nth-child(2) { animation-delay: 0.18s; }
        .link-card:nth-child(3) { animation-delay: 0.26s; }
        .link-card:nth-child(4) { animation-delay: 0.34s; }
        .link-card:nth-child(5) { animation-delay: 0.42s; }
        .link-card:nth-child(6) { animation-delay: 0.50s; }

        .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
          background: var(--warm);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }

        .icon-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .icon-placeholder {
          width: 20px;
          height: 20px;
          opacity: 0.3;
        }

        .link-text {
          flex: 1;
          min-width: 0;
        }

        .link-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .link-desc {
          font-size: 0.75rem;
          font-weight: 300;
          color: var(--muted);
          margin-top: 0.15rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .arrow {
          color: var(--gold);
          flex-shrink: 0;
          opacity: 0.7;
          font-size: 1rem;
          transition: opacity 0.2s, transform 0.2s;
        }

        .link-card:hover .arrow {
          opacity: 1;
          transform: translateX(3px);
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
          opacity: 0.7;
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
                <img
                  src={urlFor(data.logo).width(160).height(160).url()}
                  alt={data.logo.alt || 'Logo'}
                />
              </div>
            )}
            <p className="wordmark">Homes by Meena</p>
            {data.heading && <h1 className="heading">{data.heading}</h1>}
            {data.subheading && <p className="subheading">{data.subheading}</p>}
          </header>

          <div className="divider" />

          {/* Links */}
          <ul className="links" role="list" style={{ listStyle: 'none' }}>
            {data.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                >
                  <div className="icon-wrap">
                    {link.icon?.asset ? (
                      <img
                        src={urlFor(link.icon).width(88).height(88).url()}
                        alt={link.icon.alt || link.title}
                      />
                    ) : (
                      <svg className="icon-placeholder" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    )}
                  </div>
                  <div className="link-text">
                    <p className="link-title">{link.title}</p>
                    {link.description && (
                      <p className="link-desc">{link.description}</p>
                    )}
                  </div>
                  <span className="arrow" aria-hidden>→</span>
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