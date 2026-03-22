import Link from 'next/link';
import Footer from './Footer';
import { LogIn, LogOut, Home, Package, ShieldCheck, Phone, User } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
          <Link href="/" className="text-2xl font-bold">Suraj Medical</Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center gap-1 hover:text-blue-200">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="/products" className="flex items-center gap-1 hover:text-blue-200">
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link href="/compliance" className="flex items-center gap-1 hover:text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Compliance
            </Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-blue-200">
              <Phone className="h-4 w-4" />
              Contact
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-blue-700 px-3 py-2 rounded-lg">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
