'use client'; // This directive enables client-side interactivity in Next.js

// Import required hooks and components
import { useState } from 'react'; // For state management
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { useCart } from '@/context/CartContext'; // For cart functionality
import Link from 'next/link'; // For client-side navigation
import { VALIDATION } from '@/lib/constants';
// We can import the formatCurrency utility here when using it
// import { formatCurrency } from '@/utils/formatCurrency';

const CheckoutPage = () => {
  // Initialize router for navigation after checkout
  const router = useRouter();

  // Get cart data and functions from context
  const { cart, getCartTotal, clearCart, processOrder } = useCart();

  // State to store all form field values
  const [formData, setFormData] = useState({
    // Shipping Information
    shippingFirstName: '',
    shippingLastName: '',
    shippingEmail: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    // Billing Information
    sameAsShipping: true, // Default to same as shipping
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    // Payment Information
    paymentMethod: 'COD', // Default to Cash on Delivery
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  // State to track if order is being processed
  const [isProcessing, setIsProcessing] = useState(false);

  // Helper function to get autocomplete attribute for better UX
  const getAutocompleteValue = (fieldName) => {
    const autocompleteMap = {
      shippingFirstName: 'given-name',
      shippingLastName: 'family-name',
      shippingEmail: 'email',
      shippingPhone: 'tel',
      shippingAddress: 'street-address',
      shippingCity: 'address-level2',
      shippingState: 'address-level1',
      shippingZip: 'postal-code',
      billingFirstName: 'given-name',
      billingLastName: 'family-name',
      billingEmail: 'email',
      billingPhone: 'tel',
      billingAddress: 'street-address',
      billingCity: 'address-level2',
      billingState: 'address-level1',
      billingZip: 'postal-code',
      cardNumber: 'cc-number',
      cardExpiry: 'cc-exp',
      cardCvc: 'cc-csc',
    };
    return autocompleteMap[fieldName] || 'off';
  };

  // If cart is empty, show message directing user to products page
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-teal-800 mb-4">Your Cart is Empty</h1>
          <p className="text-teal-600 mb-8">Add items to your cart before proceeding to checkout.</p>
          <Link
            href="/products"
            className="inline-block bg-orange-400 text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      // For checkboxes, use the checked property, otherwise use the value
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic client-side validation using constants
    // Validate shipping email
    if (!VALIDATION.EMAIL_REGEX.test(formData.shippingEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Validate shipping phone
    if (!VALIDATION.PHONE_REGEX.test(formData.shippingPhone) || formData.shippingPhone.length < VALIDATION.MIN_PHONE_LENGTH) {
      alert(`Please enter a valid phone number (at least ${VALIDATION.MIN_PHONE_LENGTH} digits)`);
      return;
    }
    
    // Validate billing if different from shipping
    if (!formData.sameAsShipping) {
      if (!VALIDATION.EMAIL_REGEX.test(formData.billingEmail)) {
        alert('Please enter a valid billing email address');
        return;
      }
      if (!VALIDATION.PHONE_REGEX.test(formData.billingPhone) || formData.billingPhone.length < VALIDATION.MIN_PHONE_LENGTH) {
        alert(`Please enter a valid billing phone number (at least ${VALIDATION.MIN_PHONE_LENGTH} digits)`);
        return;
      }
    }
    
    // Validate ZIP code
    if (!VALIDATION.ZIP_REGEX.test(formData.shippingZip)) {
      alert('Please enter a valid ZIP code (e.g., 12345 or 12345-6789)');
      return;
    }
    
    // Validate card details if online payment selected
    if (formData.paymentMethod === 'ONLINE') {
      // Remove spaces from card number for validation
      const cardDigits = formData.cardNumber.replace(/\s/g, '');
      if (!VALIDATION.CARD_NUMBER_REGEX.test(cardDigits)) {
        alert('Please enter a valid card number (13-19 digits)');
        return;
      }
      
      // Validate expiry format (MM/YY)
      if (!VALIDATION.CARD_EXPIRY_REGEX.test(formData.cardExpiry)) {
        alert('Please enter card expiry in MM/YY format');
        return;
      }
      
      // Validate CVC
      if (!VALIDATION.CARD_CVC_REGEX.test(formData.cardCvc)) {
        alert('Please enter a valid CVC (3-4 digits)');
        return;
      }
    }
    
    setIsProcessing(true); // Set processing state to show loading UI

    try {
      // Prepare order details object for submission
      const orderDetails = {
        shipping: {
          firstName: formData.shippingFirstName,
          lastName: formData.shippingLastName,
          email: formData.shippingEmail,
          phone: formData.shippingPhone,
          address: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          zip: formData.shippingZip,
        },
        // If billing is same as shipping, use shipping details, otherwise use billing details
        billing: formData.sameAsShipping
          ? {
            firstName: formData.shippingFirstName,
            lastName: formData.shippingLastName,
            email: formData.shippingEmail,
            phone: formData.shippingPhone,
            address: formData.shippingAddress,
            city: formData.shippingCity,
            state: formData.shippingState,
            zip: formData.shippingZip,
          }
          : {
            firstName: formData.billingFirstName,
            lastName: formData.billingLastName,
            email: formData.billingEmail,
            phone: formData.billingPhone,
            address: formData.billingAddress,
            city: formData.billingCity,
            state: formData.billingState,
            zip: formData.billingZip,
          },
        paymentMethod: formData.paymentMethod,
        // Only include payment details if online payment is selected
        paymentDetails: formData.paymentMethod === 'ONLINE'
          ? {
            cardNumber: formData.cardNumber,
            cardExpiry: formData.cardExpiry,
            cardCvc: formData.cardCvc,
          }
          : null,
      };

      // STRAPI INTEGRATION: The processOrder function in CartContext.js 
      // will handle the API request to Strapi to create the order
      const result = await processOrder(orderDetails);

      if (result.success) {
        // Navigate to confirmation page if order was successful
        router.push('/checkout/confirmation');
      } else {
        throw new Error(result.error || 'Failed to process order');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false); // Reset processing state regardless of outcome
    }
  };

  // Reusable input field component for form fields
  const InputField = ({ label, name, type = 'text', required = true, value, onChange, placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-teal-800 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={getAutocompleteValue(name)}
        className="w-full px-3 py-2 border border-teal-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-black"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Checkout</h1>

      {/* Layout grid: form on the left, order summary on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout form - takes 2/3 of screen on large displays */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <h2 className="text-xl font-semibold text-teal-800 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name field */}
                <InputField
                  label="First Name"
                  name="shippingFirstName"
                  value={formData.shippingFirstName}
                  onChange={handleInputChange}
                />
                {/* Last Name field */}
                <InputField
                  label="Last Name"
                  name="shippingLastName"
                  value={formData.shippingLastName}
                  onChange={handleInputChange}
                />
                {/* Email field */}
                <InputField
                  label="Email"
                  name="shippingEmail"
                  type="email"
                  value={formData.shippingEmail}
                  onChange={handleInputChange}
                />
                {/* Phone field */}
                <InputField
                  label="Phone"
                  name="shippingPhone"
                  type="tel"
                  value={formData.shippingPhone}
                  onChange={handleInputChange}
                />
                {/* Address field - spans both columns */}
                <div className="md:col-span-2">
                  <InputField
                    label="Address"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                  />
                </div>
                {/* City field */}
                <InputField
                  label="City"
                  name="shippingCity"
                  value={formData.shippingCity}
                  onChange={handleInputChange}
                />
                {/* State field */}
                <InputField
                  label="State"
                  name="shippingState"
                  value={formData.shippingState}
                  onChange={handleInputChange}
                />
                {/* ZIP code field */}
                <InputField
                  label="ZIP Code"
                  name="shippingZip"
                  value={formData.shippingZip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Billing Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              {/* Checkbox for "Same as shipping" option */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  name="sameAsShipping"
                  checked={formData.sameAsShipping}
                  onChange={handleInputChange}
                  className="h-4 w-4 focus:ring-orange-400 border-teal-300 rounded"
                />
                <label htmlFor="sameAsShipping" className="ml-2 text-sm text-teal-800">
                  Billing address same as shipping
                </label>
              </div>

              {/* Only show billing fields if "Same as shipping" is unchecked */}
              {!formData.sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    name="billingFirstName"
                    value={formData.billingFirstName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Last Name"
                    name="billingLastName"
                    value={formData.billingLastName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Email"
                    name="billingEmail"
                    type="email"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Phone"
                    name="billingPhone"
                    type="tel"
                    value={formData.billingPhone}
                    onChange={handleInputChange}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Address"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <InputField
                    label="City"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="State"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="ZIP Code"
                    name="billingZip"
                    value={formData.billingZip}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <h2 className="text-xl font-semibold text-teal-800 mb-4">Payment Method</h2>
              <div className="space-y-4">
                {/* Cash on Delivery option */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleInputChange}
                    className="h-4 w-4 focus:ring-orange-400 border-teal-300"
                  />
                  <label htmlFor="cod" className="text-teal-800">
                    Cash on Delivery (COD)
                  </label>
                </div>
                {/* Online Payment option */}
                <div className="flex items-center space-x-4">
                  <input
                    type="radio"
                    id="online"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === 'ONLINE'}
                    onChange={handleInputChange}
                    className="h-4 w-4 focus:ring-orange-400 border-teal-300"
                  />
                  <label htmlFor="online" className="text-teal-800">
                    Online Payment (Credit/Debit Card)
                  </label>
                </div>
              </div>
            </div>

            {/* Card Information - Only shown if Online Payment is selected */}
            {formData.paymentMethod === 'ONLINE' && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
                <h2 className="text-xl font-semibold text-teal-800 mb-4">Card Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card Number field */}
                  <div className="md:col-span-2">
                    <InputField
                      label="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  {/* Expiry Date field */}
                  <InputField
                    label="Expiry Date"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={formData.cardExpiry}
                    onChange={handleInputChange}
                  />
                  {/* CVC field */}
                  <InputField
                    label="CVC"
                    name="cardCvc"
                    placeholder="123"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full bg-orange-400 text-teal-900 py-3 rounded-lg font-semibold hover:bg-orange-500 transition duration-300 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            >
              {isProcessing ? 'Processing...' : `Place Order (${formData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Pay Now'})`}
            </button>
          </form>
        </div>

        {/* Order Summary Section - takes 1/3 of screen on large displays */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100 h-fit">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Order Summary</h2>
          <div className="space-y-4 mb-4">
            {/* List each cart item with its price */}
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-teal-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-teal-800 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            {/* Subtotal, shipping, and total calculation */}
            <div className="border-t border-teal-100 pt-4">
              <div className="flex justify-between text-teal-600">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-teal-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-teal-800 mt-4">
                <span>Total</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 