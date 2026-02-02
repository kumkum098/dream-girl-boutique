import { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [savedOrders, setSavedOrders] = useState([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('customerOrders');
    if (saved) {
      setSavedOrders(JSON.parse(saved));
    }
  }, []);

  const addOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      createdAt: new Date().toLocaleString(),
    };
    const updatedOrders = [...savedOrders, newOrder];
    setSavedOrders(updatedOrders);
    localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
    return newOrder;
  };

  const deleteOrder = (id) => {
    const updatedOrders = savedOrders.filter((order) => order.id !== id);
    setSavedOrders(updatedOrders);
    localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
  };

  const updateOrder = (id, updatedData) => {
    const updatedOrders = savedOrders.map((order) =>
      order.id === id ? { ...order, ...updatedData } : order
    );
    setSavedOrders(updatedOrders);
    localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
  };

  return (
    <OrderContext.Provider value={{ savedOrders, addOrder, deleteOrder, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
