"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

type Item = {
  id: number;
  name: string;
  price: number;
};

const items: Item[] = [
  { id: 1, name: "T-Shirt", price: 25 },
  { id: 2, name: "Shoes", price: 80 },
  { id: 3, name: "Backpack", price: 45 },
];

export default function ShopPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async (item: Item) => {
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "purchases"), {
        itemName: item.name,
        price: item.price,
        createdAt: new Date(),
      });
      setMessage(`✅ Purchased ${item.name} successfully!`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Error saving purchase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Shopping Page</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-3">${item.price}</p>
            <button
              disabled={loading}
              onClick={() => handleBuy(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </div>
        ))}
      </div>

      {message && <p className="mt-6 text-lg">{message}</p>}
    </main>
  );
}
