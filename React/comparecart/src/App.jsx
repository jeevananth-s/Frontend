import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

    </div>
  );
};

export default App;