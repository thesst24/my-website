'use client';

interface props {
    image: any;
    title: string;
    price: string;
}

export default function Product({image,title,price}: props) {
    return(
             <div className="flex flex-col justify-center items-center w-70 h-100 bg-amber-300 rounded-[20em/5em] text-center">
                <div className="w-60 h-75">
                    <img className="ml-auto mr-auto" src={image} width="250" height="250" />
                </div>
                 <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-2xl font-bold">{price}</p>
                 </div>
            </div>          
    )
}