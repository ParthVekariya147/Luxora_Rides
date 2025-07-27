import React, { useState } from "react";

const RegistrationForm = () => {
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#71b7e6] to-[#9b59b6] p-2">
      <div className="container max-w-[700px] w-full bg-white p-8 rounded-[5px] shadow-[0_5px_10px_rgba(0,0,0,0.15)]">
        <div className="title text-[25px] font-medium relative mb-6">
          Registration
          <span className="absolute left-0 -bottom-1 h-[3px] w-[30px] rounded bg-gradient-to-br from-[#71b7e6] to-[#9b59b6]" />
        </div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details flex flex-wrap justify-between mt-5 mb-3">
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Full Name</span>
                <input type="text" placeholder="Enter your name" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Username</span>
                <input type="text" placeholder="Enter your username" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Email</span>
                <input type="email" placeholder="Enter your email" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Phone Number</span>
                <input type="tel" placeholder="Enter your number" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Password</span>
                <input type="password" placeholder="Enter your password" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
              <div className="input-box mb-4 w-full sm:w-[calc(50%-10px)]">
                <span className="details block font-medium mb-1">Confirm Password</span>
                <input type="password" placeholder="Confirm your password" required className="h-[45px] w-full rounded-[5px] px-4 border border-[#ccc] border-b-2 text-base outline-none transition-all duration-300 focus:border-[#9b59b6]" />
              </div>
            </div>

            <div className="gender-details mb-6">
              <span className="gender-title text-[20px] font-medium">Gender</span>
              <div className="category flex w-[80%] mt-2 mb-2 justify-between max-[459px]:flex-col max-[459px]:gap-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="hidden"
                  />
                  <span className={`dot h-[18px] w-[18px] rounded-full mr-2 bg-[#d9d9d9] border-[5px] border-transparent transition-all duration-300 ${gender === "male" ? "bg-[#9b59b6] border-[#d9d9d9]" : ""}`}></span>
                  <span className="gender text-gray-700">Male</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="hidden"
                  />
                  <span className={`dot h-[18px] w-[18px] rounded-full mr-2 bg-[#d9d9d9] border-[5px] border-transparent transition-all duration-300 ${gender === "female" ? "bg-[#9b59b6] border-[#d9d9d9]" : ""}`}></span>
                  <span className="gender text-gray-700">Female</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === "other"}
                    onChange={() => setGender("other")}
                    className="hidden"
                  />
                  <span className={`dot h-[18px] w-[18px] rounded-full mr-2 bg-[#d9d9d9] border-[5px] border-transparent transition-all duration-300 ${gender === "other" ? "bg-[#9b59b6] border-[#d9d9d9]" : ""}`}></span>
                  <span className="gender text-gray-700">Prefer not to say</span>
                </label>
              </div>
            </div>

            <div className="button h-[45px] mt-8">
              <input
                type="submit"
                value="Register"
                className="h-full w-full rounded-[5px] border-none text-white text-[18px] font-medium tracking-wide cursor-pointer transition-all duration-300 bg-gradient-to-r from-[#71b7e6] to-[#9b59b6] hover:from-[#9b59b6] hover:to-[#71b7e6]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
