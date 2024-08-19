import React, { useState } from 'react';
import axios from "axios";

const BlogPage = () => {

  const [inputData , setInputData]= useState({
    userName : "",
    email : "",
    userData : "",

  })

  const handleInputFild=(e)=>{
    const {id, value} = e.target;
    console.log(id, value);  
    setInputData({
      ...inputData,
      [id]:value
    })
  };
  const handleSubmit= async()=>{
    const {userName,email,userData} = inputData;
    await axios.post("http://localhost:3000/getAllData", {
      userName: userName,
      email: email,
      userData: userData,
    })
  };

  return (
    <>
    <div className="w-[340px] mx-auto  border-2 border-slate-600 py-10 px-3 rounded-2xl">
      <h2 className='text-4xl uppercase font-bold mb-8' >fill the from</h2>
      <form className='flex flex-col gap-5 ' onSubmit={(e)=>e.preventDefault()}>

        <div className='flex flex-col'>
          <label htmlFor="userName" className='text-xl font-semibold mb-2' >User Name</label>
          <input className='text-xl py-2'
            type="text"
            name='userName'
            id='userName'
            placeholder='enter your full name'
            onChange={handleInputFild}
           />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="email" className='text-xl font-semibold mb-2'>User Email</label>
          <input className='text-xl py-2'
            type="email"
            name='email'
            id='email'
            placeholder='enter your full email'
            onChange={handleInputFild}
           />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="userData" className='text-xl font-semibold mb-2'>write your post franqly</label>
          <textarea className='text-xl py-2'
          name="userData" 
          id="userData"
          rows={6} 
          cols={33} 
          onChange={handleInputFild}
          />
        </div>
        <button onClick={handleSubmit} className='bg-red-500 py-2 rounded-xl text-white text-xl' >submit</button>

      </form>
    </div>
    </>
  )
}

export default BlogPage
