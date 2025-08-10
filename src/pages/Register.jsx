import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { register } from "../api/index";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Email validation regex
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  // Phone validation regex (simple 10-digit check)
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  /**
   * Handles the signup form submission.
   * Validates user input and calls the signup API.
   * @param {React.FormEvent} e - The form event.
   */
  const handleSignup = async (e) => {
    e.preventDefault();

    // --- Validation ---
    if (!firstName || !lastName || !signupEmail || !signupPassword || !phone) {
      toast.error("Please fill all signup fields.");
      return;
    }
    if (!validateEmail(signupEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const data = await register({
        firstName,
        lastName,
        email: signupEmail,
        password: signupPassword,
        phone,
      });

      toast.success(data.message || "Signup successful! Please log in.");

      // Clear signup form fields
      setFirstName("");
      setLastName("");
      setSignupEmail("");
      setSignupPassword("");
      setPhone("");

      // Redirect to login page after successful signup
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      toast.error(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex">
        {/* Left Side - Register Form */}
        <div className="w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-indigo-300 group-focus-within:text-indigo-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:bg-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-indigo-300 group-focus-within:text-indigo-400 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:bg-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                  />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-indigo-300 group-focus-within:text-indigo-400 transition-colors duration-300"
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
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200 focus:bg-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-indigo-300 group-focus-within:text-indigo-400 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (10 digits)"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200 focus:bg-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-indigo-300 group-focus-within:text-indigo-400 transition-colors duration-300"
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
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create password (min 6 characters)"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200 focus:bg-white/20 focus:border-indigo-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creating account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </span>
              </button>

              <div className="text-center">
                <span className="text-indigo-200">Already have an account? </span>
                <button
                  type="button"
                  onClick={navigateToLogin}
                  className="text-white hover:text-indigo-300 font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-1/2 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-blue-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-16 left-12 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 right-16 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-700"></div>

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg
                className="w-16 h-16"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Join Our Community</h1>
            <p className="text-lg opacity-90 text-indigo-100 leading-relaxed">
              Create an account and discover amazing features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;