import React from "react";
import "./App.css";
import RootLayOut from "./LayOut/RootLayOut";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/signUpPage";
import Authlogin from "./pages/Authlogin";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import OTPPage from "./pages/OTPPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayOut />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signIn" element={<Authlogin />} />
          <Route path="/verifyOTP" element={<OTPPage />} />
          
          
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
