import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Item {
  id?: string;
  name: string;
  image: string;
  size: string;
  price: number;
  type: string;
}

const COLLECTION = "items";

export const getItems = async (): Promise<Item[]> => {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
};

export const addItem = async (item: Omit<Item, "id">) => {
  await addDoc(collection(db, COLLECTION), item);
};

export const updateItem = async (id: string, data: Partial<Item>) => {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, data);
};

export const deleteItem = async (id: string) => {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
};
