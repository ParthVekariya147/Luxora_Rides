import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { verifyOTP, resendOTP } from "../api/index";

const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Get email from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");

    // --- Validation ---
    if (otpString.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOTP({ 
        email: email,
        otp: otpString 
      });

      toast.success("OTP verified successfully!");
      
      console.log("Full API Response:", data); // Debug log to see full response
      console.log("Response type:", typeof data); // Check data type
      
      // Handle different possible response structures
      let resetToken = null;
      
      // Case 1: Direct token field
      if (data && data.token) {
        resetToken = data.token;
        console.log("Found token in data.token");
      }
      // Case 2: Direct resetToken field
      else if (data && data.resetToken) {
        resetToken = data.resetToken;
        console.log("Found token in data.resetToken");
      }
      // Case 3: Nested data object with token
      else if (data && data.data && data.data.token) {
        resetToken = data.data.token;
        console.log("Found token in data.data.token");
      }
      // Case 4: Nested data object with resetToken
      else if (data && data.data && data.data.resetToken) {
        resetToken = data.data.resetToken;
        console.log("Found token in data.data.resetToken");
      }
      
      console.log("Final reset token:", resetToken ? "Found" : "Not found");
      
      if (resetToken) {
        console.log("Redirecting with token..."); 
        // Redirect to reset password page with both email and token
        setTimeout(() => {
          window.location.href = `/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resetToken)}`;
        }, 1500);
      } else {
        // If no token in response, show error and detailed debug info
        toast.error("Token not received. Please try again.");
        console.error("No token found in API response");
        console.error("Available fields in data:", data ? Object.keys(data) : "data is null/undefined");
        if (data && data.data) {
          console.error("Available fields in data.data:", Object.keys(data.data));
        }
      }

    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);

    try {
      const data = await resendOTP({ email });

      toast.success("New OTP sent to your email!");
      
      // Reset countdown
      setCountdown(60);
      setCanResend(false);
      
      // Clear current OTP
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

    } catch (err) {
      console.error("Resend OTP Error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setResendLoading(false);
    }
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  const navigateToForgotPassword = () => {
    window.location.href = "/forgot-password";
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
              {/* Shield Check Icon SVG */}
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Verify Your Email</h1>
            <p className="text-lg opacity-90 text-purple-100 leading-relaxed">
              We've sent a 6-digit verification code to your email address
            </p>
            {email && (
              <p className="text-sm opacity-80 text-purple-200 mt-2 break-all">
                {email}
              </p>
            )}
          </div>
        </div>

        {/* Right Side - OTP Verification Form */}
        <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Enter Verification Code
            </h2>

            <div className="space-y-6">
              {/* OTP Input Fields */}
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/[^0-9]/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl text-white text-center text-xl font-semibold focus:bg-white/20 focus:border-purple-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
                  />
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-purple-200 text-sm">
                    Resend code in <span className="font-semibold text-white">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={resendLoading}
                    className="text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300 hover:underline disabled:opacity-50"
                  >
                    {resendLoading ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.join("").length !== 6}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </span>
              </button>

              <div className="text-center space-y-4">
                <div>
                  <span className="text-purple-200">Wrong email? </span>
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

export default VerifyOTP;