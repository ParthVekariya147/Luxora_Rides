import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { resetPassword } from "../api/index";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState(""); // Renamed 'token' to 'resetToken'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    // Get email and token from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const tokenParam = urlParams.get('token');

    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
    if (tokenParam) {
      setResetToken(tokenParam); // Updated to set 'resetToken'
    }
  }, []);

  // Password validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar
    };
  };

  const handleResetPassword = async () => {
    // --- Validation ---
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const validation = validatePassword(password);
    if (!validation.isValid) {
      toast.error("Password does not meet requirements.");
      return;
    }

    if (!email || !resetToken) { // Updated check for 'resetToken'
      toast.error("Invalid reset link. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Updated payload structure to match your requirements
      const data = await resetPassword({
        resetToken: resetToken,
        newPassword: password,
        confirmPassword: confirmPassword
      });

      toast.success("Password reset successfully!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
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

  const navigateToForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const passwordValidation = validatePassword(password);

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
              {/* Lock Reset Icon SVG */}
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Create New Password</h1>
            <p className="text-lg opacity-90 text-purple-100 leading-relaxed">
              Your new password must be different from previously used passwords
            </p>
          </div>
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Reset Password
            </h2>

            <div className="space-y-6">
              {/* New Password Field */}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors duration-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Confirm Password Field */}
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-purple-200 focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-purple-300 hover:text-white transition-colors duration-300"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showConfirmPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-white mb-2">Password Requirements:</h4>
                  {[
                    { key: 'minLength', label: 'At least 8 characters', valid: passwordValidation.minLength },
                    { key: 'hasUpperCase', label: 'One uppercase letter', valid: passwordValidation.hasUpperCase },
                    { key: 'hasLowerCase', label: 'One lowercase letter', valid: passwordValidation.hasLowerCase },
                    { key: 'hasNumbers', label: 'One number', valid: passwordValidation.hasNumbers },
                    { key: 'hasSpecialChar', label: 'One special character', valid: passwordValidation.hasSpecialChar }
                  ].map(({ key, label, valid }) => (
                    <div key={key} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${valid ? 'bg-green-400' : 'bg-red-400'}`}></div>
                      <span className={`text-xs ${valid ? 'text-green-300' : 'text-red-300'}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleResetPassword}
                disabled={loading || !passwordValidation.isValid || password !== confirmPassword}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </span>
              </button>

              <div className="text-center space-y-4">
                <div>
                  <span className="text-purple-200">Want to try again? </span>
                  <button
                    onClick={navigateToForgotPassword}
                    className="text-white hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Go back
                  </button>
                </div>
                <div>
                  <span className="text-purple-200">Remember your password? </span>
                  <button
                    onClick={navigateToLogin}
                    className="text-white hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign in
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

export default ResetPassword;