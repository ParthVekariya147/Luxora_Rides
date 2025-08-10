import React, { useState } from "react";
import { toast } from "react-hot-toast";
// Corrected import statement to use a named import
import { loginUser, signupUser } from "../api/index"; 

const LoginSignup = () => {
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(false);

  // State for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State for signup form
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
      // The loginUser function is called directly here.
      // This function uses the ClientHttp you created.
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
        // Assuming you have a signupUser function in your API client
        const data = await signupUser({
            firstName,
            lastName,
            email: signupEmail,
            password: signupPassword,
            phone,
        });

        toast.success(data.message || "Signup successful! Please log in.");
        
        // Flip back to the login form after successful signup
        setFlip(false);
        // Clear signup form fields
        setFirstName("");
        setLastName("");
        setSignupEmail("");
        setSignupPassword("");
        setPhone("");

    } catch (err) {
        toast.error(err.message || "Signup failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Animated Color Overlay for Login */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            flip ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="w-1/2 h-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden">
            {/* Decorative shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/3 right-5 w-12 h-12 bg-white/10 rounded-full"></div>

            <div className="text-center z-10 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm mx-auto">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">
                {flip ? "Hello, Friend!" : "Join Our Community"}
              </h2>
              <p className="text-lg opacity-90">
                {flip
                  ? "Enter your details and start your journey with us"
                  : "Create an account and discover amazing features"}
              </p>
            </div>
          </div>
        </div>

        {/* Animated Color Overlay for Signup */}
        <div
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            flip ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-1/2 h-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex flex-col items-center justify-center text-white p-8 relative overflow-hidden ml-auto">
            {/* Decorative shapes */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/3 left-5 w-12 h-12 bg-white/10 rounded-full"></div>

            <div className="text-center z-10 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm mx-auto">
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg opacity-90">
                Sign in to continue your journey with us
              </p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative z-10 w-full h-full flex">
          {/* Login Form */}
          <div
            className={`absolute right-0 w-1/2 h-full p-8 flex flex-col justify-center transition-all duration-700 ease-in-out ${
              flip ? "translate-x-full opacity-0" : "translate-x-0 opacity-100"
            }`}
          >
            <div className="max-w-sm mx-auto w-full">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Sign In
              </h3>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="text-right">
                  <button type="button" className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-70 disabled:scale-100"
                >
                  {loading ? "Logging in..." : "Sign In"}
                </button>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setFlip(true)}
                    className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  >
                    Sign up now
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Signup Form */}
          <div
            className={`absolute left-0 w-1/2 h-full p-6 flex flex-col justify-center transition-all duration-700 ease-in-out ${
              flip ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
            } overflow-y-auto`}
          >
            <div className="max-w-sm mx-auto w-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Create Account
              </h3>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <svg
                      className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400 group-focus-within:text-purple-500 transition-colors"
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
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm disabled:opacity-70 disabled:scale-100"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </button>

                <div className="text-center">
                  <span className="text-gray-600 text-sm">
                    Already have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFlip(false)}
                    className="text-purple-600 hover:text-purple-800 font-semibold transition-colors text-sm"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
