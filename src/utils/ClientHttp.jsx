// ClientHttp.jsx

// Import secure token utilities (imports must be at top per eslint import/first)
import { getSecureTokenCookie, removeSecureTokenCookie } from "./tokenUtils";

// તમારા API નો બેઝ URL. આને અહીં એક જ જગ્યાએ વ્યાખ્યાયિત કરેલ είναι.
const BASE_URL = "http://localhost:5000/api";

/**
 * Checks if the token is valid and not expired
 * @returns {string|null} - The token if valid, null otherwise
 */
const getValidToken = () => {
  return getSecureTokenCookie();
};

/**
 * HTTP ક્લાયન્ટ ઑબ્જેક્ટ જે વિવિધ API કોલ્સ માટે
 * પદ્ધતિઓ (methods) પૂરી પાડે છે.
 */
const ClientHttp = {
  /**
   * સામાન્ય હેડર્સ (headers) જે બધી JSON રિક્વેસ્ટ માટે જરૂરી છે.
   * આને દરેક કોલમાં અલગથી ઉમેરવા પડતા નથી.
   * @param {string} token - જો જરૂર હોય તો Auth token.
   * @param {string} csrfToken - CSRF token for form protection (optional).
   * @returns {object} - હેડર્સ ઑબ્જેક્ટ.
   */
  getHeaders: (token = null, csrfToken = null) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }
    return headers;
  },

  /**
   * GET રિક્વેસ્ટ મોકલે છે.
   * @param {string} endpoint - API નો એન્ડપોઇન્ટ (દા.ત. '/users/profile').
   * @param {string} token - Auth token (optional).
   */
  get: async (endpoint, token = null) => {
    // Use provided token or get valid token from secure storage
    const validToken = token || getValidToken();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: ClientHttp.getHeaders(validToken),
      });

      const data = await response.json();

      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        // Clear token and redirect to login
        removeSecureTokenCookie();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data.message || `GET request failed with status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error(`Error in GET request to ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * POST રિક્વેસ્ટ મોકલે છે.
   * @param {string} endpoint - API નો એન્ડપોઇન્ટ (દા.ત. '/users/login').
   * @param {object} body - રિક્વેસ્ટ બોડીમાં મોકલવાનો ડેટા.
   * @param {string} token - Auth token (optional).
   * @param {string} csrfToken - CSRF token for form protection (optional).
   */
  post: async (endpoint, body, token = null, csrfToken = null) => {
    // Use provided token or get valid token from secure storage
    const validToken = token || getValidToken();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: ClientHttp.getHeaders(validToken, csrfToken),
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        // Clear token and redirect to login
        removeSecureTokenCookie();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data.message || `POST request failed with status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error(`Error in POST request to ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * PUT રિક્વેસ્ટ મોકલે છે.
   * @param {string} endpoint - API નો એન્ડપોઇન્ટ (દા.ત. '/users/update').
   * @param {object} body - અપડેટ કરવા માટેનો ડેટા.
   * @param {string} token - Auth token (optional).
   * @param {string} csrfToken - CSRF token for form protection (optional).
   */
  put: async (endpoint, body, token = null, csrfToken = null) => {
    // Use provided token or get valid token from secure storage
    const validToken = token || getValidToken();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: ClientHttp.getHeaders(validToken, csrfToken),
        body: JSON.stringify(body),
      });

      const data = await response.json();

      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        // Clear token and redirect to login
        removeSecureTokenCookie();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }

      if (!response.ok) {
        throw new Error(
          data.message || `PUT request failed with status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      console.error(`Error in PUT request to ${endpoint}:`, error);
      throw error;
    }
  },

  /**
   * DELETE રિક્વેસ્ટ મોકલે છે.
   * @param {string} endpoint - API નો એન્ડપોઇન્ટ (દા.ત. '/users/delete').
   * @param {string} token - Auth token (optional).
   * @param {string} csrfToken - CSRF token for form protection (optional).
   */
  delete: async (endpoint, token = null, csrfToken = null) => {
    // Use provided token or get valid token from secure storage
    const validToken = token || getValidToken();

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: ClientHttp.getHeaders(validToken, csrfToken),
      });

      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        // Clear token and redirect to login
        removeSecureTokenCookie();
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
      }

      // DELETE રિક્વેસ્ટ ઘણીવાર કોઈ બોડી રિટર્ન કરતી નથી, તેથી json() ન પણ ચાલે.
      if (response.status === 204) {
        return { message: "Deleted successfully." };
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message ||
            `DELETE request failed with status: ${response.status}`
        );
      }
      return data;
    } catch (error) {
      console.error(`Error in DELETE request to ${endpoint}:`, error);
      throw error;
    }
  },
};

export default ClientHttp;
