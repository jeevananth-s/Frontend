import { useContext } from "react";
import { CompareContext } from "../context/CompareContext";

const Compare = () => {

  const {
    compareItems,
    removeFromCompare,
  } = useContext(CompareContext);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Compare Products
      </h1>

      {compareItems.length === 0 ? (
        <p>No products selected</p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border bg-white">

            <thead className="bg-black text-white">

              <tr>

                <th className="p-3 border">
                  Feature
                </th>

                {compareItems.map((item) => (
                  <th
                    key={item.id}
                    className="p-3 border"
                  >
                    {item.name}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              <tr>
                <td className="p-3 border font-bold">
                  Price
                </td>

                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-3 border"
                  >
                    ₹ {item.price}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 border font-bold">
                  Category
                </td>

                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-3 border"
                  >
                    {item.category}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-3 border font-bold">
                  Action
                </td>

                {compareItems.map((item) => (
                  <td
                    key={item.id}
                    className="p-3 border"
                  >

                    <button
                      onClick={() =>
                        removeFromCompare(item.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>

                  </td>
                ))}
              </tr>

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Compare;