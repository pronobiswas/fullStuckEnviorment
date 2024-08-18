import React from 'react'

const BlogPage = () => {
  return (
    <>
    <div className="w-[340px] mx-auto  border-2 border-slate-600 py-10 px-3 ">
      <h2 className='text-4xl uppercase font-bold mb-8' >fill the from</h2>
      <form className='flex flex-col gap-5'>

        <div className='flex flex-col'>
          <label htmlFor="userName" className='text-xl font-semibold mb-2' >User Name</label>
          <input className='text-xl py-2'
            type="text"
            name='userName'
            id='userName'
            placeholder='enter your full name'
           />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="email" className='text-xl font-semibold mb-2'>User Email</label>
          <input className='text-xl py-2'
            type="email"
            name='email'
            id='email'
            placeholder='enter your full email'
           />
        </div>

        <div className='flex flex-col' >
          <label htmlFor="phonenumber" className='text-xl font-semibold mb-2'>User Phonenumber</label>
          <input className='text-xl py-2 w-full'
            type="number"
            name='phonenumber'
            id='phonenumber'
            placeholder='enter your full phonenumber'
           />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="userblog" className='text-xl font-semibold mb-2'>write your post franqly</label>
          <textarea className='text-xl py-2'
          name="userblog" 
          id="userblog"
          rows={6} 
          cols={33} 
          />
        </div>
        <button className='bg-red-500 py-2 rounded-xl text-white text-xl' >submit</button>

      </form>
    </div>
    </>
  )
}

export default BlogPage
