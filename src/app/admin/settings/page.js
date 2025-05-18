'use client'; // Enable client-side features

import { useState, useEffect } from 'react';

// Admin Settings Page
export default function AdminSettings() {
  // States for settings
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Store settings form data
  const [settings, setSettings] = useState({
    storeName: '',
    storeEmail: '',
    phoneNumber: '',
    address: '',
    shippingFee: '',
    taxRate: '',
    currency: 'USD',
    enableFeaturedProducts: false,
    enableReviews: false,
    maintenanceMode: false
  });

  // Load settings on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For this demo, we'll use some sample settings
    const fetchSettings = () => {
      // Simulate API call delay
      setTimeout(() => {
        // Sample settings data
        const sampleSettings = {
          storeName: 'Profein Gym Store',
          storeEmail: 'contact@profein.com',
          phoneNumber: '(123) 456-7890',
          address: '123 Fitness Street, Gym City, GC 12345',
          shippingFee: '15.00',
          taxRate: '7.5',
          currency: 'USD',
          enableFeaturedProducts: true,
          enableReviews: true,
          maintenanceMode: false
        };

        setSettings(sampleSettings);
        setIsLoading(false);
      }, 800);
    };

    fetchSettings();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, you would call an API here to save the settings
    setIsSaving(true);

    // Simulate API call delay
    setTimeout(() => {
      // Display success message
      setSaveMessage('Settings saved successfully!');
      setIsSaving(false);

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);

      // In a real app, you would handle errors here too
    }, 1000);
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-teal-800">Loading settings...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">Store Settings</h1>

      {/* Settings Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Basic Store Information */}
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Store Name */}
            <div>
              <label className="block text-teal-700 mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                required
              />
            </div>

            {/* Store Email */}
            <div>
              <label className="block text-teal-700 mb-2">Contact Email</label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-teal-700 mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-teal-700 mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-teal-700 mb-2">Store Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
              ></textarea>
            </div>
          </div>

          {/* Payment and Tax Settings */}
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Payment & Tax</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Shipping Fee */}
            <div>
              <label className="block text-teal-700 mb-2">Default Shipping Fee ($)</label>
              <input
                type="number"
                name="shippingFee"
                value={settings.shippingFee}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                step="0.01"
                min="0"
              />
            </div>

            {/* Tax Rate */}
            <div>
              <label className="block text-teal-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                step="0.1"
                min="0"
              />
            </div>
          </div>

          {/* Feature Toggles */}
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Store Features</h2>
          <div className="space-y-3 mb-6">
            {/* Featured Products */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableFeaturedProducts"
                name="enableFeaturedProducts"
                checked={settings.enableFeaturedProducts}
                onChange={handleInputChange}
                className="h-4 w-4 text-teal-600 border-teal-300 rounded text-black"
              />
              <label htmlFor="enableFeaturedProducts" className="ml-2 text-teal-700">
                Enable Featured Products on Homepage
              </label>
            </div>

            {/* Product Reviews */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableReviews"
                name="enableReviews"
                checked={settings.enableReviews}
                onChange={handleInputChange}
                className="h-4 w-4 text-teal-600 border-teal-300 rounded text-black"
              />
              <label htmlFor="enableReviews" className="ml-2 text-teal-700">
                Enable Product Reviews
              </label>
            </div>

            {/* Maintenance Mode */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="maintenanceMode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
                className="h-4 w-4 text-teal-600 border-teal-300 rounded text-black"
              />
              <label htmlFor="maintenanceMode" className="ml-2 text-teal-700">
                Enable Maintenance Mode
              </label>
            </div>
          </div>

          {/* Save button */}
          <div className="flex items-center mt-6">
            <button
              type="submit"
              disabled={isSaving}
              className={`bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 ${isSaving ? 'opacity-75' : ''}`}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>

            {/* Success message */}
            {saveMessage && (
              <span className="ml-4 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                {saveMessage}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 