'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?populate=*`
        );
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const { data } = await response.json();
        
        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image?.formats?.thumbnail?.url 
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.formats.thumbnail.url}`
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image?.url}` || '/images/placeholder.jpg',
          category: item.products?.[0]?.name || 'Uncategorized'
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Products</h1>

      {loading && (
        <div className="text-center py-8">
          <p className="text-teal-600">Loading products...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-teal-100"
          >
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-orange-500 font-medium">
                {product.category}
              </span>
              <h3 className="text-lg font-semibold text-teal-800 mt-1">
                {product.name}
              </h3>
              <p className="text-teal-600 mt-2 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-teal-900 font-semibold mt-2">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-4 bg-orange-400 text-teal-900 py-2 rounded-md hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}