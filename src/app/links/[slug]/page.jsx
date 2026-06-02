// app/links/[slug]/page.jsx
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'

const QUERY = `
  *[_type == "micrositeLinkList" && slug.current == $slug][0] {
    heading,
    subheading,
    "logo": logo { alt, "url": asset->url },
    "links": links[isActive == true] {
      title, url, description,
      "icon": icon { alt, "url": asset->url }
    }
  }
`

export default async function MicrositePage({ params }) {
  const data = await client.fetch(QUERY, { slug: params.slug })

  if (!data) return <p>Page not found.</p>

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '2rem 1rem' }}>
      {data.logo?.url && (
        <Image src={data.logo.url} alt={data.logo.alt || ''} width={120} height={120} />
      )}
      {data.heading && <h1>{data.heading}</h1>}
      {data.subheading && <p>{data.subheading}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.links.map((link) => (
          <li key={link.url} style={{ marginBottom: '1rem' }}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.icon?.url && (
                <Image src={link.icon.url} alt={link.icon.alt || ''} width={40} height={40} />
              )}
              <strong>{link.title}</strong>
              {link.description && <p>{link.description}</p>}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}