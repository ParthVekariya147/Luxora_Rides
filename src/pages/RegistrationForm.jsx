import React, { useState } from "react";
// import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form Submitted!");
  };

  return (
    <div className="container">
      <div className="title">Registration</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="Enter your name" required />
            </div>
            <div className="input-box">
              <span className="details">Username</span>
              <input type="text" placeholder="Enter your username" required />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input type="email" placeholder="Enter your email" required />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input type="tel" placeholder="Enter your number" required />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input type="password" placeholder="Enter your password" required />
            </div>
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input type="password" placeholder="Confirm your password" required />
            </div>
          </div>

          <div className="gender-details">
            <span className="gender-title">Gender</span>
            <div className="category">
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <span className={`dot one ${gender === "male" ? "active" : ""}`}></span>
                <span className="gender">Male</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                <span className={`dot two ${gender === "female" ? "active" : ""}`}></span>
                <span className="gender">Female</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  checked={gender === "other"}
                  onChange={() => setGender("other")}
                />
                <span className={`dot three ${gender === "other" ? "active" : ""}`}></span>
                <span className="gender">Prefer not to say</span>
              </label>
            </div>
          </div>

          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
