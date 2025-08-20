import React, { useState } from "react";
import masterCard from "../../assets/all-images/master-card.jpg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!selectedMethod) {
      setError("⚠ Please select a payment method before continuing.");
      return;
    }
    setError("");
    alert(`✅ Payment method selected: ${selectedMethod}`);
    // send selectedMethod to backend/checkout API
  };

  return (
    <div className="payment-method card shadow-lg p-4 rounded mt-5">
      <h4 className="fw-bold mb-4 text-center">Choose Payment Method</h4>

      <div className="form-check border p-3 rounded mb-3">
        <input
          className="form-check-input"np
          type="radio"
          name="payment"
          id="bank"
          value="bank"
          checked={selectedMethod === "bank"}
          onChange={(e) => setSelectedMethod(e.target.value)}
        />
        <label className="form-check-label ms-2 fw-medium" htmlFor="bank">
          Direct Bank Transfer
        </label>
      </div>

      <div className="form-check border p-3 rounded mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="payment"
          id="cheque"
          value="cheque"
          checked={selectedMethod === "cheque"}
          onChange={(e) => setSelectedMethod(e.target.value)}
        />
        <label className="form-check-label ms-2 fw-medium" htmlFor="cheque">
          Cheque Payment
        </label>
      </div>

      <div className="form-check border p-3 rounded mb-3 d-flex align-items-center justify-content-between">
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="mastercard"
            value="mastercard"
            checked={selectedMethod === "mastercard"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <label className="form-check-label ms-2 fw-medium" htmlFor="mastercard">
            MasterCard
          </label>
        </div>
        <img src={masterCard} alt="MasterCard" className="payment-logo" />
      </div>

      <div className="form-check border p-3 rounded mb-3 d-flex align-items-center justify-content-between">
        <div>
          <input
            className="form-check-input"
            type="radio"
            name="payment"
            id="paypal"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <label className="form-check-label ms-2 fw-medium" htmlFor="paypal">
            PayPal
          </label>
        </div>
        <img src={paypal} alt="PayPal" className="payment-logo" />
      </div>

      {error && <p className="text-danger small mt-2">{error}</p>}

      <div className="text-end mt-4">
        <button
          onClick={handleSubmit}
          className="btn btn-primary px-4 py-2"
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
