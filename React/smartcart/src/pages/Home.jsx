import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white rounded-[2rem] px-8 py-20 md:py-32 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-black to-black mix-blend-screen pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-6">High-End Audiovisual</span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Digital Lifestyle.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl font-medium leading-relaxed">
            Discover premium, uncompromising hardware precision-engineered to integrate seamlessly into your workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-gray-200 transition-colors">
              Explore Collection
            </button>
            <button className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:border-white transition-colors">
              Compare Features
            </button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Featured Collection</h2>
            <p className="text-gray-500 text-sm">Curated tech essentials for the modern professional.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm font-medium appearance-none min-w-[140px]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-6">Your search did not return any results.</p>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="text-white bg-black px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
