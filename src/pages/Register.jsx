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

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleSignup = async (e) => {
    e.preventDefault();

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

      setFirstName("");
      setLastName("");
      setSignupEmail("");
      setSignupPassword("");
      setPhone("");

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
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex">
        
        {/* LEFT SIDE - WELCOME SECTION */}
        <div className="w-1/2 bg-gradient-to-l from-indigo-600/80 via-purple-600/80 to-blue-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
          {/* Floating Elements */}
          <div className="absolute top-8 right-8 w-3 h-3 bg-white/30 rounded-full animate-bounce"></div>
          <div className="absolute top-16 left-12 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-12 right-16 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-700"></div>

          <div className="relative z-10 text-center">
            <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-lg opacity-90 text-indigo-100 leading-relaxed">
              Create an account and discover amazing features
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:border-indigo-400"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full pl-10 pr-3 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:border-indigo-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200"
                />
              </div>

              {/* Phone */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (10 digits)"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200"
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create password (min 6 characters)"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-indigo-200"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>

              {/* Login link */}
              <div className="text-center">
                <span className="text-indigo-200">Already have an account? </span>
                <button
                  type="button"
                  onClick={navigateToLogin}
                  className="text-white hover:text-indigo-300 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;


// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// // In a real application, you would have an API function for registration
// // import { registerUser } from "../api/index";

// // Mock registerUser function for demonstration purposes
// const registerUser = async ({ username, email, password }) => {
//   console.log("Attempting to register with:", username, email, password);
//   // Simulate a network delay
//   await new Promise(resolve => setTimeout(resolve, 1500));

//   // Simulate a successful registration
//   if (email && password && username) {
//     return { success: true, message: "Registration successful!" };
//   } else {
//     // Simulate a registration failure
//     throw new Error("Registration failed. Please try again.");
//   }
// };


// const Register = () => {
//   const [loading, setLoading] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Email validation regex
//   const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   /**
//    * Handles the registration form submission.
//    * Validates user input and calls the registration API.
//    * @param {React.FormEvent} e - The form event.
//    */
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // --- Validation ---
//     if (!username || !email || !password || !confirmPassword) {
//       toast.error("Please fill all fields.");
//       return;
//     }
//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }
//     if (password.length < 6) {
//         toast.error("Password must be at least 6 characters long.");
//         return;
//     }
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await registerUser({ username, email, password });

//       toast.success("Registration Successful! Redirecting to login...");

//       // Redirect to the login page after a short delay
//       setTimeout(() => {
//         window.location.href = "/login"; // Use router navigation in a real app
//       }, 2000);

//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigateToLogin = () => {
//     window.location.href = "/login"; // Use router navigation in a real app
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       <div className="w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-10 flex flex-col md:flex-row">
//         {/* Left Side - "Join Community" Section */}
//         <div className="w-full md:w-1/2 bg-gradient-to-r from-sky-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm text-white p-12 flex flex-col justify-center items-center relative">
//            <div className="relative z-10 text-center">
//             <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm mx-auto transform -rotate-12 hover:rotate-0 transition-transform duration-300">
//                {/* --- Plus Icon --- */}
//                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
//             </div>
//             <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">Join Our Community</h1>
//             <p className="text-lg opacity-90 text-sky-100 leading-relaxed">
//               Create an account and discover amazing features
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Registration Form */}
//         <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-12 flex flex-col justify-center">
//           <div className="max-w-sm mx-auto w-full">
//             <h2 className="text-3xl font-bold text-white mb-8 text-center">
//               Create Account
//             </h2>

//             <form onSubmit={handleRegister} className="space-y-6">
//               {/* Username Input */}
//               <div className="relative group">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                    <svg className="h-5 w-5 text-sky-300 group-focus-within:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
//                 </div>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Choose a username"
//                   className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-sky-200 focus:bg-white/20 focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
//                 />
//               </div>

//               {/* Email Input */}
//               <div className="relative group">
//                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-sky-300 group-focus-within:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
//                  </div>
//                  <input
//                    type="email"
//                    value={email}
//                    onChange={(e) => setEmail(e.target.value)}
//                    placeholder="Enter your email"
//                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-sky-200 focus:bg-white/20 focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
//                  />
//               </div>

//                {/* Password Input */}
//               <div className="relative group">
//                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-sky-300 group-focus-within:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//                  </div>
//                  <input
//                    type="password"
//                    value={password}
//                    onChange={(e) => setPassword(e.target.value)}
//                    placeholder="Create a password"
//                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-sky-200 focus:bg-white/20 focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
//                  />
//               </div>

//                {/* Confirm Password Input */}
//               <div className="relative group">
//                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-sky-300 group-focus-within:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
//                  </div>
//                  <input
//                    type="password"
//                    value={confirmPassword}
//                    onChange={(e) => setConfirmPassword(e.target.value)}
//                    placeholder="Confirm your password"
//                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-sky-200 focus:bg-white/20 focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15"
//                  />
//               </div>


//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white py-4 rounded-2xl font-semibold hover:from-sky-600 hover:via-blue-600 hover:to-indigo-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-lg disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative z-10">
//                   {loading ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       <span>Creating Account...</span>
//                     </div>
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </span>
//               </button>

//               <div className="text-center">
//                 <span className="text-sky-200">Already have an account? </span>
//                 <button
//                   type="button"
//                   onClick={navigateToLogin}
//                   className="text-white hover:text-sky-300 font-semibold transition-colors duration-300 hover:underline"
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
