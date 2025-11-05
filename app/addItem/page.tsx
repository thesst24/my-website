"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Item = {
  id?: string;
  name: string;
  size: string;
  price: number;
  imageUrl: string;
};

export default function AdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const itemsCollection = collection(db, "items");

  // Fetch items from Firestore
  const fetchItems = async () => {
    const snapshot = await getDocs(itemsCollection);
    const itemList: Item[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Item),
    }));
    setItems(itemList);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle Add Item
  const handleAddItem = async () => {
    if (!name || !size || price <= 0 || !imageFile) {
      setMessage("❌ Fill all fields and select an image");
      return;
    }

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `items/${imageFile.name}-${Date.now()}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // Add item to Firestore
      await addDoc(itemsCollection, {
        name,
        size,
        price,
        imageUrl,
        createdAt: new Date(),
      });

      setMessage(`✅ Added ${name} successfully`);
      setName("");
      setSize("");
      setPrice(0);
      setImageFile(null);
      fetchItems();
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding item");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Admin: Add Item with Image</h1>

      {/* Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-60"
        />
        <input
          type="text"
          placeholder="Size (S, M, L)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddItem}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Item
        </button>
      </div>

      {message && <p className="mb-6">{message}</p>}

      {/* Items List */}
      <h2 className="text-2xl font-semibold mb-4">Available Items</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow bg-white flex flex-col items-center"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-40 h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">Size: {item.size}</p>
            <p className="text-gray-600 font-bold">${item.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
