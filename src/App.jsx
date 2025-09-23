import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Component
import Navbar from './components/Navbar'
import Home from './components/Home'

// Calculate
import Bisection from './Calculate/Bisection'
import Graphical from './Calculate/Graphical'
import Falseposition from './Calculate/False position'
import Onepoint from './Calculate/Onepoint';
import Newtonraphson from './Calculate/Newtonraphson';
import Secant from './Calculate/Secant';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route>
          <Route path="Home" element={<Home />} />
          <Route path="bisection" element={<Bisection />} />
          <Route path="graphical" element={<Graphical />} />
          <Route path="falseposition" element={<Falseposition />} />
          <Route path="onepoint" element={<Onepoint />} />
          <Route path="newtonraphson" element={<Newtonraphson />} />
          <Route path="secant" element={<Secant />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
