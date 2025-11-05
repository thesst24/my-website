import Form from 'next/form';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
    return(
        <div className="flex flex-row justify-between items-center bg-blue-400 mb-8 w-full rounded-3xl pl-6 pr-6 sticky top-0 z-100">
            <img src="https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png" 
            alt="LogoShop"
            width="80"
            height="80"
            />
            <div className="text-black-500 flex gap-8">
                <button onClick={() => handleNavigation ('/')} className="cursor-pointer hover:text-white hover:underline font-bold">Home</button>
                <button onClick={() => handleNavigation ('/shop')} className="cursor-pointer hover:text-white hover:underline font-bold">Order</button>
                <button onClick={() => handleNavigation ('/contact')} className="cursor-pointer hover:text-white hover:underline font-bold">Contact</button>
            </div>
        </div>
    )
}