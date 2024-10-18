import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const BlogPage = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [inputData, setInputData] = useState({
    userName: "",
    email: "",
    userData: "",
  });
  const [mydb, setMydb] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [makeRealtime, setMakeRealtime] = useState(false);
  const [specificData, setSpecificData] = useState({});
  const [modifideValue, setModifideValue] = useState({
    modUserName: "",
    modEmail: "",
    modElog: "",
  });
  const [revertData, setRevertData] = useState(true);
  const [plusBtnState, setPlusBtnState] = useState(false);

  // ===========get method here============
  // =========fetch data from database==========
  useEffect(() => {
    async function getAllData() {
      const dataFormDatabase = await axios.get(
        "http://localhost:3000/getAllData"
      );
      setMydb(dataFormDatabase.data.data);
    }
    getAllData();
  }, [makeRealtime]);

  const handleInputFild = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setInputData({
      ...inputData,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    const { userName, email, userData } = inputData;
    try {
      await axios.post("http://localhost:3000/post", {
        userName: userName,
        email: email,
        userData: userData,
      });
    } catch (error) {
      console.log(`this is submit error ${error}`);
    }
    setMakeRealtime(!makeRealtime);
  };

  const handleDelete = async (event) => {
    setSpecificData(event);
    const result = confirm(
      `${event.userName} are you want to delete this item`
    );
    if (result) {
      let deleteapi = `http://localhost:3000/deletedata/${event._id}`;
      const deletedata = await axios.delete(deleteapi);
      console.log(deletedata);
    }
    setMakeRealtime(!makeRealtime);
  };

  const handleEdit = (item) => {
    setUserInfo(item);
    setIsOpen(true);
  };
  // modal releted funftion
  function closeModal() {
    setIsOpen(false);
  }

  const handleFocus = (e) => {
    setRevertData(false);
    console.log(revertData);
  };

  // onchangeFun=======================
  const handleModalInput = (e) => {
    const { id, value } = e.target;
    setModifideValue({
      ...modifideValue,
      [id]: value,
    });
    console.log(modifideValue);
  };

  const handleModalSubmit = async () => {
    setRevertData(true);
    try {
      const apiEndPoint = `http://localhost:3000/updatedata/${userInfo._id}`;
      const updateData = await axios.post(apiEndPoint, {
        userName: modifideValue.modUserName,
        email: modifideValue.modEmail,
        userData: modifideValue.modElog,
      });
      console.log(updateData);
    } catch (error) {
      console.log("this is update data error");
    } finally {
      closeModal();
      setMakeRealtime(!makeRealtime);
    }
  };
  const handlePlusButton = () => {
    setPlusBtnState(!plusBtnState);
  };

  // ===============rerurn the html body==========
  // ===============rerurn the html body==========
  return (
    <>
      <div className="w-full mt-5">
        {/* ========plus-button========= */}
        {!plusBtnState ? (
          <div
            onClick={handlePlusButton}
            className="addTodo rounded-full bg-green-700 fixed top-[90vh] right-1 z-50 text-4xl text-green-300"
          >
            <IoMdAddCircle />
          </div>
        ) : (
          <div
            onClick={handlePlusButton}
            className="addTodo rounded-full bg-red-700 fixed top-[90vh] right-1 z-50 text-4xl text-green-300"
          >
            <MdCancel />
          </div>
        )}
        {/* ========plus-button========= */}

        {plusBtnState ? (
          <div className="w-full px-5 rounded-2xl ">
            <h2 className="text-4xl uppercase font-bold mb-8">fill the from</h2>
            <form className="flex flex-col gap-5 ">
              <div className="flex flex-col">
                <label
                  htmlFor="userName"
                  className="text-xl font-semibold mb-2"
                >
                  User Name
                </label>
                <input
                  className="text-xl py-2"
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="enter your full name"
                  onChange={handleInputFild}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-xl font-semibold mb-2">
                  User Email
                </label>
                <input
                  className="text-xl py-2"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter your full email"
                  onChange={handleInputFild}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="userData"
                  className="text-xl font-semibold mb-2"
                >
                  write your post franqly
                </label>
                <textarea
                  className="text-xl py-2"
                  name="userData"
                  id="userData"
                  rows={6}
                  cols={33}
                  onChange={handleInputFild}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-red-500 py-2 rounded-xl text-white text-xl"
              >
                submit
              </button>
            </form>
          </div>
        ) : null}

        {/* =============displaying data=========== */}

        <div className="w-[100%] max-h-[600px]  overflow-y-scroll rounded-xl">
          <h2 className="text-2xl font-bold ">Heres The Post</h2>
          {mydb?.map((item) => (
            <>
              <div className="p-4 mb-3 bg-green-400 border border-green-500 rounded-md relative">
                <p className="text-xl font-bold">{item.userName}</p>
                <p className="mb-2 leading-3">{item.email}</p>
                <p className=" font-extralight leading-4 text-sm">
                  <b>{item.userData}</b>
                </p>
                <div className="flex justify-end mt-1 gap-3 absolute top-1 right-3">
                  <button
                    onClick={() => handleDelete(item)}
                    className="text-slate-700"
                  >
                    <MdDeleteOutline />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className=" text-slate-700"
                  >
                    <MdOutlineEdit />
                  </button>
                </div>
              </div>

              <div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <button onClick={closeModal} className="bg-red-600 w-6">
                    X
                  </button>
                  <div>I am a modal</div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col bg-red-300">
                        <label htmlFor="modUserName">User Name</label>
                        <input
                          type="text"
                          id="modUserName"
                          name="modUserName"
                          value={
                            revertData
                              ? userInfo.userName
                              : modifideValue.userName
                          }
                          className="inputStyle"
                          onFocus={handleFocus}
                          onChange={handleModalInput}
                        />
                      </div>

                      <div className="flex flex-col bg-red-300">
                        <label htmlFor="modEmail">User mail</label>
                        <input
                          type="email"
                          id="modEmail"
                          name="modEmail"
                          value={
                            revertData ? userInfo.email : modifideValue.email
                          }
                          className="inputStyle"
                          onFocus={handleFocus}
                          onChange={handleModalInput}
                        />
                      </div>

                      <div className="flex flex-col bg-red-300">
                        <label htmlFor="modBlog">User blog</label>
                        <input
                          type="text"
                          id="modBlog"
                          name="modBlog"
                          value={
                            revertData ? userInfo.userData : modifideValue.blog
                          }
                          className="inputStyle"
                          onFocus={handleFocus}
                          onChange={handleModalInput}
                        />
                      </div>
                      <button type="submit" onClick={handleModalSubmit}>
                        Change
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
