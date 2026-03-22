import Link from 'next/link';
import Footer from './Footer';
import { LogIn } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
          <Link href="/" className="text-2xl font-bold">Suraj Medical</Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-200">Home</Link>
            <Link href="/products" className="hover:text-blue-200">Products</Link>
            <Link href="/compliance" className="hover:text-blue-200">Compliance</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/login" className="flex items-center gap-2 bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors">
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
