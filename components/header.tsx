import Form from 'next/form';
import Link from 'next/link';

export default function Header() {
    return(
        <div className="flex flex-row justify-between items-center bg-blue-400 mb-8 w-full rounded-3xl pl-6 pr-6 sticky top-0 z-100">
            <img src="https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png" 
            alt="LogoShop"
            width="80"
            height="80"
            />
            <div className="text-black-500 flex gap-8">
                <button  className="cursor-pointer hover:text-white hover:underline font-bold">Home</button>
                <button  className="cursor-pointer hover:text-white hover:underline font-bold"><Link href="/buy">Buy</Link></button>
                <button  className="cursor-pointer hover:text-white hover:underline font-bold"><Link href="/addItem">ADD</Link></button>
                <button  className="cursor-pointer hover:text-white hover:underline font-bold">Profile</button>
                <button  className="cursor-pointer hover:text-white hover:underline font-bold"><Link href="/login">LoginManageWebsite</Link></button>
            </div>
        </div>
    )
}