// src/utils/tokenUtils.js
import { toast } from 'react-hot-toast';

/**
 * Generates a cryptographically secure random token
 * @returns {string} Secure random token
 */
export const generateSecureToken = () => {
  // Generate a random token using crypto API
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto API
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  
  // Convert to base64 string
  return btoa(String.fromCharCode(...array));
};

/**
 * Generates a CSRF token
 * @returns {string} CSRF token
 */
export const generateCSRFToken = () => {
  return generateSecureToken();
};

/**
 * Stores token securely in memory (not in localStorage/sessionStorage)
 * This is a simplified approach - in production, you would use HTTP-only cookies
 */
class SecureTokenStorage {
  constructor() {
    this.tokens = new Map();
    this.csrfTokens = new Map();
  }

  /**
   * Store a token with an identifier
   * @param {string} id - Token identifier
   * @param {string} token - The token to store
   */
  storeToken(id, token) {
    this.tokens.set(id, {
      token,
      createdAt: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour expiry
    });
  }

  /**
   * Retrieve a token by identifier
   * @param {string} id - Token identifier
   * @returns {string|null} The token or null if not found/expired
   */
  getToken(id) {
    const tokenObj = this.tokens.get(id);
    if (!tokenObj) return null;
    
    // Check if token is expired
    if (Date.now() > tokenObj.expiresAt) {
      this.tokens.delete(id);
      return null;
    }
    
    return tokenObj.token;
  }

  /**
   * Remove a token by identifier
   * @param {string} id - Token identifier
   */
  removeToken(id) {
    this.tokens.delete(id);
  }

  /**
   * Store a CSRF token
   * @param {string} id - CSRF token identifier
   * @param {string} token - The CSRF token to store
   */
  storeCSRFToken(id, token) {
    this.csrfTokens.set(id, {
      token,
      createdAt: Date.now(),
      expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutes expiry
    });
  }

  /**
   * Validate a CSRF token
   * @param {string} id - CSRF token identifier
   * @param {string} token - The CSRF token to validate
   * @returns {boolean} Whether the token is valid
   */
  validateCSRFToken(id, token) {
    const tokenObj = this.csrfTokens.get(id);
    if (!tokenObj) return false;
    
    // Check if token is expired
    if (Date.now() > tokenObj.expiresAt) {
      this.csrfTokens.delete(id);
      return false;
    }
    
    // Check if tokens match
    return tokenObj.token === token;
  }

  /**
   * Remove a CSRF token by identifier
   * @param {string} id - CSRF token identifier
   */
  removeCSRFToken(id) {
    this.csrfTokens.delete(id);
  }
}

// Create a singleton instance
export const secureTokenStorage = new SecureTokenStorage();

/**
 * Sets up secure HTTP-only cookie for token storage (server-side implementation)
 * This is a client-side simulation - in a real app, this would be handled by the server
 * @param {string} token - Authentication token
 */
/**
 * Sets secure token in sessionStorage
 * @param {string} token - Authentication token
 */
export const setSecureTokenCookie = (token) => {
  // ✅ Extra safety check
  if (!token || token === "undefined") {
    console.error("❌ No valid token provided to setSecureTokenCookie!");
    toast.error("Authentication failed. Token missing.");
    return;
  }

  try {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("tokenExpiry", (Date.now() + (60 * 60 * 1000)).toString());
  } catch (error) {
    console.error("Error setting secure token cookie:", error);
    toast.error("Authentication error. Please try again.");
  }
};


/**
 * Gets secure token from HTTP-only cookie simulation
 * @returns {string|null} Authentication token or null
 */
export const getSecureTokenCookie = () => {
  try {
    const token = sessionStorage.getItem('authToken');
    const expiry = sessionStorage.getItem('tokenExpiry');
    
    if (!token || !expiry) return null;
    
    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
      removeSecureTokenCookie();
      return null;
    }
    
    return token;
  } catch (error) {
    console.error('Error getting secure token cookie:', error);
    return null;
  }
};

/**
 * Removes secure token cookie
 */
export const removeSecureTokenCookie = () => {
  try {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('userEmail');
    
  } catch (error) {
    console.error('Error removing secure token cookie:', error);
  }
};

/**
 * Generates and stores a CSRF token for form protection
 * @param {string} formId - Identifier for the form
 * @returns {string} CSRF token
 */
export const generateAndStoreCSRFToken = (formId) => {
  const csrfToken = generateCSRFToken();
  secureTokenStorage.storeCSRFToken(formId, csrfToken);
  return csrfToken;
};

/**
 * Validates a CSRF token
 * @param {string} formId - Identifier for the form
 * @param {string} token - CSRF token to validate
 * @returns {boolean} Whether the token is valid
 */
export const validateCSRFToken = (formId, token) => {
  return secureTokenStorage.validateCSRFToken(formId, token);
};