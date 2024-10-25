import React, { useState } from "react";
import axios from "axios";
import Authlogin from "./Authlogin";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';


const signUpPage = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    UserName: "",
    Email: "",
    TelePhone: "",
    Password: "",
  });
  const handleInputFild = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setInputData({
      ...inputData,
      [id]: value,
    });
  };
  const handleSubmit = async ()=>{
    const {UserName,Email,TelePhone,Password}=inputData;
    try {
      // =========post data on dtabase============
      await axios.post("http://localhost:3000/signup", {
        UserName: UserName,
        Email: Email,
        TelePhone: TelePhone,
        Password:Password,
      });
      
      navigate("/verifyOTP");
      return console.log("data save hoiche");
      
      
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
      <div id="SignUpPages" className="pt-[60px]">
        <div className="signUpBox w-full p-5 bg-red-400 flex flex-col items-center justify-center">
          <h2 className="text-3xl" >Wellcome to CloudAsistant</h2>
          <loginPage/>
          <div className="w-full max-w-[600px] [&>div]:p-2 [&>div]:flex [&>div]:flex-col [&>div]:border-2 [&>div]:border-cyan-400 [&>div]:mb-3 [&>div]:rounded-xl [&>div>input]:rounded-md [&>div>input]:px-2">

            <div className="UserName">
              <label htmlFor="UserName">UserName</label>
              <input 
              type="text" 
              name="UserName" 
              id="UserName" 
              onChange={handleInputFild}
              placeholder="Enter your Full Name" />
            </div>

            <div className="email">
              <label htmlFor="Email">Email : </label>
              <input 
              type="email" 
              name="Email" 
              id="Email" 
              onChange={handleInputFild}
              placeholder="Enter your Email" />
            </div>

            <div className="TelePhone">
              <label htmlFor="TelePhone">TelePhone : </label>
              <input 
              type="number" 
              name="TelePhone"
              id="TelePhone"
              onChange={handleInputFild}
              placeholder="Enter your Phone Number" />
            </div>
            <div className="Password">
              <label htmlFor="Password">Password : </label>
              <input 
              type="password" 
              id="Password"
              name="Password"
              onChange={handleInputFild}
              placeholder="Enter your passWord" />
            </div>

            <button 
            onClick={handleSubmit}
            className="bg-blue-400 px-8 py-2">submit</button>
            <div>
              <p>allredy Have an account</p>
              {/* <Link to={'/signIn'}>signin</Link> */}
            </div>

          </div>
        </div>
      </div>
      <Authlogin/>
      
      
      
    </>
  );
};

export default signUpPage;
