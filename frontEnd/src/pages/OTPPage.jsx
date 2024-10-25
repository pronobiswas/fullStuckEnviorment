import React, { useState } from "react";
import axios from "axios";

const OTPPage = () => {
  const [inputData, setInputData] = useState({
    Email: "",
    OTP: "",
  });
  const handleInputFild = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setInputData({
      ...inputData,
      [id]: value,
    });
  };
  const handleSubmit = async () => {
    const { Email, OTP } = inputData;
    try {
      console.log(Email,OTP);
      
      // =========post data on dtabase============
      await axios.post("http://localhost:3000/verifyOTP", {
        Email: Email,
        OTP: OTP,
      });
      return console.log("data save hoiche");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full bg-slate-500 pt-20">
        <h1>this is otp page</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
          quae laborum accusamus, deserunt rerum ea ut delectus unde animi nam
          vitae sequi mollitia asperiores a nulla! Corrupti esse alias aliquam.
          <div className="frombox">
            <div className="w-full">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                name="Email"
                onChange={handleInputFild}
                placeholder="Enter your email"
              />
            </div>
            <div className="w-full">
              <label htmlFor="OTP">otp</label>
              <input
                type="number"
                id="OTP"
                name="OTP"
                onChange={handleInputFild}
                placeholder="enter your otp"
              />
            </div>
            <button onClick={handleSubmit} className="px-5 py-2 bg-green-600">
              Submit
            </button>
          </div>
        </p>
      </div>
    </>
  );
};

export default OTPPage;
