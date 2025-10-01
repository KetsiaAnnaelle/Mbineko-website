//import React from 'react';
import Header from '../../reusable-components/Layout/Header';
import HeroSection from '../../reusable-components/virtual-visite/HeroSection';
import ForestSelection from '../../reusable-components/virtual-visite/ForestSelection';
// import FeatureCards from '../../reusable-components/virtual-visite/FeatureCards';
import Footer from '../../reusable-components/Layout/Footer';

function VirtualVisite() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ForestSelection />
        {/* <FeatureCards /> */}
      </main>
      <Footer />
    </div>
  );
}

export default VirtualVisite;
