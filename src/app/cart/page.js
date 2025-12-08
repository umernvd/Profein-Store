'use client'; // This directive enables client-side interactivity in Next.js

// Import required hooks and components
import { useCart } from '@/context/CartContext'; // For cart functionality
import { useToast } from '@/context/ToastContext'; // For toast notifications
import { useRouter } from 'next/navigation'; // For programmatic navigation
import Image from 'next/image'; // For optimized image loading
import Link from 'next/link'; // For client-side navigation
import { motion } from 'framer-motion';

const CartPage = () => {
  // Get the router instance for navigation
  const router = useRouter();
  
  // Get toast notification functions
  const { showSuccess, showInfo } = useToast();

  // Get cart functions and data from our cart context
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // Handle remove with toast notification
  const handleRemove = (itemId, itemName) => {
    removeFromCart(itemId);
    showSuccess(`${itemName} removed from cart`);
  };

  // Handle clear cart with toast notification
  const handleClearCart = () => {
    clearCart();
    showInfo('Cart cleared');
  };

  // If the cart is empty, show illustrated empty state
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto"
        >
          {/* Empty cart SVG illustration */}
          <svg className="w-64 h-64 mx-auto mb-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#f0fdfa" />
            <path d="M60 80h80l-8 60H68l-8-60z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            <circle cx="75" cy="155" r="8" fill="#0d9488" />
            <circle cx="125" cy="155" r="8" fill="#0d9488" />
            <path d="M50 60h100" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />
            <path d="M65 60V45a15 15 0 0130 0v15" stroke="#0d9488" strokeWidth="2" />
            <line x1="80" y1="100" x2="120" y2="100" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" />
          </svg>
          
          <h1 className="text-3xl font-bold text-teal-800 mb-4">Your Cart is Empty</h1>
          <p className="text-teal-600 mb-8">Looks like you haven't added any items yet. Start shopping to fill it up!</p>
          
          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Browse Products
            </Link>
            <Link
              href="/"
              className="inline-block border-2 border-teal-700 text-teal-800 px-8 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // If there are items in the cart, show the cart page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Shopping Cart</h1>

      {/* Grid layout with cart items on the left and order summary on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items section - takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map through each cart item */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-teal-100"
            >
              {/* Product image */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Product details */}
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-teal-800">{item.name}</h3>
                <p className="text-teal-600 text-sm">{item.category}</p>

                {/* Quantity controls and remove button */}
                <div className="mt-2 flex items-center gap-4">
                  {/* Quantity adjustment control */}
                  <div className="flex items-center border border-teal-200 rounded-md">
                    {/* Decrease quantity button */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      -
                    </button>
                    {/* Current quantity display */}
                    <span className="px-3 py-1 text-teal-800 border-x border-teal-200">
                      {item.quantity}
                    </span>
                    {/* Increase quantity button */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-teal-600 hover:text-teal-800 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove item button */}
                  <button
                    onClick={() => handleRemove(item.id, item.name)}
                    className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Price information */}
              <div className="text-right">
                <p className="text-teal-800 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-teal-600">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}

          {/* Clear cart button */}
          <button
            onClick={handleClearCart}
            className="text-orange-500 hover:text-orange-600 transition-colors mt-4 font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary section - takes 1/3 of the width on large screens */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100 h-fit">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Order Summary</h2>

          {/* Price breakdown */}
          <div className="space-y-2 mb-4">
            {/* Subtotal */}
            <div className="flex justify-between text-teal-600">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-teal-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            {/* Total */}
            <div className="border-t border-teal-100 pt-2 mt-2">
              <div className="flex justify-between text-lg font-semibold text-teal-800">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-orange-400 text-teal-900 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 