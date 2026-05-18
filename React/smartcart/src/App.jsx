import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CompareProvider } from './context/CompareContext';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CompareProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="compare" element={<Compare />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </CompareProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
