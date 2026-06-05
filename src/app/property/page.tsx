import { getProperty } from '@/sanity/lib/queries'
import PropertyNav from '@/components/micrositesections/PropertyNav'
import HeroGallery from '@/components/micrositesections/HeroGallery'
import PropertyHeader from '@/components/micrositesections/PropertyHeader'
import PhotoGallery from '@/components/micrositesections/PhotoGallery'
import PropertyDetails from '@/components/micrositesections/PropertyDetails'
import MediaSection from '@/components/micrositesections/MediaSection'
import MapLocation from '@/components/micrositesections/MapLocation'
import AgentCard from '@/components/micrositesections/AgentCard'
import Testimonials from '@/components/micrositesections/Testimonials'
import ContactForm from '@/components/micrositesections/ContactForm'

export default async function PropertyPage() {
  const property = await getProperty()

  return (
    <>
      <PropertyNav address={property.address} />
      <main>

        {/* 1. Full screen hero image */}
        <HeroGallery
          heroImage={property.heroImage}
          images={property.images}
          address={property.address}
          city={property.city}
          state={property.state}
          price={property.price}
          beds={property.beds}
          baths={property.baths}
          sqft={property.sqft}
          lotSize={property.lotSize}
        />

        {/* 2. Address, price, stats */}
        <PropertyHeader
          address={property.address}
          suburb={property.suburb}
          city={property.city}
          state={property.state}
          zip={property.zip}
          price={property.price}
          status={property.status}
          beds={property.beds}
          baths={property.baths}
          sqft={property.sqft}
          lotSize={property.lotSize}
        />

        {/* 3. Photo grid + lightbox */}
        <PhotoGallery
          images={property.images}
          address={property.address}
        />

        {/* 4. Description + features */}
        <PropertyDetails
          description={property.description}
          features={property.features}
          documents={property.documents}
        />

        {/* 5. Video / 3D Tour / Floor Plans */}
        <MediaSection
          videoUrl={property.videoUrl}
          tourUrl={property.tourUrl}
          floorPlans={property.floorPlans}
        />

        {/* 6. Map + nearby */}
        <MapLocation
          address={property.address}
          suburb={property.suburb}
          city={property.city}
          proximities={property.proximities}
        />

        {/* 7. Agent(s) + brokerage */}
        <AgentCard
          agents={property.agents}
          brokerageLogo={property.brokerageLogo}
        />

        {/* 8. Testimonials */}
        <Testimonials
          testimonials={property.testimonials}
        />

        {/* 9. Contact form */}
        <ContactForm />

      </main>
    </>
  )
}
