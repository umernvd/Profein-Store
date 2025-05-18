'use client'; // Enable client-side features

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Simple admin dashboard with statistics
export default function AdminDashboard() {
  // States for dashboard data
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  // Recent orders for display
  const [recentOrders, setRecentOrders] = useState([]);

  // Load dashboard data on component mount
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For this demo, we'll use mock data

    // Simulate API call delay
    const timer = setTimeout(() => {
      // Demo statistics
      setStats({
        totalSales: 12589.99,
        totalOrders: 42,
        pendingOrders: 7,
        totalProducts: 24,
      });

      // Demo recent orders
      setRecentOrders([
        { id: 'ORD-7851', customer: 'John Doe', date: '2023-10-12', amount: 299.99, status: 'Delivered' },
        { id: 'ORD-7850', customer: 'Jane Smith', date: '2023-10-11', amount: 149.95, status: 'Processing' },
        { id: 'ORD-7849', customer: 'Mike Johnson', date: '2023-10-10', amount: 89.90, status: 'Pending' },
        { id: 'ORD-7848', customer: 'Sarah Williams', date: '2023-10-09', amount: 199.50, status: 'Delivered' },
        { id: 'ORD-7847', customer: 'Alex Brown', date: '2023-10-08', amount: 459.99, status: 'Delivered' },
      ]);

      setIsLoading(false);
    }, 1000);

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-xl text-teal-800">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Sales Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <p className="text-sm text-gray-500 mb-1">Total Sales</p>
          <p className="text-2xl font-bold text-teal-800">${stats.totalSales.toFixed(2)}</p>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-teal-800">{stats.totalOrders}</p>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
          <p className="text-sm text-gray-500 mb-1">Pending Orders</p>
          <p className="text-2xl font-bold text-teal-800">{stats.pendingOrders}</p>
        </div>

        {/* Total Products Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <p className="text-sm text-gray-500 mb-1">Total Products</p>
          <p className="text-2xl font-bold text-teal-800">{stats.totalProducts}</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-teal-800">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-orange-500 hover:text-orange-700"
          >
            View All Orders
          </Link>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-gray-500 font-medium">Order ID</th>
                <th className="px-4 py-2 text-left text-gray-500 font-medium">Customer</th>
                <th className="px-4 py-2 text-left text-gray-500 font-medium">Date</th>
                <th className="px-4 py-2 text-left text-gray-500 font-medium">Amount</th>
                <th className="px-4 py-2 text-left text-gray-500 font-medium">Status</th>
                <th className="px-4 py-2 text-right text-gray-500 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-teal-800 font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-700">{order.date}</td>
                  <td className="px-4 py-3 text-gray-700">${order.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-teal-600 hover:text-teal-800"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          href="/admin/products/new"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
        >
          <div className="text-orange-500 font-semibold">Add New Product</div>
          <p className="text-sm text-gray-500 mt-2">Create a new product listing</p>
        </Link>

        <Link
          href="/admin/orders?status=pending"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
        >
          <div className="text-orange-500 font-semibold">Process Pending Orders</div>
          <p className="text-sm text-gray-500 mt-2">View and update order status</p>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center"
        >
          <div className="text-orange-500 font-semibold">Store Settings</div>
          <p className="text-sm text-gray-500 mt-2">Update store configurations</p>
        </Link>
      </div>
    </div>
  );
} 