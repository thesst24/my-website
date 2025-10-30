import Form from 'next/form';

export default function Header() {
    return(
        <div className="flex flex-row justify-around items-center bg-red-200 sticky top-0 z-50">
            <img src="https://png.pngtree.com/png-vector/20221228/ourmid/pngtree-online-shopping-logo-desing-png-image_6540923.png" 
            alt="LogoShop"
            width="80"
            height="80"
            />
            <div className="text-red-500 flex gap-8">
                <button className="cursor-pointer hover:text-blue-600 hover:underline">Home</button>
                <button className="cursor-pointer hover:text-blue-600 hover:underline">Order</button>
                <button className="cursor-pointer hover:text-blue-600 hover:underline">Contact</button>
            </div>
        </div>
    )
}