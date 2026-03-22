# Suraj Medical Agencies – Medical Agency Business Website

यह वेबसाइट **Suraj Medical Agencies** (Lakhimpur Kheri, UP) के लिए बनाई गई है। इसमें दवाइयों और मेडिकल उपकरणों की सूची (catalog) है, admin panel से products manage कर सकते हैं, WhatsApp पर enquiry का बटन है, और compliance (DL, GST) भी दिखाया गया है।

## 🛠️ Technology Stack
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend & Database:** Firebase (Firestore, Authentication, Storage)
- **Hosting:** Vercel (recommended) या Firebase Hosting
- **SSL:** Automatic (Vercel/Firebase)

## 📁 Project Structure (मुख्य फोल्डर)
suraj-medical-agencies/
├──components/         # Reusable components (Layout, ProductCard, etc.)
├──lib/                # Firebase setup
├──pages/              # All pages (index, products, admin, etc.)
│├── admin/          # Admin dashboard, add/edit product, settings
│├── _app.js         # Global wrapper
│└── ...
├──public/             # Images, placeholder
├──styles/             # Tailwind CSS
├──.env.local          # Environment variables (Firebase keys, WhatsApp number)
├──package.json
└──README.md

```

## ⚙️ Setup Instructions

1. **Clone repository** और `npm install` करें।
2. **Firebase Project** बनाएँ:
   - Authentication → Email/Password enable करें।
   - Firestore Database बनाएँ (test mode में start करें)।
   - Storage enable करें।
3. Firebase project की config `.env.local` में डालें:
```

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_WHATSAPP_PHONE=919876543210

```
4. Firebase Authentication में एक **Admin User** (email/password) बनाएँ।
5. Development server चलाएँ:
   ```bash
   npm run dev
```

1. Admin login: /login पर जाकर admin credentials से login करें।

🔥 Firebase Collections Structure

· products: Product documents
    { name, category, manufacturer, packSize, description, imageUrl, createdAt }
· settings: एक document (id = "siteSettings")
    { drugLicense, gstNumber, phone, email, address, whatsappNumber, vision, mission }

🚀 Deploy

· Vercel से connect करें (GitHub repo) → Auto-deploy.
· Environment variables Vercel dashboard में set करें।

📱 Features

· ✅ Responsive design (Tailwind CSS)
· ✅ Product catalog with search & category filter
· ✅ WhatsApp inquiry button per product
· ✅ Admin dashboard (add/edit/delete products)
· ✅ Compliance page (Drug License, GST)
· ✅ Contact page with Google Maps & WhatsApp
· ✅ Footer credit: "Developed by Er. Dipak"

🔒 Security

· Firestore rules: read allowed for all, write only for authenticated users.
· Storage rules: read allowed for all, write only for authenticated users.

📞 Support

किसी भी समस्या या customisation के लिए Er. Dipak से संपर्क करें।
