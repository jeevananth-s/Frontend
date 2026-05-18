import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCompare } from '../context/CompareContext';
import { useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const { addToCompare, compareList } = useCompare();
  const navigate = useNavigate();
  const product = getProduct(id);
  const [isAdded, setIsAdded] = useState(false);
  
  const isCompared = compareList.some(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-32">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Product not found.</h2>
        <Link to="/" className="text-black font-semibold border-b hover:opacity-70 transition-opacity">Return to Catalog</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 pt-4">
      {/* Left Column: Image */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <div className="relative pt-[100%] rounded-3xl bg-gray-50 border border-gray-100/50 overflow-hidden shadow-soft mix-blend-multiply">
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover p-12 mix-blend-darken hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md shadow-sm border border-red-100 text-xs font-bold text-red-600 px-4 py-2 rounded-full uppercase tracking-widest">
              Low Stock: {product.stock}
            </div>
          )}
        </div>
      </div>
      
      {/* Right Column: Details */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="pb-8 border-b border-gray-100 mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-6 text-sm mb-6">
            <span className="font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-3 py-1 rounded w-fit">{product.brand}</span>
            <span className="flex items-center gap-1 font-bold">
              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {product.rating}
            </span>
            <span className="text-gray-400 font-medium">{product.category}</span>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900 mb-6">Technical Specs</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between sm:flex-col sm:justify-start border-b border-gray-100 sm:border-0 pb-2 sm:pb-0">
                <dt className="text-xs text-gray-500 capitalize tracking-wider font-medium mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="font-semibold text-gray-900 text-sm">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-5xl font-extrabold tracking-tight text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className={`flex-1 py-4 px-8 rounded-xl font-bold tracking-wide transition-all ${
                isAdded 
                  ? 'bg-green-500 text-white' 
                  : product.stock === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:shadow-soft hover:-translate-y-0.5'
              }`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <span className="flex items-center justify-center gap-2">
                {isAdded ? (
                  <>✓ Added to Cart</>
                ) : product.stock === 0 ? (
                  'Out of Stock'
                ) : (
                  'Add to Cart'
                )}
              </span>
            </button>
            <button 
              onClick={() => {
                if (!isCompared) {
                  const success = addToCompare(product);
                  if (success) navigate('/compare');
                  else alert("You can only compare up to 3 products.");
                } else {
                  navigate('/compare');
                }
              }}
              className={`py-4 px-6 rounded-xl font-bold transition-colors flex items-center justify-center border-2 border-gray-200 ${
                isCompared 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'bg-white text-gray-900 hover:border-black'
              }`}
              title={isCompared ? "View Comparison" : "Add to Compare"}
            >
              {isCompared ? 'Compare List' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
