// Smart image path resolver for Strapi backend
// Supports: local images, Strapi URLs, and Cloudinary URLs
// Provides seamless transition between development and production

// Helper to safely get backend URL
function getBackendUrl() {
  return (typeof window !== 'undefined' 
    ? process.env.NEXT_PUBLIC_STRAPI_URL 
    : process.env.NEXT_PUBLIC_STRAPI_URL) || '';
}

// Helper to check if we should use local images
function shouldUseLocalImages() {
  const backendUrl = getBackendUrl();
  return !backendUrl || backendUrl.includes('localhost');
}

// Product image mapping (backend filename → frontend filename)
// Maps Strapi's uploaded filenames to our clean local filenames
const IMAGE_MAP = {
  'bands_bc587303d7.jpg': '/images/products/bands.jpg',
  'thumbnail_bands_bc587303d7.jpg': '/images/products/bands.jpg',
  'dumbbell_2e78da8d38.jpg': '/images/products/dumbbell.jpg',
  'small_dumbbell_2e78da8d38.jpg': '/images/products/dumbbell.jpg',
  'thumbnail_dumbbell_2e78da8d38.jpg': '/images/products/dumbbell.jpg',
  'protein_de6b304022.webp': '/images/products/protein.webp',
  'small_protein_de6b304022.webp': '/images/products/protein.webp',
  'medium_protein_de6b304022.webp': '/images/products/protein.webp',
  'thumbnail_protein_de6b304022.webp': '/images/products/protein.webp',
  'tshirt_59a0e07089.jpeg': '/images/products/tshirt.jpeg',
  'small_tshirt_59a0e07089.jpeg': '/images/products/tshirt.jpeg',
  'medium_tshirt_59a0e07089.jpeg': '/images/products/tshirt.jpeg',
  'large_tshirt_59a0e07089.jpeg': '/images/products/tshirt.jpeg',
  'thumbnail_tshirt_59a0e07089.jpeg': '/images/products/tshirt.jpeg',
};

/**
 * Get the proper image URL based on the environment and image data format
 * @param {string|object} imageData - Image path, URL, or Strapi image object
 * @param {string} fallback - Fallback image path if image is not found
 * @returns {string} Resolved image URL
 */
export function getImageUrl(imageData, fallback = '/images/placeholder.jpg') {
  // Case 1: No image provided
  if (!imageData) return fallback;

  // Case 2: Already a full URL (Cloudinary or external CDN)
  if (typeof imageData === 'string' && imageData.startsWith('http')) {
    return imageData;
  }

  // Case 3: Strapi image object (from API response)
  if (typeof imageData === 'object' && imageData.url) {
    const strapiUrl = imageData.url;
    const filename = strapiUrl.split('/').pop();
    
    // Use local mapped image if available and in development mode
    if (shouldUseLocalImages() && IMAGE_MAP[filename]) {
      return IMAGE_MAP[filename];
    }
    
    // Use backend URL for production
    return `${getBackendUrl()}${strapiUrl}`;
  }

  // Case 4: Simple string path
  if (typeof imageData === 'string') {
    // If it starts with /, it's already a local path
    if (imageData.startsWith('/')) return imageData;
    
    // Check if it's a mapped backend filename
    if (IMAGE_MAP[imageData]) return IMAGE_MAP[imageData];
    
    // Otherwise try to construct backend URL
    return `${getBackendUrl()}/uploads/${imageData}`;
  }

  return fallback;
}

/**
 * Get thumbnail image URL with preference for Strapi thumbnail format
 * @param {string|object} imageData - Image path, URL, or Strapi image object
 * @param {string} fallback - Fallback image path if image is not found
 * @returns {string} Resolved thumbnail URL
 */
export function getThumbnailUrl(imageData, fallback = '/images/placeholder.jpg') {
  if (!imageData) return fallback;
  
  if (typeof imageData === 'object') {
    // Prefer thumbnail format if available
    if (imageData.formats?.thumbnail?.url) {
      const thumbUrl = imageData.formats.thumbnail.url;
      const filename = thumbUrl.split('/').pop();
      
      if (shouldUseLocalImages() && IMAGE_MAP[filename]) {
        return IMAGE_MAP[filename];
      }
      
      return `${getBackendUrl()}${thumbUrl}`;
    }
    
    // Fall back to main image
    return getImageUrl(imageData, fallback);
  }
  
  return getImageUrl(imageData, fallback);
}
