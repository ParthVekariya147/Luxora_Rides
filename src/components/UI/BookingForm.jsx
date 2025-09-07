import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { toast } from "react-hot-toast";
import { createBooking } from "../../api"; // tamaro API call
import "../../styles/booking-form.css";

// Helper function to combine date and time into an ISO string
const combineDateTime = (date, time) => {
  if (!date || !time) return null;
  return new Date(`${date}T${time}`).toISOString();
};

const BookingForm = (carData) => {
  console.log("BookingForm.jsx / carData / 13 -------------------  ", carData);
  const [formData, setFormData] = useState({
    // Backend mate jaruri fields
    car_id: "",
    pickup_date: "",
    pickup_time: "",
    return_date: "",
    return_time: "",
    pickup_location: "",
    return_location: "",
    daily_rate: "",
    payment_method: "upi",
    // UI mate jaruri fields
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);

  // carId and dailyRate localStorage mathi load karva mate
  useEffect(() => {
    const storedCarId = localStorage.getItem("rentedCarId");
    const storedDailyRate = localStorage.getItem("rentedCarRate");
    if (storedCarId) {
      setFormData((prev) => ({
        ...prev,
        car_id: storedCarId,
        daily_rate: storedDailyRate || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Simple validation
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.pickup_date ||
      !formData.return_date
    ) {
      toast.error("⚠ Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // API ma moklva mate fakt jaruri fields j select karo
    const bookingData = {
      car_id: carData?.carData?._id,
      pickup_date: combineDateTime(formData.pickup_date, formData.pickup_time),
      return_date: combineDateTime(formData.return_date, formData.return_time),
      pickup_location: formData.pickup_location,
      return_location: formData.return_location,
      daily_rate: carData?.carData?.price_per_day,
      payment_method: formData.payment_method,
    };

    if (!bookingData.pickup_date || !bookingData.return_date) {
      toast.error("⚠ Please select both date and time for pickup and return.");
      setLoading(false);
      return;
    }

    try {
      const result = await createBooking(bookingData);

      if (result.success) {
        toast.success(result.message || "✅ Booking submitted successfully!");
        // Form reset kari do
        setFormData({
          car_id: formData.car_id,
          daily_rate: formData.daily_rate,
          pickup_date: "",
          pickup_time: "",
          return_date: "",
          return_time: "",
          pickup_location: "",
          return_location: "",
          payment_method: "upi",
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
        });
      } else {
        toast.error("❌ " + (result.message || "Failed to submit booking."));
      }
    } catch (err) {
      toast.error("❌ " + (err.message || "An unexpected error occurred."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form card shadow-lg p-4 rounded">
      <h3 className="fw-bold mb-4 text-center">Booking Information</h3>
      <Form onSubmit={submitHandler}>
        <div className="row">
          {/* User Details Inputs */}
          <FormGroup className="col-md-6 mb-3">
            <Label>First Name *</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Last Name *</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Email *</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Mobile Number</Label>
            <Input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </FormGroup>

          {/* Booking Details Inputs */}
          <FormGroup className="col-md-6 mb-3">
            <Label>Pickup Location *</Label>
            <Input
              type="text"
              name="pickup_location"
              placeholder="Pickup Location"
              value={formData.pickup_location}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Return Location *</Label>
            <Input
              type="text"
              name="return_location"
              placeholder="Destination"
              value={formData.return_location}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Pickup Date *</Label>
            <Input
              type="date"
              name="pickup_date"
              value={formData.pickup_date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Pickup Time *</Label>
            <Input
              type="time"
              name="pickup_time"
              value={formData.pickup_time}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Return Date *</Label>
            <Input
              type="date"
              name="return_date"
              value={formData.return_date}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className="col-md-6 mb-3">
            <Label>Return Time *</Label>
            <Input
              type="time"
              name="return_time"
              value={formData.return_time}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Daily Rate (₹)</Label>
            <Input
              type="number"
              name="daily_rate"
              disabled
              value={carData?.carData?.price_per_day}
              readOnly
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Payment Method</Label>
            <Input
              type="select"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            >
              <option value="upi">UPI</option>
              <option value="credit_card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="debit_card">Debit Card</option>
              <option value="wallet">Wallet</option>
            </Input>
          </FormGroup>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary px-5 py-2"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
