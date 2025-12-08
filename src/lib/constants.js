// Application-wide constants
// This file contains magic numbers and configuration values used throughout the app

// Timing constants (in milliseconds)
export const TIMING = {
  HERO_SLIDESHOW_INTERVAL: 3000, // 3 seconds per slide
  ORDER_PROCESSING_TIMEOUT: 30000, // 30 seconds timeout for order API calls
  DEBOUNCE_DELAY: 300, // 300ms debounce for search/input
};

// Cart constraints
export const CART = {
  MAX_QUANTITY_PER_ITEM: 99, // Maximum quantity for a single product
  MIN_QUANTITY: 1, // Minimum quantity (below this removes item)
};

// Validation patterns
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  MIN_PHONE_LENGTH: 10,
  ZIP_REGEX: /^\d{5}(-\d{4})?$/, // US ZIP code format
  CARD_NUMBER_REGEX: /^\d{13,19}$/, // Credit card: 13-19 digits
  CARD_EXPIRY_REGEX: /^\d{2}\/\d{2}$/, // MM/YY format
  CARD_CVC_REGEX: /^\d{3,4}$/, // 3-4 digits
};

// API configuration
export const API = {
  DEFAULT_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second between retries
};

// UI constants
export const UI = {
  TOAST_DURATION: 3000, // 3 seconds for toast notifications
  ANIMATION_DURATION: 300, // 300ms for general animations
  LOADING_DELAY: 500, // Show loading state after 500ms
};

const constants = {
  TIMING,
  CART,
  VALIDATION,
  API,
  UI,
};

export default constants;
