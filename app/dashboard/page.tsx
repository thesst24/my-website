"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function DashboardPage() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState("");
  const router = useRouter();
  const itemsRef = collection(db, "items");

  // 🔒 Protect route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  // 📖 Get all items
  const fetchItems = async () => {
    const snapshot = await getDocs(itemsRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ➕ Add
  const handleAdd = async () => {
    if (!newItem.trim()) return;
    await addDoc(itemsRef, { name: newItem });
    setNewItem("");
    fetchItems();
  };

  // ✏️ Update
  const handleUpdate = async (id: string) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    const itemDoc = doc(db, "items", id);
    await updateDoc(itemDoc, { name: newName });
    fetchItems();
  };

  // ❌ Delete
  const handleDelete = async (id: string) => {
    const itemDoc = doc(db, "items", id);
    await deleteDoc(itemDoc);
    fetchItems();
  };

  // 🚪 Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>

        <div className="flex mb-6">
          <input
            type="text"
            placeholder="New item"
            className="flex-1 border px-3 py-2 rounded-l"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{item.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(item.id)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
