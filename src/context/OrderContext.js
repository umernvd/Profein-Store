'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage when the component mounts
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Add a new order
  const addOrder = (orderDetails) => {
    const newOrder = {
      orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(), // Generate a readable order number
      ...orderDetails,
      status: 'pending',
      orderDate: new Date().toISOString(),
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    return { success: true, orderId: newOrder.orderNumber };
  };

  // Get all orders
  const getOrders = () => orders;

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.orderNumber === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
