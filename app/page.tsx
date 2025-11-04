import Header from '@/components/header';
import Hero from '@/components/hero';
import Product from '@/components/product';
import Footer from '@/components/footer';
import { title } from 'process';
import Gdropdown from '@/components/gropdropdown';
import HeroS from '@/components/HeroS';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroS />
      <Hero />
      <Gdropdown />
      <Product />
      <Footer />
    </div>
  );
}
