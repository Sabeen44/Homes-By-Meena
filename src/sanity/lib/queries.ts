// sanity/lib/queries.ts
import { client } from './client'

export async function getProperty() {
  return client.fetch(`*[_type == "property"][0]{
    address,
    suburb,
    city,
    status,
    price,
    beds,
    baths,
    sqft,
    yearBuilt,
    description,
    features,
    "images": images[].asset->url,
    "floorPlans": floorPlans[]{
      label,
      sqft,
      "url": image.asset->url
    },
    tourUrl,
    location,
    agent->{name, role, phone, email, "photo": photo.asset->url},
    proximities[]{ label, distance, icon },
    testimonials[]{quote, author, year}
  }`)
}