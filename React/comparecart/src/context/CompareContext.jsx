import { createContext, useState } from "react";

export const CompareContext = createContext();

const CompareProvider = ({ children }) => {

  const [compareItems, setCompareItems] = useState([]);

  const addToCompare = (product) => {

    const alreadyExists = compareItems.find(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      alert("Product already added");
      return;
    }

    if (compareItems.length >= 3) {
      alert("Only 3 products allowed");
      return;
    }

    setCompareItems([...compareItems, product]);
  };

  const removeFromCompare = (id) => {
    setCompareItems(
      compareItems.filter((item) => item.id !== id)
    );
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export default CompareProvider;