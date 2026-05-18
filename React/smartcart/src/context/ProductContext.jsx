import { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const initialProducts = [
  {
    id: '1',
    name: 'ProVision 4K Smart TV',
    price: 49999,
    category: 'Electronics',
    brand: 'ProVision',
    rating: 4.8,
    stock: 12,
    specs: { display: '55" OLED', resolution: '4K', refreshRate: '120Hz' },
    description: 'Immersive 4K visual experience with deep blacks and vibrant colors.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Nimbus Wireless Headphones',
    price: 14999,
    category: 'Audio',
    brand: 'Nimbus',
    rating: 4.6,
    stock: 50,
    specs: { type: 'Over-ear', battery: '30h', noiseCancellation: 'Active' },
    description: 'Industry-leading noise cancellation for pure audio bliss.',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'AeroBook Pro 14',
    price: 112999,
    category: 'Computers',
    brand: 'Aero',
    rating: 4.9,
    stock: 8,
    specs: { cpu: 'M2 Chip', ram: '16GB', storage: '512GB SSD' },
    description: 'Powerful performance in a sleek, lightweight design.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Zenith Smartwatch Series X',
    price: 24999,
    category: 'Wearables',
    brand: 'Zenith',
    rating: 4.5,
    stock: 25,
    specs: { display: '1.4" AMOLED', battery: '5 Days', waterResistance: '50m' },
    description: 'Track your health and stay connected on the go.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'SonicWave Bluetooth Speaker',
    price: 5999,
    category: 'Audio',
    brand: 'SonicWave',
    rating: 4.3,
    stock: 100,
    specs: { output: '20W', battery: '12h', waterproof: 'IPX7' },
    description: 'Portable, rugged speaker with punchy bass.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Nexus Gaming Console',
    price: 45999,
    category: 'Gaming',
    brand: 'Nexus',
    rating: 4.9,
    stock: 15,
    specs: { cpu: 'Custom Zen 3', storage: '1TB NVMe', output: '4K @ 120fps' },
    description: 'Next-gen gaming experience with lightning-fast load times.',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '7',
    name: 'Visionary AR Glasses',
    price: 89999,
    category: 'Wearables',
    brand: 'ProVision',
    rating: 4.7,
    stock: 5,
    specs: { display: 'Micro-OLED', weight: '75g', battery: '4h' },
    description: 'Augmented reality in a remarkably lightweight frame.',
    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '8',
    name: 'AeroTab Ultra',
    price: 64999,
    category: 'Computers',
    brand: 'Aero',
    rating: 4.8,
    stock: 18,
    specs: { display: '12.9" Liquid Retina', mChip: 'M1', storage: '256GB' },
    description: 'The ultimate tablet for creativity and productivity.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // We changed the key to force reset to the rupees prices and new items.
    const storedProducts = localStorage.getItem('smartcart_products_v2');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('smartcart_products_v2', JSON.stringify(initialProducts));
    }
  }, []);

  const updateStock = (productId, newStock) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, stock: parseInt(newStock) } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('smartcart_products_v2', JSON.stringify(updatedProducts));
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now().toString(),
      rating: 0,
      specs: newProduct.specs || {}
    };
    const updatedProducts = [...products, productWithId];
    setProducts(updatedProducts);
    localStorage.setItem('smartcart_products_v2', JSON.stringify(updatedProducts));
  };

  const getProduct = (productId) => products.find(p => p.id === productId);

  return (
    <ProductContext.Provider value={{ products, getProduct, updateStock, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
