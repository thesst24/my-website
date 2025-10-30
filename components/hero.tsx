import { Iansui } from 'next/font/google';
import Image from 'next/image';

export default function Hero(){
    return(
        <div className="bg-blue-200 h-180 w-full flex justify-center ">
            <div className="bg-red-500 w-7xl h-180">
                <img 
                    src="https://cdn.corporatefinanceinstitute.com/assets/product-mix3.jpeg" 
                    alt="Product"
                />
            </div> 
        </div>
    )
}