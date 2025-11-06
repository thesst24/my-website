'use client';

import { db } from '@/lib/firebase';
import {
collection,
getDocs,
} from 'firebase/firestore';

import { useEffect, useState } from 'react';
import ItemP from './ItemP';

type Items = {

id: string;
image: string;
name: string;
size: string;
price: number;

};

export default function Product() {
    const [items, setItems] = useState<Items[]>([]);
    const usersRef = collection(db, 'items');


const fetchItems = async () => {

const snapshot = await getDocs(usersRef)
const data = snapshot.docs.map(doc => ({

id: doc.id,
...doc.data(),
})) as Items[];
setItems(data);
};

useEffect(() => {
fetchItems();
}, []);
    return(
        <div className="bg-blue-400 flex justify-center items-center flex-wrap mr-16 ml-16 rounded-3xl">
           
    {items.map(item => (
    <ItemP 
        id={item.id}
        key={item.id}
        image={item.image}
        title={item.name}
        size={item.size}
        price={item.price}
    />
    ))}
        </div>
    )
}