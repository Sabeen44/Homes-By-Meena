import { client } from './client'
import { urlFor } from './image'

export async function getProperty() {
  const raw = await client.fetch(`*[_type == "property"][0]{
    // Address
    address,
    suburb,
    city,
    state,
    zip,

    // Listing
    status,
    price,

    // Stats
    beds,
    baths,
    sqft,
    lotSize,
    yearBuilt,

    // Content
    description,
    features,

    // Media
    heroImage,
    images[],
    videoUrl,
    tourUrl,
    "floorPlans": floorPlans[]{
      label,
      sqft,
      "url": image.asset->url
    },

    // Documents
    "documents": documents[]{
      label,
      "url": file.asset->url
    },

    // Location
    location,
    proximities[]{ label, distance, icon },

    // Agents
    "agents": agents[]->{
      name,
      role,
      company,
      phone,
      email,
      licenseNumber,
      websiteUrl,
      "photo": photo.asset->url
    },
    "brokerageLogo": brokerageLogo.asset->url,

    // Testimonials
    testimonials[]{ quote, author, year }
  }`)

  if (!raw) return null

  return {
    ...raw,
    heroImage: raw.heroImage ? urlFor(raw.heroImage).url() : null,
    images: raw.images
      ? raw.images
          .filter((img: any) => img?.asset)
          .map((img: any) => urlFor(img).url())
      : [],
  }
}
