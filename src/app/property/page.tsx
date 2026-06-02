import HeroGallery from '@/components/micrositesections/HeroGallery'
import StatBar from '@/components/micrositesections/StatBar'
import PropertyDetails from '@/components/micrositesections/PropertyDetails'
import FloorPlans from '@/components/micrositesections/FloorPlans'
import VirtualTour from '@/components/micrositesections/VirtualTour'
import MapLocation from '@/components/micrositesections/MapLocation'
import AgentCard from '@/components/micrositesections/AgentCard'
import Testimonials from '@/components/micrositesections/Testimonials'
import ContactForm from '@/components/micrositesections/ContactForm'
import { getProperty } from '@/sanity/lib/queries'

export default async function PropertyPage() {
  const property = await getProperty()

  if (!property) {
    return <main className="p-12 text-center">No property listing found. Add one in Sanity Studio.</main>
  }

  return (
    <main>
     <HeroGallery
  images={property.images}
  address={property.address}
  suburb={property.suburb}
  city={property.city}
  price={property.price}
  status={property.status}
/>
      <StatBar beds={property.beds} baths={property.baths} sqft={property.sqft} yearBuilt={property.yearBuilt} />
      <PropertyDetails description={property.description} features={property.features} />
      <FloorPlans plans={property.floorPlans} />
      <VirtualTour tourUrl={property.tourUrl} />
      <MapLocation
        address={property.address}
        suburb={property.suburb}
        city={property.city}
        proximities={property.proximities}
      />
      <AgentCard agent={property.agent} />
      <Testimonials testimonials={property.testimonials} />
      <ContactForm />
    </main>
  )
}