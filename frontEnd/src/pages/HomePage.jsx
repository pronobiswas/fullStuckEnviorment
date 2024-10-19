import React from "react";
import Header from "../component/Header";
import BlogPage from "./BlogPage";
import Footer from "../component/Footer";

const HomePage = () => {
  return (
    <div className="w-full h-[100%] bg-gradient-to-b from-green-500 to-blue-500 px-5">
      <Header/>
      <BlogPage/>
      <Footer/>
    </div>
  );
};

export default HomePage;
