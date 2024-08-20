import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-full flex items-center justify-center bg-slate-600' >
      <BlogPage/>
    </div>
      
    </>
  )
}

export default App
