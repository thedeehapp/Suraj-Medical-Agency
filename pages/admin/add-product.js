import { useState } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminRoute from '../../components/AdminRoute';
import { useRouter } from 'next/router';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    category: '',
    manufacturer: '',
    packSize: '',
    description: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = '';
    if (form.imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${form.imageFile.name}`);
      await uploadBytes(storageRef, form.imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }
    const productData = {
      name: form.name,
      category: form.category,
      manufacturer: form.manufacturer,
      packSize: form.packSize,
      description: form.description,
      imageUrl,
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, 'products'), productData);
    setLoading(false);
    router.push('/admin');
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name *</label>
            <input type="text" name="name" required value={form.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <input type="text" name="category" required value={form.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <input type="text" name="manufacturer" value={form.manufacturer} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pack Size</label>
            <input type="text" name="packSize" value={form.packSize} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" name="imageFile" accept="image/*" onChange={handleChange} className="mt-1 block w-full" />
          </div>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </div>
    </AdminRoute>
  );
  }
