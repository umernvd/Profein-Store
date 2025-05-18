'use client'; // Enable client-side features

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Admin Orders Management Page
export default function AdminOrders() {
  // States for orders and UI
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  // Load orders on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For this demo, we'll use some sample orders
    const fetchOrders = () => {
      // Sample orders data
      const sampleOrders = [
        {
          id: 'ORD-7851',
          customer: 'John Doe',
          email: 'john@example.com',
          date: '2023-10-12',
          amount: 299.99,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Premium Dumbbell Set', quantity: 1, price: 299.99 }
          ]
        },
        {
          id: 'ORD-7850',
          customer: 'Jane Smith',
          email: 'jane@example.com',
          date: '2023-10-11',
          amount: 149.95,
          status: 'Processing',
          items: [
            { id: 2, name: 'Resistance Bands Pack', quantity: 3, price: 49.99 }
          ]
        },
        {
          id: 'ORD-7849',
          customer: 'Mike Johnson',
          email: 'mike@example.com',
          date: '2023-10-10',
          amount: 89.90,
          status: 'Pending',
          items: [
            { id: 3, name: 'Whey Protein Powder', quantity: 1, price: 59.99 },
            { id: 4, name: 'Performance T-Shirt', quantity: 1, price: 29.99 }
          ]
        },
        {
          id: 'ORD-7848',
          customer: 'Sarah Williams',
          email: 'sarah@example.com',
          date: '2023-10-09',
          amount: 199.50,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Premium Dumbbell Set', quantity: 1, price: 199.50 }
          ]
        },
        {
          id: 'ORD-7847',
          customer: 'Alex Brown',
          email: 'alex@example.com',
          date: '2023-10-08',
          amount: 459.99,
          status: 'Delivered',
          items: [
            { id: 1, name: 'Premium Dumbbell Set', quantity: 1, price: 299.99 },
            { id: 3, name: 'Whey Protein Powder', quantity: 2, price: 59.99 },
            { id: 4, name: 'Performance T-Shirt', quantity: 2, price: 29.99 }
          ]
        },
      ];

      // Add some more pending orders
      sampleOrders.push(
        {
          id: 'ORD-7846',
          customer: 'Emily Davis',
          email: 'emily@example.com',
          date: '2023-10-07',
          amount: 119.98,
          status: 'Pending',
          items: [
            { id: 3, name: 'Whey Protein Powder', quantity: 2, price: 59.99 }
          ]
        },
        {
          id: 'ORD-7845',
          customer: 'Tom Wilson',
          email: 'tom@example.com',
          date: '2023-10-06',
          amount: 49.99,
          status: 'Pending',
          items: [
            { id: 2, name: 'Resistance Bands Pack', quantity: 1, price: 49.99 }
          ]
        }
      );

      setOrders(sampleOrders);
      setIsLoading(false);
    };

    // Simulate API call delay
    setTimeout(fetchOrders, 1000);
  }, []);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    // In a real app, you would call an API here
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  // Filter orders based on selected status
  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status.toLowerCase() === statusFilter);

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-teal-800">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Manage Orders</h1>

      {/* Status filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <label className="block text-teal-700 mb-2">Filter by Status:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-teal-700'
              }`}
          >
            All Orders
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === 'pending' ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-800'
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === 'processing' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-800'
              }`}
          >
            Processing
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusFilter === 'delivered' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800'
              }`}
          >
            Delivered
          </button>
        </div>
      </div>

      {/* Order count summary */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-teal-500">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-teal-800">{orders.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-teal-800">
              {orders.filter(order => order.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Processing Orders</p>
            <p className="text-2xl font-bold text-teal-800">
              {orders.filter(order => order.status === 'Processing').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Delivered Orders</p>
            <p className="text-2xl font-bold text-teal-800">
              {orders.filter(order => order.status === 'Delivered').length}
            </p>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="px-4 py-2 text-left text-teal-700">Order ID</th>
              <th className="px-4 py-2 text-left text-teal-700">Customer</th>
              <th className="px-4 py-2 text-left text-teal-700">Date</th>
              <th className="px-4 py-2 text-left text-teal-700">Amount</th>
              <th className="px-4 py-2 text-left text-teal-700">Status</th>
              <th className="px-4 py-2 text-right text-teal-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-teal-600">
                  No orders found with the selected filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-teal-50">
                  <td className="px-4 py-3 text-teal-800 font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-teal-700">{order.customer}</td>
                  <td className="px-4 py-3 text-teal-700">{order.date}</td>
                  <td className="px-4 py-3 text-teal-700">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {/* Order details button */}
                    <button
                      onClick={() => {
                        alert(`Order ${order.id} Details:\n\nCustomer: ${order.customer}\nEmail: ${order.email}\nDate: ${order.date}\nStatus: ${order.status}\n\nItems:\n${order.items.map(item => `- ${item.name} x${item.quantity} ($${item.price})`).join('\n')}`);
                      }}
                      className="text-teal-600 hover:text-teal-800 mr-2"
                    >
                      View
                    </button>

                    {/* Status update dropdown */}
                    {order.status !== 'Delivered' && (
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-sm border border-teal-200 rounded p-1 text-black"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 