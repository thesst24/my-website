import Product from '@/public/product.png';
import Image from 'next/image';

export default function Hero(){
    return(
            <div className="bg-red-500 h-80 mr-16 ml-16 mb-10 rounded-3xl flex justify-center items-center">
                <Image 
                    src={Product}
                    alt="Product" 
                    width={500}
                    />
            </div> 
    )
}