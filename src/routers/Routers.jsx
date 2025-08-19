import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import LoginSignup from "../pages/LoginSignup";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={
        <ProtectedRoute>
          <CarListing />
        </ProtectedRoute>
      } />
      <Route path="/cars/:carId" element={
        <ProtectedRoute>
          <CarDetails />
        </ProtectedRoute>
      } />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginSignup />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/verify-otp' element={<VerifyOTP/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
    </Routes>
  );
};

export default Routers;
