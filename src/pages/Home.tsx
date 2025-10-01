// import React from "react";
import Navbar from "../../reusable-components/Layout/Navbar";
import HeroSection from "../../reusable-components/LandingPage/HeroSection";
import FunctionnalitiesSection from "../../reusable-components/LandingPage/FunctionnalitiesSection";
import PrototypeSection from "../../reusable-components/LandingPage/PrototypeSection";
import Team from "../../reusable-components/LandingPage/Team";
import About from "../../reusable-components/LandingPage/About";
import Contact from "../../reusable-components/LandingPage/Contact";
import MobileAppSection from "../../reusable-components/LandingPage/MobileAppSection";
import Footer from "../../reusable-components/Layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-green-50 to-white">
      {/* Enhanced Navbar */}
      <Navbar />

      {/* Enhanced Main Container */}
      <main className="pt-20 flex flex-col items-center justify-center w-full">
        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <HeroSection />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <FunctionnalitiesSection />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <MobileAppSection />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <PrototypeSection />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <Team />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <About />
        </section>

        <section className="w-full max-w-8xl px-4 sm:px-6 lg:px-8">
          <Contact />
        </section>

        <Footer />
      </main>
    </div>
  );
}
