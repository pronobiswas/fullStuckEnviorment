import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div id="first">
        <h1>wellcome</h1>
        <h2>hjfgj</h2>
    </div>
    <HomePage/>
    <BlogPage/>
      
    </>
  )
}

export default App
