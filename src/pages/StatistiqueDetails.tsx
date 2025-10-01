import ForestDashboard from '../../reusable-components/Forest/sections/ForestDashboard';
import CTASection from '../../reusable-components/Forest/sections/CTASection';
import Header from '../../reusable-components/Layout/Header';
import Footer from '../../reusable-components/Layout/Footer';
import type { Forest } from '@/types/forest';
import ForestHero from '../../reusable-components/Forest/sections/ForestHero';

interface ForestDetailPageProps {
  forest: Forest;
  onBack: () => void;
}

// export default function StatistiqueDetails({ forest, onBack }: ForestDetailPageProps) {
export default function StatistiqueDetails({ forest }: ForestDetailPageProps) {
  return (
    <div className="min-h-screen">
      {/* <Header showBackButton onBack={onBack} /> */}
     
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">
        <ForestHero forest={forest}/>
        {/* <ForestHero/> */}
      </div>
      <ForestDashboard />
      <CTASection />
      <Footer />
    </div>
  );
}
