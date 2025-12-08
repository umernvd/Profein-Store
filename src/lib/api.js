import { getImageUrl } from './imageHelper';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Fallback products when backend is unavailable
// These ensure the website always works, even without a backend
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Resistance Bands Pack',
    price: 49.99,
    description: 'Set of 5 resistance bands with different tension levels.',
    image: '/images/products/bands.jpg',
    category: 'Accessories'
  },
  {
    id: 2,
    name: 'Premium Dumbbell Set',
    price: 299.99,
    description: 'Professional grade dumbbell set with rack, perfect for home gyms.',
    image: '/images/products/dumbbell.jpg',
    category: 'Equipment'
  },
  {
    id: 3,
    name: 'Whey Protein Powder',
    price: 59.99,
    description: 'Premium whey protein powder for muscle recovery and growth.',
    image: '/images/products/protein.webp',
    category: 'Supplements'
  },
  {
    id: 4,
    name: 'Performance T-Shirt',
    price: 29.99,
    description: 'Moisture-wicking performance t-shirt for intense workouts.',
    image: '/images/products/tshirt.jpeg',
    category: 'Clothing'
  }
];

export async function fetchAPI(endpoint) {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` })
    },
  };

  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    return null;
  }
}

export async function getProducts() {
  const data = await fetchAPI('/products?populate=*');
  
  // If backend is unavailable, use fallback products
  if (!data || !data.data) {
    console.warn('Using fallback products (backend unavailable)');
    return { data: FALLBACK_PRODUCTS };
  }
  
  // Transform Strapi data to use proper image URLs
  const transformedData = data.data.map(item => {
    const attrs = item.attributes || item;
    return {
      id: item.id,
      name: attrs.name,
      price: attrs.price,
      description: attrs.description,
      image: getImageUrl(attrs.image),
      category: attrs.category?.data?.attributes?.name || attrs.category?.name || 'Uncategorized'
    };
  });
  
  return { data: transformedData };
}

export async function getCategories() {
  const categories = await fetchAPI('/categories?populate=*');
  
  if (!categories) {
    return { data: [] };
  }
  
  return categories;
} 