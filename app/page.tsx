import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import SponsorsSection from '@/components/SponsorsSection';
import PrizesSection from '@/components/PrizesSection';
import ScheduleSection from '@/components/ScheduleSection';
import ChallengesSection from '@/components/ChallengesSection';
import ContestantsSection from '@/components/ContestantsSection';
import Footer from '@/components/Footer';

// Dynamically import components that use client-side features
const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: false });
const JudgesSection = dynamic(() => import('@/components/JudgesSection'), { ssr: false });
const OverviewSection = dynamic(() => import('@/components/OverviewSection'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <JudgesSection />
      <SponsorsSection />
      <OverviewSection />
      <PrizesSection />
      <ChallengesSection />
      <ScheduleSection />
      <ContestantsSection />
      <Footer />
    </main>
  );
}