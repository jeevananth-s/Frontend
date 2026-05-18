import { createContext, useState, useContext, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('smartcart_compare');
    if (stored) setCompareList(JSON.parse(stored));
  }, []);

  const addToCompare = (product) => {
    if (compareList.find(p => p.id === product.id)) return false;
    
    // Limit to 3 items
    const newList = [...compareList, product].slice(-3);
    setCompareList(newList);
    localStorage.setItem('smartcart_compare', JSON.stringify(newList));
    return true;
  };

  const removeFromCompare = (productId) => {
    const newList = compareList.filter(p => p.id !== productId);
    setCompareList(newList);
    localStorage.setItem('smartcart_compare', JSON.stringify(newList));
  };
  
  const clearCompare = () => {
    setCompareList([]);
    localStorage.removeItem('smartcart_compare');
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};
