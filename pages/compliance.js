import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Compliance() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'siteSettings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setSettings(docSnap.data());
    };
    fetchSettings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">Compliance & Licenses</h1>
      <div className="bg-gray-100 p-6 rounded shadow">
        <p><strong>Drug License No.:</strong> {settings.drugLicense || 'UP/31/DL/12345'}</p>
        <p><strong>GST No.:</strong> {settings.gstNumber || '09ABCDE1234F1Z5'}</p>
        <p className="mt-4">We are fully licensed and compliant with all regulatory standards.</p>
      </div>
    </div>
  );
}
