import React, { useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import "../../styles/booking-form.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    from: "",
    to: "",
    persons: "1 person",
    luggage: "1 luggage",
    date: "",
    time: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Simple validation example
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("⚠ Please fill in all required fields.");
      return;
    }
    setError("");
    alert("✅ Booking information submitted successfully!");
    // you can now send formData to your API/backend
  };

  return (
    <div className="booking-form card shadow-lg p-4 rounded">
      <h3 className="fw-bold mb-4 text-center">Booking Information</h3>

      <Form onSubmit={submitHandler}>
        <div className="row">
          <FormGroup className="col-md-6 mb-3">
            <Label>First Name *</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
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
              placeholder="Enter Last Name"
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
              placeholder="Enter Email"
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
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>From Address</Label>
            <Input
              type="text"
              name="from"
              placeholder="Pickup Location"
              value={formData.from}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>To Address</Label>
            <Input
              type="text"
              name="to"
              placeholder="Destination"
              value={formData.to}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>No. of Persons</Label>
            <Input
              type="select"
              name="persons"
              value={formData.persons}
              onChange={handleChange}
            >
              <option>1 Person</option>
              <option>2 Person</option>
              <option>3 Person</option>
              <option>4 Person</option>
              <option>6+ Person</option>
            </Input>
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>No. of Luggage</Label>
            <Input
              type="select"
              name="luggage"
              value={formData.luggage}
              onChange={handleChange}
            >
              <option>1 Luggage</option>
              <option>2 Luggage</option>
              <option>3 Luggage</option>
              <option>4 Luggage</option>
              <option>5+ Luggage</option>
            </Input>
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Journey Date</Label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="col-md-6 mb-3">
            <Label>Journey Time</Label>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="col-12 mb-3">
            <Label>Additional Notes</Label>
            <Input
              type="textarea"
              rows="4"
              name="notes"
              placeholder="Write any special request..."
              value={formData.notes}
              onChange={handleChange}
            />
          </FormGroup>
        </div>

        {error && <p className="text-danger small">{error}</p>}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-5 py-2">
            Submit Booking
          </button>
        </div>
      </Form>
    </div>
  );
};

export default BookingForm;
   