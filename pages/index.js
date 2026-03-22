import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          Suraj Medical Agencies
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          स्वास्थ्य सेवा में आपका भरोसेमंद साथी
        </p>
        <p className="text-lg mb-8">
          Tetarpur, Shardanagr Road, Lakhimpur Kheri, UP-31
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            View Products
          </Link>
          <Link href="/contact" className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Our Vision</h2>
          <p className="text-center max-w-2xl mx-auto text-gray-700">
            To be the most trusted pharmaceutical distribution partner in the region, ensuring timely availability of quality medicines and healthcare products.
          </p>
        </div>
      </div>
    </div>
  );
}
