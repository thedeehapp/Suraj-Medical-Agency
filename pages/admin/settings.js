import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AdminRoute from '../../components/AdminRoute';

export default function Settings() {
  const [settings, setSettings] = useState({
    drugLicense: '',
    gstNumber: '',
    phone: '',
    email: '',
    address: '',
    whatsappNumber: '',
    vision: '',
    mission: ''
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'siteSettings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'settings', 'siteSettings'), settings, { merge: true });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
        {saved && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">Settings saved!</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Drug License No.</label>
            <input type="text" name="drugLicense" value={settings.drugLicense} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GST No.</label>
            <input type="text" name="gstNumber" value={settings.gstNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="text" name="phone" value={settings.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={settings.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea name="address" rows="2" value={settings.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">WhatsApp Number (with country code)</label>
            <input type="text" name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Vision</label>
            <textarea name="vision" rows="2" value={settings.vision} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mission</label>
            <textarea name="mission" rows="2" value={settings.mission} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded p-2"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Settings
          </button>
        </form>
      </div>
    </AdminRoute>
  );
          }
