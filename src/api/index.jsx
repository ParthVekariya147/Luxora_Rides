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
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/login' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
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