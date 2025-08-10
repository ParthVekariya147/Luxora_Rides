import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { loginUser } from "../api/index";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Email validation regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  /**
   * Handles the login form submission.
   * Validates user input and calls the login API.
   * @param {React.FormEvent} e - The form event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // --- Validation ---
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill all login fields.");
      return;
    }
    if (!validateEmail(loginEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      // Store the data (including token) in localStorage on successful login
      const now = new Date();
      // Set token expiry to 1 hour from now
      const expiryTime = now.getTime() + 60 * 60 * 1000;
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());

      toast.success("Login Successful!");

      // Redirect to the homepage after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex">
        {/* Left Side - Welcome Section */}
        <div className="w-1/2 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-16 right-12 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-700"></div>

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21Z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Welcome Back!</h1>
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
                  className="text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
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
                  onClick={navigateToRegister}
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