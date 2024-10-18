import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
