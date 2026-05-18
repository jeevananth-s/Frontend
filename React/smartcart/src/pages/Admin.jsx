import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const { products, updateStock, addProduct } = useProducts();
  
  // Stock editing state
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState('');

  // Add Product Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-2">Restricted Access</h2>
          <p className="text-gray-500 mb-8">Administrative privileges are required to view this interface.</p>
          <Link to="/" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-semibold tracking-wide hover:shadow-soft transition-all">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  // Edit stock logic
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setTempStock(product.stock.toString());
  };

  const handleSave = (id) => {
    updateStock(id, tempStock);
    setEditingId(null);
  };

  // Add product logic
  const handleAddProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      brand: newProduct.brand,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      description: newProduct.description,
      image: newProduct.image || 'https://images.unsplash.com/photo-1523289217630-0dd16184af8e?auto=format&fit=crop&w=800&q=80',
      specs: {} // Empty specs for now, can be expanded later
    });
    
    // Reset and close
    setNewProduct({
      name: '', brand: '', category: '', price: '', stock: '', description: '', image: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Inventory System</h1>
          <p className="text-gray-500 font-medium">Manage catalog stock levels and add new tech lines.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide hover:bg-primary-700 transition shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add New Product
          </button>
          <div className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Admin
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Total SKUs</p>
          <p className="text-4xl font-extrabold tracking-tight text-gray-900">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Low Stock</p>
          <p className="text-4xl font-extrabold tracking-tight text-orange-500">{products.filter(p => p.stock > 0 && p.stock <= 5).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Out of Stock</p>
          <p className="text-4xl font-extrabold tracking-tight text-red-500">{products.filter(p => p.stock === 0).length}</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-200 text-xs font-bold tracking-widest uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4 hidden md:table-cell">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100 mix-blend-multiply bg-gray-50" />
                      <div>
                        <Link to={`/product/${product.id}`} className="font-bold text-gray-900 leading-none group-hover:text-primary-600 transition-colors">
                          {product.name}
                        </Link>
                        <span className="block text-xs font-medium text-gray-400 mt-1 md:hidden">{product.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell">
                    <span className="font-medium text-gray-600">{product.brand}</span>
                  </td>
                  <td className="px-6 py-5 font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-5">
                    {editingId === product.id ? (
                      <input 
                        type="number" 
                        min="0"
                        className="w-24 px-3 py-2 border-2 border-primary-500 rounded-xl text-gray-900 font-bold focus:outline-none focus:ring-0"
                        value={tempStock}
                        onChange={(e) => setTempStock(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {product.stock === 0 ? (
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        ) : product.stock <= 5 ? (
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        )}
                        <span className={`font-bold ${
                          product.stock === 0 ? 'text-red-600' : 
                          product.stock <= 5 ? 'text-orange-600' : 
                          'text-gray-900'
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {editingId === product.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleSave(product.id)}
                          className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:shadow-soft transition-all"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleEditClick(product)}
                        className="opacity-0 group-hover:opacity-100 text-sm font-bold tracking-wide text-primary-600 hover:text-primary-800 transition-all border border-gray-200 hover:border-primary-200 px-4 py-2 rounded-lg bg-white"
                      >
                        Edit Stock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Add New Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 p-2 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input required name="name" value={newProduct.name} onChange={handleAddProductChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all" placeholder="e.g. AeroPhone Pro" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                  <input required name="brand" value={newProduct.brand} onChange={handleAddProductChange} type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all" placeholder="e.g. Aero" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select required name="category" value={newProduct.category} onChange={handleAddProductChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all appearance-none">
                    <option value="" disabled>Select category</option>
                    <option value="Computers">Computers</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Audio">Audio</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹)</label>
                  <input required name="price" value={newProduct.price} onChange={handleAddProductChange} type="number" step="0.01" min="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Initial Stock</label>
                  <input required name="stock" value={newProduct.stock} onChange={handleAddProductChange} type="number" min="0" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all" placeholder="e.g. 50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL (Optional)</label>
                  <input name="image" value={newProduct.image} onChange={handleAddProductChange} type="url" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all" placeholder="https://" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea required name="description" value={newProduct.description} onChange={handleAddProductChange} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none font-medium text-sm transition-all resize-none" placeholder="Provide product details..."></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:shadow-soft transition-all">
                  Add Item to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
