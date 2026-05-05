import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedListings from "@/components/FeaturedListings";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
// import Communities from "@/components/Communities";
import SellerCTA from "@/components/SellerCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reels from "@/components/Reels"
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedListings />
      <About />
      <Reels/>
      <NewsletterSignup/>
      <Testimonials />
      {/* <Communities /> */}
      <SellerCTA />
      <Contact />
      <Footer />
    </main>
  );
}