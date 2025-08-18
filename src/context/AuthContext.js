import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  getSecureTokenCookie,
  setSecureTokenCookie,
  removeSecureTokenCookie,
  generateAndStoreCSRFToken,
  validateCSRFToken
} from '../utils/tokenUtils';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    checkAuthStatus();
    
    // Set up an interval to check token expiration
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Check if token is about to expire and refresh it
  const checkTokenExpiration = () => {
    const token = getSecureTokenCookie();
    if (token) {
      const tokenExpiry = sessionStorage.getItem('tokenExpiry');
      if (tokenExpiry) {
        const now = new Date().getTime();
        const expiry = parseInt(tokenExpiry);
        
        // If token expires in less than 10 minutes, refresh it
        if (expiry - now < 10 * 60 * 1000 && now < expiry) {
          refreshToken();
        }
      }
    }
  };

  const refreshToken = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      // In a real app, you would call an API endpoint to refresh the token
      // For now, we'll just extend the current token's expiry
      const token = getSecureTokenCookie();
      if (token) {
        const newExpiry = new Date().getTime() + 60 * 60 * 1000; // Extend by 1 hour
        sessionStorage.setItem('tokenExpiry', newExpiry.toString());
        console.log('Token refreshed');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      toast.error('Session expired. Please log in again.');
      logout();
    } finally {
      setRefreshing(false);
    }
  };

  const checkAuthStatus = () => {
    const token = getSecureTokenCookie();
    const tokenExpiry = sessionStorage.getItem('tokenExpiry');
    
    if (token && tokenExpiry) {
      const now = new Date().getTime();
      const expiry = parseInt(tokenExpiry);
      
      // Check if token is still valid
      if (now < expiry) {
        setIsAuthenticated(true);
        // In a real app, you might fetch user data here
        setUser({ token });
      } else {
        // Token expired, logout user
        logout();
      }
    }
    setLoading(false);
  };

  const login = (token) => {
    try {
      // Use secure token storage instead of localStorage
      setSecureTokenCookie(token);
      
      setIsAuthenticated(true);
      setUser({ token });
      
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Login failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    try {
      // Clear all auth related data using secure method
      removeSecureTokenCookie();
      
      setIsAuthenticated(false);
      setUser(null);
      
      toast.success('You have been logged out successfully.');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Error during logout. Please try again.');
    } finally {
      // Redirect to login page
      window.location.href = '/login';
    }
  };

  // Generate CSRF token for form protection
  const generateCSRF = (formId) => {
    return generateAndStoreCSRFToken(formId);
  };

  // Validate CSRF token
  const validateCSRF = (formId, token) => {
    return validateCSRFToken(formId, token);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuthStatus,
    refreshing,
    generateCSRF,
    validateCSRF
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};