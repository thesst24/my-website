'use client';
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";


interface ProductProps {
    id: string;
    image: string;
    title: string;
    size: string;
    price: number;
}

export default function ItemP({id,image,title,size,price}: ProductProps) {
    const handleAddToCart = async () => {
    try {
      const q = query(collection(db, "items"), where("productId", "==", id));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        await addDoc(collection(db, "items"), {
          productId: id,
          title,
          image,
          price,
          quantity: 1,
          createdAt: serverTimestamp(),
        });
      } else {
        snapshot.forEach(async (docSnap) => {
          const ref = doc(db, "itmes", docSnap.id);
          await updateDoc(ref, { quantity: docSnap.data().quantity + 1 });
        });
      }

      alert(`${title} added to cart!`);
    } catch (err) {
      console.error(err);
    }
  };
    return(
             <div className="flex flex-col justify-center items-center w-70 h-100 hover:shadow-lg transition bg-gray-100 shadow-3xl rounded-[20em/5em] text-center m-5 z-0">
                <div className="w-50 h-50 mb-10 relative hover:cursor-pointer">
                    <img className="ml-auto mr-auto absolute" src={image} alt='item' />
                </div>
                 <div className="hover:cursor-pointer">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-red-700">{size}</p>
                    <p className="text-2xl font-bold">{price} kip</p>
                 </div>
                <button onClick={handleAddToCart} className="bg-blue-600 text-white my-2 px-6 py-2 rounded-[10em/8em] hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>          
    )
}