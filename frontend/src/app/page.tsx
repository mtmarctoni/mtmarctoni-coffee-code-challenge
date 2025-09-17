'use client';

import { useState } from 'react';
import { coffeeItems } from '@/data/sampleData';

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { MainSection} from '@/components/MainSection';
import { Footer } from '@/components/Footer';

export default function Home() {

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navigation />
      <HeroSection />
      <MainSection />
      <Footer />
    </div>
  );
}
