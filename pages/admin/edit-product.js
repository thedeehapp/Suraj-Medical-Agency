import { useState, useEffect } from 'react';
import { db, storage } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AdminRoute from '../../components/AdminRoute';
import { useRouter } from 'next/router';

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState({
    name: '',
    category: '',
    manufacturer: '',
    packSize: '',
    description: '',
    imageFile: null,
    existingImageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            name: data.name,
            category: data.category,
            manufacturer: data.manufacturer,
            packSize: data.packSize,
            description: data.description,
            existingImageUrl: data.imageUrl || '',
            imageFile: null
          });
        }
      };
      fetchProduct();
    }
  }, [id]);

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
    let imageUrl = form.existingImageUrl;
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
      updatedAt: new Date().toISOString(),
    };
    await updateDoc(doc(db, 'products', id), productData);
    setLoading(false);
    router.push('/admin');
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
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
            <label className="block text-sm font-medium text-gray-700">Current Image</label>
            {form.existingImageUrl && <img src={form.existingImageUrl} alt="Current" className="h-32 object-cover mb-2" />}
            <input type="file" name="imageFile" accept="image/*" onChange={handleChange} className="mt-1 block w-full" />
          </div>
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </div>
    </AdminRoute>
  );
  }
