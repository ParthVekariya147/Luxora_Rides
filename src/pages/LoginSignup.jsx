import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../api/index";
import { useAuth } from "../context/AuthContext";
import { setSecureTokenCookie, getSecureTokenCookie } from "../utils/tokenUtils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const { login, generateCSRF: generateCSRFContext } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const authToken = getSecureTokenCookie();
    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);

  // Generate CSRF token on mount
  useEffect(() => {
    const token = generateCSRFContext("login-form");
    setCsrfToken(token);
  }, [generateCSRFContext]);

  // Email validation regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const handleLogin = async (e) => {
  e.preventDefault();

  if (!loginEmail || !loginPassword) {
    toast.error("Please fill all login fields.");
    return;
  }
  if (!validateEmail(loginEmail)) {
    toast.error("Please enter a valid email address.");
    return;
  }
  if (!csrfToken) {
    toast.error("Security token missing. Please refresh the page.");
    return;
  }

  setLoading(true);

  try {
    const res = await loginUser(
      { email: loginEmail, password: loginPassword },
      csrfToken
    );
    console.log("🔑 Login API response:", res);

    // Extract token from API response
    const token = res?.data?.token;
    if (!token) {
      toast.error("Login failed: Token missing in response");
      setLoading(false);
      return;
    }

    // Extract user email from response
    const email = res?.data?.user?.email;
    if (email) {
      sessionStorage.setItem("userEmail", email);  // Store email in sessionStorage
    }

    // Store token securely in sessionStorage or cookies (your existing logic)
    setSecureTokenCookie(token);

    // Update auth context
    login(token);

    setTimeout(() => {
      navigate("/home");
    }, 1200);
  } catch (err) {
    // Show error message but do NOT clear the input fields
    toast.error(
      err.response?.data?.message || // if your API returns error message in response.data.message
      err.message ||
      "An unexpected error occurred."
    );
  } finally {
    setLoading(false);
  }
};



  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
          <div className="absolute top-8 left-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-16 right-12 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-700"></div>

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Welcome Back To Luxora</h1>
            <p className="text-lg opacity-90 text-purple-100 leading-relaxed">
              Sign in to unlock your digital experience
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Sign In
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-purple-300 group-focus-within:text-purple-400 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
                onClick={(e) => e.preventDefault}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>

              <div className="text-center">
                <span className="text-purple-200">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-white hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign up now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
