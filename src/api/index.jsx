// api/index.jsx

// ClientHttp ફાઇલને ઇમ્પોર્ટ કરો
import ClientHttp from '../utils/ClientHttp.jsx';
import { generateAndStoreCSRFToken, validateCSRFToken } from '../utils/tokenUtils';

/**
 * Login API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો login ડેટા (email, password).
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const loginUser = async (userData, csrfToken) => {
  return ClientHttp.post('/users/login', userData, null, csrfToken);
};

/**
 * Register API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો register ડેટા.
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const register = async (userData, csrfToken) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/register' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/register', userData, null, csrfToken);
};

/**
 * Forgot Password API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો email ડેટા (email).
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const forgotPassword = async (userData, csrfToken) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/forgot-password' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/forgot-password', userData, null, csrfToken);
};

/**
 * Verify OTP API માટેનું ફંક્શન.
 * @param {object} otpData - યુઝરનો OTP વેરિફિકેશન ડેટા (email, otp).
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const verifyOTP = async (otpData, csrfToken) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/verify-otp' અને ડેટા (otpData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/verify-otp', otpData, null, csrfToken);
};

/**
 * Reset Password API માટેનું ફંક્શન.
 * @param {object} resetData - યુઝરનો પાસવર્ડ રીસેટ ડેટા (email, token, newPassword).
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const resetPassword = async (resetData, csrfToken) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/reset-password' અને ડેટા (resetData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/reset-password', resetData, null, csrfToken);
};

/**
 * Resend OTP API માટેનું ફંક્શન.
 * @param {object} emailData - યુઝરનો email ડેટા (email).
 * @param {string} csrfToken - CSRF token for form protection.
 */
export const resendOTP = async (emailData, csrfToken) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/resend-otp' અને ડેટા (emailData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/resend-otp', emailData, null, csrfToken);
};

/**
 * Generate CSRF token for form protection
 * @param {string} formId - Identifier for the form
 * @returns {string} CSRF token
 */
export const generateCSRF = (formId) => {
  return generateAndStoreCSRFToken(formId);
};

/**
 * Validate CSRF token
 * @param {string} formId - Identifier for the form
 * @param {string} token - CSRF token to validate
 * @returns {boolean} Whether the token is valid
 */
export const validateCSRF = (formId, token) => {
  return validateCSRFToken(formId, token);
};

/**
 * Create Booking API function
 * @param {object} bookingData - The booking information
 * @param {string} csrfToken - CSRF token for form protection
 */
export const createBooking = async (bookingData, csrfToken) => {
  return ClientHttp.post('/bookings', bookingData, null, csrfToken);
};

/**
 * Fetch all cars (public access)
 * @returns {Promise} Promise object represents the list of cars
 */
export const listCars = async () => {
  try {
    const response = await ClientHttp.get('/cars');
    return response;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

/**
 * Fetch available cars
 * @returns {Promise} Promise object represents the list of available cars
 */
export const getAvailableCars = async () => {
  try {
    const response = await ClientHttp.get('/cars/available');
    return response;
  } catch (error) {
    console.error('Error fetching available cars:', error);
    throw error;
  }
};

/**
 * Fetch featured cars
 * @returns {Promise} Promise object represents the list of featured cars
 */
export const getFeaturedCars = async () => {
  try {
    const response = await ClientHttp.get('/cars/featured');
    return response;
  } catch (error) {
    console.error('Error fetching featured cars:', error);
    throw error;
  }
};

/**
 * Fetch cars by brand
 * @param {string} brand - The brand name
 * @returns {Promise} Promise object represents the list of cars by brand
 */
export const getCarsByBrand = async (brand) => {
  try {
    const response = await ClientHttp.get(`/cars/brand/${brand}`);
    return response;
  } catch (error) {
    console.error(`Error fetching cars by brand ${brand}:`, error);
    throw error;
  }
};

/**
 * Fetch cars by seating capacity
 * @param {number} capacity - The seating capacity
 * @returns {Promise} Promise object represents the list of cars by seating capacity
 */
export const getCarsBySeatingCapacity = async (capacity) => {
  try {
    const response = await ClientHttp.get(`/cars/seating/${capacity}`);
    return response;
  } catch (error) {
    console.error(`Error fetching cars by seating capacity ${capacity}:`, error);
    throw error;
  }
};

/**
 * Search cars by query parameters
 * @param {object} params - Search parameters
 * @returns {Promise} Promise object represents the search results
 */
export const searchCars = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await ClientHttp.get(`/cars/search?${queryString}`);
    return response;
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

/**
 * Fetch cars by price range
 * @param {object} params - Price range parameters (minPrice, maxPrice)
 * @returns {Promise} Promise object represents the list of cars within price range
 */
export const getCarsByPriceRange = async (params) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await ClientHttp.get(`/cars/price-range?${queryString}`);
    return response;
  } catch (error) {
    console.error('Error fetching cars by price range:', error);
    throw error;
  }
};

/**
 * Fetch car by ID
 * @param {string} carId - The car ID
 * @returns {Promise} Promise object represents the car details
 */
export const getCarById = async (carId) => {
  try {
    const response = await ClientHttp.get(`/cars/${carId}`);
    return response;
  } catch (error) {
    console.error(`Error fetching car by ID ${carId}:`, error);
    throw error;
  }
};

/**
 * Fetch car recommendations
 * @param {string} carId - The car ID
 * @returns {Promise} Promise object represents the recommended cars
 */
export const getCarRecommendations = async (carId) => {
  try {
    const response = await ClientHttp.get(`/cars/${carId}/recommendations`);
    return response;
  } catch (error) {
    console.error(`Error fetching car recommendations for ID ${carId}:`, error);
    throw error;
  }
};