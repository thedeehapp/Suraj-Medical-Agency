import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product) => {
  return await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id, product) => {
  return await updateDoc(doc(db, 'products', id), product);
};

export const deleteProduct = async (id) => {
  return await deleteDoc(doc(db, 'products', id));
};

export const getSettings = async () => {
  const docSnap = await getDoc(doc(db, 'settings', 'siteSettings'));
  return docSnap.exists() ? docSnap.data() : {};
};

export const updateSettings = async (data) => {
  return await setDoc(doc(db, 'settings', 'siteSettings'), data, { merge: true });
};
