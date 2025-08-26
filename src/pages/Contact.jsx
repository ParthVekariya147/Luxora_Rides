import React, { useState } from "react";

const socialLinks = [
  {
    url: "https://www.facebook.com/",
    icon: "📘",
    name: "Facebook",
  },
  {
    url: "https://www.instagram.com/",
    icon: "📷",
    name: "Instagram",
  },
  {
    url: "https://github.com/",
    icon: "🐙",
    name: "GitHub",
  },
  {
    url: "https://www.linkedin.com/",
    icon: "💼",
    name: "LinkedIn",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: sessionStorage.getItem("userEmail") || "", // auto-fill email here
    phone: "",
    subject: "",
    message: "",
    contact_type: "general",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "billing", label: "Billing Question" },
    { value: "feedback", label: "Feedback" },
  ];

  const isLoggedIn = () => {
    const authToken = sessionStorage.getItem("authToken");
    const tokenExpiry = sessionStorage.getItem("tokenExpiry");

    // Check that both values exist
    if (!authToken || !tokenExpiry) return false;

    // Check that the expiry is in the future
    return Date.now() < Number(tokenExpiry);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      errors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:5000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          contact_type: formData.contact_type,
        }),
      });

      // Check login before allowing submit
      if (!isLoggedIn()) {
        setSubmitStatus({
          type: "error",
          message: "Please login to send a message.",
        });
        return;
      }

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Your message has been sent successfully!",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          contact_type: "general",
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus({
          type: "error",
          message:
            errorData.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50 animate-float animation-delay-2000"></div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Left side - Welcome section */}
          <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-12 flex flex-col justify-center items-center text-center">
            {/* Car icon with glow */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-50 scale-110"></div>
              <div className="relative bg-blue-500/30 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
                <div className="w-16 h-16 text-white text-6xl flex items-center justify-center">
                  🚗
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Get In Touch With Luxora
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Contact us for premium car rental experience and exceptional
              service
            </p>

            {/* Contact quick info */}
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center space-x-4 text-white/80">
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="text-xl">📞</span>
                </div>
                <span>+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-4 text-white/80">
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="text-xl">📧</span>
                </div>
                <span>luxora.rides@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 text-white/80">
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="text-xl">📍</span>
                </div>
                <span>Surat, Gujarat</span>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
              <p className="text-white/70">
                Send us a message and we'll get back to you soon
              </p>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-xl mb-6 backdrop-blur-sm border ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 text-green-100 border-green-400/30"
                    : "bg-red-500/20 text-red-100 border-red-400/30"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="space-y-6" onSubmit={handleSubmit}>
              {/* Name field */}
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">
                    👤
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                      errors.name
                        ? "border-red-400/50 bg-red-500/10"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-300 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Email and Phone in grid */}
              <div className="grid md:grid-cols-1 gap-4">
                <div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">
                      📧
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                        errors.email
                          ? "border-red-400/50 bg-red-500/10"
                          : "border-white/30 hover:border-white/50"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-300 text-sm mt-2">{errors.email}</p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">
                      📞
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                      className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                        errors.phone
                          ? "border-red-400/50 bg-red-500/10"
                          : "border-white/30 hover:border-white/50"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-300 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Subject field */}
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">
                    🏷️
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ${
                      errors.subject
                        ? "border-red-400/50 bg-red-500/10"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  />
                </div>
                {errors.subject && (
                  <p className="text-red-300 text-sm mt-2">{errors.subject}</p>
                )}
              </div>

              {/* Contact type dropdown */}
              <div>
                <div className="relative">
                  <select
                    name="contact_type"
                    value={formData.contact_type}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-white/50 transition-all duration-200 appearance-none"
                  >
                    {contactTypes.map((type) => (
                      <option
                        key={type.value}
                        value={type.value}
                        className="bg-purple-900 text-white"
                      >
                        {type.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 text-lg">
                    ⌄
                  </span>
                </div>
              </div>

              {/* Message field */}
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-6 text-white/60 text-lg">
                    💬
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter your message..."
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-400/50 bg-red-500/10"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="text-red-300 text-sm mt-2">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="text-lg mr-3">📤</span>
                    Send Message
                  </div>
                )}
              </button>

              {/* Social links */}
              <div className="pt-6">
                <p className="text-white/70 text-center mb-4">
                  Connect with us
                </p>
                <div className="flex justify-center space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-200 transform hover:scale-110"
                    >
                      <span className="text-xl">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Contact;
