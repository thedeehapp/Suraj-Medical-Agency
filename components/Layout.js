import Link from 'next/link';
import Footer from './Footer';
import { LogIn, LogOut, Home, Package, ShieldCheck, Phone, User, Settings } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

const ADMIN_EMAIL = 'pal742092@gmail.com';

export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Link href="/" className="text-2xl font-bold shrink-0">Suraj Medical</Link>
            <div className="flex items-center gap-3 flex-wrap">
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
                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center gap-1 bg-green-600 px-2 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors">
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-1 bg-blue-700 px-2 py-1 rounded-lg text-sm">
                    <User className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-white text-blue-800 px-3 py-1 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-sm"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-1 bg-white text-blue-800 px-3 py-1 rounded-lg font-semibold hover:bg-blue-100 transition-colors text-sm">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
