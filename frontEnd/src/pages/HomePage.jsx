import React from "react";
import Header from "../component/Header";
import BlogPage from "./BlogPage";
import Footer from "../component/Footer";

const HomePage = () => {
  return (
    <div className="w-full h-[100%] bg-green-300 px-5">
      <Header/>
      <BlogPage/>
      <Footer/>
    </div>
  );
};

export default HomePage;
