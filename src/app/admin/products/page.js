'use client'; // Enable client-side features

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Admin Products Management Page
export default function AdminProducts() {
  // States for products and UI
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state for new/edit product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  // Load products on component mount
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For this demo, we'll use the static products from the products page
    const fetchProducts = () => {
      // Using the same static data as in the products page
      const staticProducts = [
        {
          id: 1,
          name: 'Premium Dumbbell Set',
          price: 299.99,
          image: '/images/dumbbell-set.jpg',
          category: 'Equipment',
          description: 'Professional grade dumbbell set with rack, perfect for home gyms.',
        },
        {
          id: 2,
          name: 'Resistance Bands Pack',
          price: 49.99,
          image: '/images/resistance-bands.jpg',
          category: 'Accessories',
          description: 'Set of 5 resistance bands with different tension levels.',
        },
        {
          id: 3,
          name: 'Whey Protein Powder',
          price: 59.99,
          image: '/images/protein-powder.jpg',
          category: 'Supplements',
          description: 'Premium whey protein powder for muscle recovery and growth.',
        },
        {
          id: 4,
          name: 'Performance T-Shirt',
          price: 29.99,
          image: '/images/tshirt.jpg',
          category: 'Clothing',
          description: 'Moisture-wicking performance t-shirt for intense workouts.',
        }
      ];

      setProducts(staticProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to add a new product
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.price) {
      alert('Please fill in at least the name and price fields');
      return;
    }

    // Create a new product with a unique ID
    const newProduct = {
      id: products.length + 1, // Simple ID generation
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || '/images/placeholder.jpg', // Default image if none provided
    };

    // Add the new product to the list
    setProducts([...products, newProduct]);

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: ''
    });

    // Hide the form
    setShowForm(false);
  };

  // Function to edit an existing product
  const handleEditProduct = (e) => {
    e.preventDefault();

    // Update the product in the products array
    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image: formData.image
        };
      }
      return product;
    });

    // Update the products state
    setProducts(updatedProducts);

    // Reset form and editing state
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  // Function to start editing a product
  const startEditing = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image
    });
    setShowForm(true);
  };

  // Function to delete a product
  const handleDeleteProduct = (productId) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Remove the product from the list
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-teal-800">Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-800">Manage Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              category: '',
              image: ''
            });
            setShowForm(!showForm);
          }}
          className="bg-orange-400 text-teal-900 px-4 py-2 rounded-md hover:bg-orange-500"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {/* Product Form (for Add/Edit) */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-teal-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-teal-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-teal-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                >
                  <option value="">Select Category</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Supplements">Supplements</option>
                  <option value="Clothing">Clothing</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-teal-700 mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                  placeholder="/images/product-image.jpg"
                />
              </div>

              {/* Description (full width) */}
              <div className="md:col-span-2">
                <label className="block text-teal-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-teal-200 rounded-md text-black"
                ></textarea>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th className="px-4 py-2 text-left text-teal-700">ID</th>
              <th className="px-4 py-2 text-left text-teal-700">Image</th>
              <th className="px-4 py-2 text-left text-teal-700">Name</th>
              <th className="px-4 py-2 text-left text-teal-700">Category</th>
              <th className="px-4 py-2 text-left text-teal-700">Price</th>
              <th className="px-4 py-2 text-right text-teal-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-teal-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-6 text-center text-teal-600">
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-teal-50">
                  <td className="px-4 py-3 text-teal-800">{product.id}</td>
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-10">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-teal-800 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-teal-700">{product.category}</td>
                  <td className="px-4 py-3 text-teal-700">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => startEditing(product)}
                      className="text-teal-600 hover:text-teal-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
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