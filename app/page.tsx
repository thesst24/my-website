import Header from '@/components/header';
import Product from '@/components/product';
import Footer from '@/components/footer';
import { title } from 'process';
import Gdropdown from '@/components/gropdropdown';
import HeroS from '@/components/HeroS';

export default function Home() {
  return (
    <div className='bg-gray-200 p-0 m-0'>
      <Header />
      <HeroS />
      <Gdropdown />
      <Product />
      <Footer />
    </div>
  );
}
