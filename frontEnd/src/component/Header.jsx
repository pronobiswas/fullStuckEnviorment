import React, { useEffect, useState } from "react";

import { FaRegCircleUser } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [asideMenu, setAsidemenu] = useState(false);
  //    ====================timer=====
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);
  const showTime =
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0") +
    ":" +
    date.getSeconds().toString().padStart(2, "0");

  const showDate =
    date.getFullYear().toString().padStart(2, "0") +
    "-" +
    date.getMonth().toString().padStart(2, "0") +
    "-" +
    date.getDay().toString().padStart(2, "0");
  //    ====================timer=====

  const handleBar = () => {
    setAsidemenu(!asideMenu);
  };
  return (
    <div>
      <header className="w-full">
        {/* ========navbar for mobile ======= */}
        <nav
          id="ForMoile"
          className="py-2 pt-5 flex items-center justify-between"
        >
          {/* =======menubar====== */}
          {asideMenu ? (
            <div
              onClick={handleBar}
              className="avatar flex text-2xl gap-2 text-green-950"
            >
              <span>
                <RxCross2 />
              </span>
            </div>
          ) : (
            <div
              onClick={handleBar}
              className="avatar flex text-2xl gap-2 text-green-950"
            >
              <span>
                <FaBars />
              </span>
            </div>
          )}
          {/* ==========cancelbtn====== */}
          {/* <div className="logo">
            <span className="text-4xl"> &lt;PB/&gt; </span>
          </div> */}

          <div className="avatar flex text-xl gap-2">
            <span>
              <IoSettingsOutline />
            </span>
            <span>
              <FaRegCircleUser />
            </span>
          </div>
        </nav>
        {/* ========navbar for mobile ======= */}

        {asideMenu ? (
          <div
            id="AsideMenu"
            className="w-[240px] h-full min-h-[100vh] p-2 absolute bg-green-500 z-40 border border-green-600 rounded-lg "
          >
            <div className="flex justify-between font-bold text-2xl text-green-950">
              <span>Today</span> <b>:</b> <span>{showDate}</span>
            </div>
            <p className="text-right">{showTime}</p>
            <ul className="border-t-2 border-green-300 pt-5">
              <li>Remainder</li>
              <li>Task</li>
              <li>Event</li>
            </ul>
          </div>
        ) : null}
        {/* ========================== */}
      </header>
    </div>
  );
};

export default Header;
