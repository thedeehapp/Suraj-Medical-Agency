import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import SearchFilter from '../components/SearchFilter';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setFiltered(data);

      const cats = [...new Set(data.map(p => p.category).filter(Boolean))];
      setCategories(cats);
    };
    fetchProducts();
  }, []);

  const handleFilter = ({ search, category }) => {
    let result = products;
    if (search) {
      result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      result = result.filter(p => p.category === category);
    }
    setFiltered(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Product Catalog</h1>
      <SearchFilter categories={categories} onFilter={handleFilter} />
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
