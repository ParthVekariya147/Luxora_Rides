// api/index.jsx

// ClientHttp ફાઇલને ઇમ્પોર્ટ કરો
import ClientHttp from '../utils/ClientHttp.jsx';

/**
 * Login API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો login ડેટા (email, password).
 */
export const loginUser = async (userData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/login' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/login', userData);
};




export const register = async (userData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/login' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/register', userData);
};