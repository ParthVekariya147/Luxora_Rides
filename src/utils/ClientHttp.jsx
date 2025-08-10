// ClientHttp.jsx

// તમારા API નો બેઝ URL. આને અહીં એક જ જગ્યાએ વ્યાખ્યાયિત કરેલ છે.
const BASE_URL = 'http://localhost:5000/api';

/**
 * HTTP ક્લાયન્ટ ઑબ્જેક્ટ જે વિવિધ API કોલ્સ માટે
 * પદ્ધતિઓ (methods) પૂરી પાડે છે.
 */
const ClientHttp = {
  /**
   * સામાન્ય હેડર્સ (headers) જે બધી JSON રિક્વેસ્ટ માટે જરૂરી છે.
   * આને દરેક કોલમાં અલગથી ઉમેરવા પડતા નથી.
   * @param {string} token - જો જરૂર હોય તો Auth token.
   * @returns {object} - હેડર્સ ઑબ્જેક્ટ.
   */
  getHeaders: (token = null) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  },

  /**
   * GET રિક્વેસ્ટ મોકલે છે.
   * @param {string} endpoint - API નો એન્ડપોઇન્ટ (દા.ત. '/users/profile').
   * @param {string} token - Auth token (optional).
   */
  get: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: ClientHttp.getHeaders(token),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `GET request failed with status: ${response.status}`);
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
   */
  post: async (endpoint, body, token = null) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: ClientHttp.getHeaders(token),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `POST request failed with status: ${response.status}`);
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
   */
  put: async (endpoint, body, token = null) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: ClientHttp.getHeaders(token),
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `PUT request failed with status: ${response.status}`);
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
   */
  delete: async (endpoint, token = null) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: ClientHttp.getHeaders(token),
      });
      // DELETE રિક્વેસ્ટ ઘણીવાર કોઈ બોડી રિટર્ન કરતી નથી, તેથી json() ન પણ ચાલે.
      if (response.status === 204) {
          return { message: 'Deleted successfully.' };
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `DELETE request failed with status: ${response.status}`);
      }
      return data;
    } catch (error) {
      console.error(`Error in DELETE request to ${endpoint}:`, error);
      throw error;
    }
  },
};

export default ClientHttp;
