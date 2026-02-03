import React, { useState, createContext, useEffect } from "react";

export const ShopStatusContext = createContext();

export function ShopStatusProvider({ children }) {
  const [isOpen, setIsOpen] = useState(() => {
    const saved = localStorage.getItem("shopIsOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("shopIsOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleShopStatus = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ShopStatusContext.Provider value={{ isOpen, toggleShopStatus }}>
      {children}
    </ShopStatusContext.Provider>
  );
}
