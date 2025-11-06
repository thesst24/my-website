"use client";

import { useEffect, useState } from "react";
import { addItem, deleteItem, getItems, updateItem, Item } from "@/lib/firestore";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Omit<Item, "id">>({
    name: "",
    image: "",
    size: "",
    price: 0,
    type: "",
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<Item, "id">>({
    name: "",
    image: "",
    size: "",
    price: 0,
    type: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    await addItem(form);
    setForm({ name: "", image: "", size: "", price: 0, type: "" });
    loadItems();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleUpdate = async (id: string) => {
    await updateItem(id, editForm);
    setEditing(null);
    loadItems();
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <main className="flex flex-col items-center h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Add Items Shopping List</h1>

      {/* Add Form */}
      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-3 bg-white p-4 rounded shadow w-full max-w-md mb-8"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="imageUrl"
          className="border p-2 rounded"
        />
        <select
          name="size"
          value={form.size}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
       <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Category</option>
          <option value="fruit">fruit</option>
          <option value="candy">candy</option>
          <option value="food">food</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Item
        </button>
      </form>

      {/* Item List */}

      <ul className="flex gap-3 flex-wrap">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col bg-white p-4 rounded shadow mb-3"
          >
            {editing === item.id ? (
              <>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                />
                <input
                  name="image"
                  value={editForm.image}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                />
                <select
                  name="size"
                  value={editForm.size}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                <input
                  name="price"
                  type="number"
                  value={editForm.price}
                  onChange={handleEditChange}
                  className="border p-2 rounded"
                />
                <select
          name="type"
          value={form.type}
          onChange={handleEditChange}
          className="border p-2 rounded"
        >
          <option value="fruit">fruit</option>
          <option value="candy">candy</option>
          <option value="food">food</option>
        </select>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(item.id!)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex w-full h-35 justify-center flex-col items-center">
                  <div className="flex flex-col justify-center items-center">
                    <img src={item.image} alt="image" width={70} height={70} />
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                       {item.size} | {item.type} | {item.price} kip
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditing(item.id!);
                        setEditForm({
                          name: item.name,
                          image: item.image,
                          size: item.size,
                          price: item.price,
                          type: item.type,
                        });
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id!)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
