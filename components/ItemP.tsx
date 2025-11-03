'use client';
import Image, {StaticImageData} from 'next/image';

interface props {
    image: StaticImageData;
    title: string;
    size: string;
    price: string;
}

export default function ItemP({image,title,size,price}: props) {
    return(
             <div className="flex flex-col justify-center items-center w-70 h-100 bg-amber-300 rounded-[20em/5em] text-center m-5 z-0">
                <div className="w-50 h-50 mb-10 relative">
                    <Image className="ml-auto mr-auto absolute" src={image} objectFit= "contain" layout="fill" alt='item' />
                </div>
                 <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p>{size}</p>
                    <p className="text-2xl font-bold">{price}</p>
                 </div>
            </div>          
    )
}