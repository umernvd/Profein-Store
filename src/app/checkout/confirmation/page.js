'use client'; // This directive enables client-side interactivity in Next.js

// Import required hooks and components
import { useEffect, useState } from 'react'; // For state and lifecycle management
import Link from 'next/link'; // For client-side navigation
import Image from 'next/image'; // For optimized image loading

export default function OrderConfirmationPage() {
  // State to store the order details from localStorage 
  // (later, this will come from Strapi or another database)
  const [order, setOrder] = useState(null);

  // Load order data from localStorage on component mount
  useEffect(() => {
    // Get the last order from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      // Parse the JSON string into a JavaScript object
      setOrder(JSON.parse(lastOrder));
    }

    // STRAPI INTEGRATION - When Strapi is set up, we could fetch the order details
    // from the Strapi API instead of or in addition to localStorage:
    // 
    // const fetchOrderDetails = async (orderId) => {
    //   try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders/${orderId}?populate=*`);
    //     if (!response.ok) throw new Error('Failed to fetch order');
    //     const data = await response.json();
    //     setOrder(data.data.attributes);
    //   } catch (error) {
    //     console.error('Error fetching order:', error);
    //   }
    // };
    // 
    // // Get orderId from URL or localStorage
    // const orderId = new URLSearchParams(window.location.search).get('id');
    // if (orderId) fetchOrderDetails(orderId);
  }, []);

  // If no order is found, show a message
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-800 mb-4">No Order Found</h1>
          <p className="text-teal-600 mb-8">Please complete your purchase to view order confirmation.</p>
          <Link
            href="/products"
            className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If order is found, show the confirmation page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Order success message */}
      <div className="text-center mb-12">
        {/* Success icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-teal-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-teal-800 mb-4">Order Confirmed!</h1>
        <p className="text-teal-600 mb-2">Thank you for your purchase.</p>
        <p className="text-teal-600">
          Order ID: <span className="font-medium">{order.orderId}</span>
        </p>
      </div>

      {/* Order details card */}
      <div className="bg-white rounded-lg shadow-sm border border-teal-100 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Order Details</h2>
          <div className="space-y-6">
            {/* Shipping information section */}
            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-2">Shipping Information</h3>
              <div className="text-teal-600">
                <p>{`${order.shipping.firstName} ${order.shipping.lastName}`}</p>
                <p>{order.shipping.address}</p>
                <p>{`${order.shipping.city}, ${order.shipping.state} ${order.shipping.zip}`}</p>
                <p>{order.shipping.email}</p>
                <p>{order.shipping.phone}</p>
              </div>
            </div>

            {/* Order items section */}
            <div>
              <h3 className="text-lg font-medium text-teal-800 mb-2">Order Items</h3>
              <div className="space-y-4">
                {/* Map through each item in the order */}
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Product image */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    {/* Product details */}
                    <div className="flex-grow">
                      <h4 className="text-teal-800 font-medium">{item.name}</h4>
                      <p className="text-sm text-teal-600">Quantity: {item.quantity}</p>
                    </div>
                    {/* Price information */}
                    <div className="text-right">
                      <p className="text-teal-800 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-teal-600">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order summary section */}
            <div className="border-t border-teal-100 pt-4">
              {/* Subtotal row */}
              <div className="flex justify-between text-teal-600">
                <span>Subtotal</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
              {/* Shipping row */}
              <div className="flex justify-between text-teal-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              {/* Payment method row */}
              <div className="flex justify-between text-teal-600">
                <span>Payment Method</span>
                <span>{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</span>
              </div>
              {/* Total row */}
              <div className="flex justify-between text-lg font-semibold text-teal-800 mt-4">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue shopping button */}
      <div className="text-center mt-8">
        <Link
          href="/products"
          className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 