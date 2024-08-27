import React, { useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



const BlogPage = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  

  const [inputData , setInputData]= useState({
    userName : "",
    email : "",
    userData : "",

  })
  const [mydb , setMydb] =useState([]);
  const [userInfo , setUserInfo]=useState({})
  const [makeRealtime , setMakeRealtime] = useState(false);
  const [specificData , setSpecificData] = useState({})
  const [modifideValue , setModifideValue] = useState({
    modUserName : "",
    modEmail : "",
    modElog : "",
  })
  const [revertData , setRevertData] = useState(true)

    // ===========get method here============
  // =========fetch data from database==========
  useEffect(()=>{
    async function getAllData() {
      const dataFormDatabase = await axios.get("http://localhost:3000/getAllData")
      setMydb(dataFormDatabase.data.data)
    } 
    getAllData()
  },[makeRealtime]);

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
    try {
      await axios.post("http://localhost:3000/post", {
        userName: userName,
        email: email,
        userData: userData,
      })
    } catch (error) {
      console.log(`this is submit error ${error}`);
      
    }
    setMakeRealtime(!makeRealtime);
    
  };

  const handleDelete = async(event)=>{
    setSpecificData(event)
    const result = confirm(
      `${event.userName} are you want to delete this item`
    )
    if (result) {
      let deleteapi = `http://localhost:3000/deletedata/${event._id}`
      const deletedata = await axios.delete(deleteapi)
      console.log(deletedata);
      
    }
    setMakeRealtime(!makeRealtime)
    
  }

  const handleEdit = (item)=>{
    setUserInfo(item)
    setIsOpen(true)
    
  }
  // modal releted funftion
  function closeModal() {
    setIsOpen(false);
  }

  const handleFocus =(e)=>{
    setRevertData(false)
    console.log(revertData);
  }

  // onchangeFun=======================
  const handleModalInput = (e)=>{
    const {id , value} = e.target
    setModifideValue({
      ...modifideValue,
      [id] :value
    })
    console.log(modifideValue);
  }

  const handleModalSubmit = async()=>{
    setRevertData(true)
    try {
      const apiEndPoint = `http://localhost:3000/updatedata/${userInfo._id}`
      const updateData = await axios.post(apiEndPoint,{
        userName : modifideValue.modUserName,
        email : modifideValue.modEmail,
        userData: modifideValue.modElog
      })
      console.log(updateData);
      
    } catch (error) {
      console.log("this is update data error");
      
    }finally{
      closeModal()
      setMakeRealtime(!makeRealtime)
    }
    
  }


  
  

  
  // ===============rerurn the html body==========
  // ===============rerurn the html body==========
  return (
    <>
    <div className='flex w-full h-[100vh] justify-center items-center gap-7'>


      <div className="w-[340px]  border-2 border-slate-400 py-10 px-5 rounded-2xl">
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

      <div className='w-[400px] h-[600px] bg-slate-100 px-5 py-6  overflow-y-scroll rounded-3xl' >

        <h2 className='text-3xl ' >here the post</h2>
        {
          mydb?.map((item)=>(
            
            <>
              <div className='py-4'>
                <p>{item.userName}</p>
                <p>{item.email}</p>
                <p>
                  Lorem ipsum dolor sit amet amet amet : <b>{item.userData}</b>
                </p>
                <div className='flex justify-center gap-8' >
                  <button onClick={()=>handleDelete(item)} className='px-4 py-2 bg-red-700' >delete</button>
                  <button onClick={()=>handleEdit(item)} className='px-4 py-2 bg-green-700'>edit</button>
                </div>
              </div>

              <div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <button onClick={closeModal} className='bg-red-600 w-6'>X</button>
                  <div>I am a modal</div>
                  <form onSubmit={(e)=>{e.preventDefault()}}>
                    <div className='flex flex-col gap-5'>
                      <div className='flex flex-col bg-red-300'>
                        <label htmlFor="modUserName">User Name</label>
                        <input type="text" id='modUserName' name='modUserName' value={revertData ? userInfo.userName : modifideValue.userName} className='inputStyle' onFocus={handleFocus} onChange={handleModalInput} />
                      </div>
                      
                      <div className='flex flex-col bg-red-300'>
                        <label htmlFor="modEmail">User mail</label>
                        <input type="email" id='modEmail' name='modEmail' value={revertData ? userInfo.email : modifideValue.email} className='inputStyle' onFocus={handleFocus} onChange={handleModalInput} />
                      </div>
                      
                      <div className='flex flex-col bg-red-300'>
                        <label htmlFor="modBlog">User blog</label>
                        <input type="text" id='modBlog' name='modBlog' value={revertData ? userInfo.userData : modifideValue.blog} className='inputStyle' onFocus={handleFocus} onChange={handleModalInput} />
                      </div>
                      <button type='submit' onClick={handleModalSubmit} >Change</button>
                    </div>
                    
                  </form>
                </Modal>
              </div>

            </>
          ))
        }
        
      </div>
    </div>
    </>
  )
}

export default BlogPage
