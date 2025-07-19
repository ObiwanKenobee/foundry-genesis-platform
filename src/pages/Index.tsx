// Update this page (the content is just a fallback if you fail to update the page)

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CovenantSection from "@/components/CovenantSection";
import PlatformPreview from "@/components/PlatformPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CovenantSection />
      <PlatformPreview />
      <Footer />
    </div>
  );
};

export default Index;
