import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Smart Compare Store
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </div>
  );
};

export default Home;