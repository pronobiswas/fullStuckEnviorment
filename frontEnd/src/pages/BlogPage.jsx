import React, { useEffect, useState } from 'react';
import axios from "axios";



const BlogPage = () => {

  const [inputData , setInputData]= useState({
    userName : "",
    email : "",
    userData : "",

  })
  const [mydb , setMydb] =useState([]);
  const [makeRealtime , setMakeRealtime] = useState(false)

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
    await axios.post("http://localhost:3000/post", {
      userName: userName,
      email: email,
      userData: userData,
    })
    setMakeRealtime(!makeRealtime);
    // setInputData(
    //   {
    //     userName : "",
    //     email : "",
    //     userData : "",
    
    //   }
    // )
  };

  // =========fetch data from database==========
  useEffect(()=>{
    async function getAllData() {
      const dataFormDatabase = await axios.get("http://localhost:3000/getAllData")
      setMydb(dataFormDatabase.data.data)
    } 
    getAllData()
  },[makeRealtime]);
  
  // ===============rerurn the html body==========
  return (
    <>
    <div className='flex w-full justify-center items-center'>

      <div className="w-[340px]  border-2 border-slate-800 py-10 px-3 rounded-2xl">
        <h2 className='text-4xl uppercase font-bold mb-8' >fill the from</h2>
        <form className='flex flex-col gap-5 ' >

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

      {/* =============displaying data=========== */}
      <div className='w-[400px] h-[600px] bg-slate-100 px-5 py-6  overflow-y-scroll' >

        <h2 className='text-3xl ' >here the post</h2>
        {
          mydb?.map((item)=>(
            
            
            <div className='py-4'>
              {
                console.log(item)
                
              }
              <p>{item.userName}</p>
              <p>{item.email}</p>
              <p>
                Lorem ipsum dolor sit amet amet amet : <b>{item.userData}</b>
              </p>
              <div className='flex justify-center gap-8' >
                <button className='px-4 py-2 bg-red-700' >delete</button>
                <button className='px-4 py-2 bg-green-700'>edit</button>
              </div>
            </div>
          ))
        }
        
      </div>
    </div>
    </>
  )
}

export default BlogPage
