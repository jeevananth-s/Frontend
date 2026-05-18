import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-soft transition-all duration-400 relative overflow-hidden">
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.stock <= 5 && product.stock > 0 && (
          <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border border-red-100">
            {product.stock} Left
          </span>
        )}
      </div>

      {product.stock === 0 && (
        <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <span className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase shadow-lg">
            Sold Out
          </span>
        </div>
      )}

      {/* Image Wrapper */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden mix-blend-multiply">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover p-8 group-hover:scale-110 transition-transform duration-700 ease-in-out mix-blend-darken"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-white relative z-10 border-t border-gray-50">
        <div className="mb-1 text-xs font-semibold text-primary-600 tracking-wider uppercase">
          {product.brand}
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/product/${product.id}`} className="block focus:outline-none focus-visible:underline">
            {product.name}
          </Link>
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through decoration-gray-300 font-medium">
              ₹{(product.price * 1.2).toLocaleString('en-IN')}
            </span>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>
          
          <Link 
            to={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-gray-50 text-gray-900 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all shadow-sm group-hover:shadow-soft"
            aria-label={`View ${product.name}`}
          >
            <svg className="w-4 h-4 translate-x-[-1px] group-hover:translate-x-[1px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
