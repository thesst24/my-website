"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";


interface CartItem {
    id: string;
    image: string;
    title: string;
    size: string;
    price: number;
    quantity: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cartItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<CartItem, "id">),
      }));
      setItems(cartItems);
    });

    return () => unsubscribe();
  }, []);

  const increment = async (id: string, quantity: number) => {
    const ref = doc(db, "items", id);
    await updateDoc(ref, { quantity: quantity + 1 });
  };

  const decrement = async (id: string, quantity: number) => {
    const ref = doc(db, "items", id);
    if (quantity > 1) {
      await updateDoc(ref, { quantity: quantity - 1 });
    } else {
      await deleteDoc(ref);
    }
  };

  const handleBuyNow = async () => {
    if (items.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        createdAt: serverTimestamp(),
      });

      // Clear cart
      for (const item of items) {
        await deleteDoc(doc(db, "items", item.id));
      }

      alert("Purchase successful!");
    } catch (err) {
      console.error("Error buying:", err);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-xl font-semibold mb-4">🛒 Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border p-3 rounded-md bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                  <span>{item.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrement(item.id, item.quantity)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increment(item.id, item.quantity)}
                    className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <span className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Buy Now
          </button>
        </>
      )}
    </div>
  );
}
