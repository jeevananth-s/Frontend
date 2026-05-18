import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex gap-5">

      <Link to="/">Home</Link>

      <Link to="/compare">
        Compare
      </Link>

      <Link to="/cart">
        Cart
      </Link>

    </nav>
  );
};

export default Navbar;