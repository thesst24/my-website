import Header from '@/components/header';
import Hero from '@/components/hero';
import Product from '@/components/product';
import Footer from '@/components/footer';
import { title } from 'process';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Product />
      <Footer />
    </div>
  );
}
