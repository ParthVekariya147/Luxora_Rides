import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { forgotPassword } from "../api/index";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // Email validation regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  /**
   * Handles the forgot password form submission.
   * Validates user input and calls the forgot password API.
   * @param {React.FormEvent} e - The form event.
   */
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // --- Validation ---
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const data = await forgotPassword({ email });

      toast.success("Password reset code sent to your email!");
      
      // Redirect to verify OTP page after a short delay
      setTimeout(() => {
        window.location.href = `/verify-otp?email=${encodeURIComponent(email)}`;
      }, 1500);

    } catch (err) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
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

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
          {/* Floating Elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-16 right-12 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 left-16 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-700"></div>

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform rotate-12 hover:rotate-0 transition-transform duration-300">
              {/* Key Icon SVG */}
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Reset Your Password</h1>
            <p className="text-lg opacity-90 text-purple-100 leading-relaxed">
              Enter your email address and we'll send you a verification code to reset your password
            </p>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Forgot Password
            </h2>

            <div className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <button
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Code"
                  )}
                </span>
              </button>

              <div className="text-center space-y-4">
                <div>
                  <span className="text-purple-200">Remember your password? </span>
                  <button
                    onClick={navigateToLogin}
                    className="text-white hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign in
                  </button>
                </div>
                <div>
                  <span className="text-purple-200">Don't have an account? </span>
                  <button
                    onClick={navigateToRegister}
                    className="text-white hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign up now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;