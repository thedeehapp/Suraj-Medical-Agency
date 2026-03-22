import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvp_4xk8oVhHZ5ajpUCBv4sza2cT3m37k",
  authDomain: "surajmedicalagency-81547.firebaseapp.com",
  projectId: "surajmedicalagency-81547",
  storageBucket: "surajmedicalagency-81547.firebasestorage.app",
  messagingSenderId: "547773041395",
  appId: "1:547773041395:web:ecba0706d821d9a56ec586",
  measurementId: "G-GEGR4N7MRD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
