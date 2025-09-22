export const dynamic = "force-dynamic";

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { MainSection} from '@/components/MainSection';
import { Footer } from '@/components/Footer';
import { fetchItems } from '@/services/coffeeApi';
import { CoffeeItem } from '@/types/Item';

export default async function Home() {
  let items: CoffeeItem[] = [];
  let error: string | null = null;

  try {
    items = await fetchItems();
  } catch (err) {
    try {
      const { coffeeItems } = await import('@/data/sampleData');
      items = coffeeItems;
      error = 'Using sample data. Some features may be limited.';
    } catch (fallbackErr) {
      items = [];
      error = 'Unable to load coffee items. Please try again later.';
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navigation />
      <HeroSection />
      <MainSection
        items={items}
        error={error}
      />
      <Footer />
    </div>
  );
}
