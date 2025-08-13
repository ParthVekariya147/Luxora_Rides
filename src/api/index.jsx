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

/**
 * Register API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો register ડેટા.
 */
export const register = async (userData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/register' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/register', userData);
};

/**
 * Forgot Password API માટેનું ફંક્શન.
 * @param {object} userData - યુઝરનો email ડેટા (email).
 */
export const forgotPassword = async (userData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/forgot-password' અને ડેટા (userData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/forgot-password', userData);
};

/**
 * Verify OTP API માટેનું ફંક્શન.
 * @param {object} otpData - યુઝરનો OTP વેરિફિકેશન ડેટા (email, otp).
 */
export const verifyOTP = async (otpData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/verify-otp' અને ડેટા (otpData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/verify-otp', otpData);
};

/**
 * Reset Password API માટેનું ફંક્શન.
 * @param {object} resetData - યુઝરનો પાસવર્ડ રીસેટ ડેટા (email, token, newPassword).
 */
export const resetPassword = async (resetData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/reset-password' અને ડેટા (resetData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/reset-password', resetData);
};

/**
 * Resend OTP API માટેનું ફંક્શન.
 * @param {object} emailData - યુઝરનો email ડેટા (email).
 */
export const resendOTP = async (emailData) => {
  // અહીંથી ફક્ત એન્ડપોઇન્ટ '/users/resend-otp' અને ડેટા (emailData) મોકલો.
  // બાકીનું બધું કામ ClientHttp સંભાળી લેશે.
  return ClientHttp.post('/users/resend-otp', emailData);
};