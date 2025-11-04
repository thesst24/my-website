import Header from '@/components/header';
import Hero from '@/components/hero';
import Product from '@/components/product';
import Footer from '@/components/footer';
import { title } from 'process';
import Gdropdown from '@/components/gropdropdown';
import Test from '@/components/test';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Gdropdown />
      <Test />
      <Product />
      <Footer />
    </div>
  );
}
