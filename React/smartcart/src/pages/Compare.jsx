import { useCompare } from '../context/CompareContext';
import { Link } from 'react-router-dom';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  if (compareList.length === 0) {
    return (
      <div className="text-center py-32 max-w-lg mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-6">Compare Models</h2>
        <p className="text-gray-500 mb-8 text-lg">Select items from the catalog across our ecosystem to compare their technical specifications side by side.</p>
        <Link to="/" className="inline-block bg-black text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase hover:shadow-soft transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  const allSpecs = new Set();
  compareList.forEach(product => {
    Object.keys(product.specs).forEach(key => allSpecs.add(key));
  });
  const specKeys = Array.from(allSpecs);

  return (
    <div className="pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Compare Models</h1>
          <p className="text-gray-500 font-medium text-lg">Detailed analysis of selected devices.</p>
        </div>
        <button 
          onClick={clearCompare}
          className="text-sm font-bold tracking-widest text-red-600 uppercase hover:text-red-800 transition-colors"
        >
          Clear Selection
        </button>
      </div>

      <div className="overflow-x-auto pb-8">
        <table className="w-full min-w-[800px] border-collapse bg-white">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="w-1/4 p-6 text-left align-bottom">
                <span className="block text-xl font-bold tracking-tight text-gray-900">Technical<br/>Specifications</span>
              </th>
              {compareList.map(product => (
                <th key={product.id} className="w-1/4 p-6 align-top relative group border-l border-gray-100">
                  <button 
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white hover:bg-black rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                    title="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                  <div className="flex flex-col items-center text-center">
                    <img src={product.image} alt={product.name} className="w-40 h-40 object-cover mix-blend-multiply mb-6" />
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-2">{product.brand}</span>
                    <Link to={`/product/${product.id}`} className="text-xl font-extrabold text-gray-900 hover:opacity-70 transition-opacity min-h-[56px] leading-tight mb-2">
                      {product.name}
                    </Link>
                    <span className="text-2xl font-light tracking-tight text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                </th>
              ))}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <th key={`empty-${i}`} className="w-1/4 p-6 align-middle text-center border-l border-gray-100">
                  <div className="border border-dashed border-gray-200 rounded-2xl h-48 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <Link to="/" className="w-full h-full flex flex-col items-center justify-center">
                      <span className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center mb-2 group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      </span>
                      <span className="font-bold text-xs tracking-widest uppercase">Add Model</span>
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 border-b border-gray-200">
            {specKeys.map(key => (
              <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6 font-bold text-sm tracking-wide uppercase text-gray-900">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                {compareList.map(product => {
                  const val = product.specs[key];
                  return (
                    <td key={product.id} className="p-6 text-center text-gray-700 font-medium border-l border-gray-100">
                      {val || <span className="text-gray-300">—</span>}
                    </td>
                  );
                })}
                {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                  <td key={`empty-spec-${i}`} className="p-6 border-l border-gray-100"></td>
                ))}
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            <tr>
              <td className="p-6"></td>
              {compareList.map(product => (
                <td key={product.id} className="p-6 text-center border-l border-gray-100">
                  <button 
                    disabled={product.stock === 0}
                    className={`w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all ${
                      product.stock === 0 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {product.stock === 0 ? 'Sold Out' : 'Buy Now'}
                  </button>
                </td>
              ))}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <td key={`empty-action-${i}`} className="p-6 border-l border-gray-100"></td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Compare;
