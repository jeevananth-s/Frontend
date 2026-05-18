import { useContext } from "react";
import { CompareContext } from "../context/CompareContext";

const ProductCard = ({ product }) => {

  const { addToCompare } = useContext(CompareContext);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">

      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">
        {product.name}
      </h2>

      <p className="text-gray-600">
        {product.category}
      </p>

      <p className="text-green-600 font-bold text-lg">
        ₹ {product.price}
      </p>

      <button
        onClick={() => addToCompare(product)}
        className="bg-black text-white px-4 py-2 rounded-lg mt-3"
      >
        Add To Compare
      </button>

    </div>
  );
};

export default ProductCard;