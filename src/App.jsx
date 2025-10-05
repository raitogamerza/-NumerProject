import { useState } from 'react'
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
import CholeskyDecomposition from './Calculate/cholesky Decomposition';
import Camerule from './Calculate/Camerule';
import GaussEliminationMethod from './Calculate/Gauss Elimination Method';
import GaussJordanMethod from './Calculate/Gauss Jordan Method';
import LUDecomposition from './Calculate/LU Decomposition';
import MatrixInversion from './Calculate/Matrix Inversion';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route>
          <Route path="*" element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="bisection" element={<Bisection />} />
          <Route path="graphical" element={<Graphical />} />
          <Route path="falseposition" element={<Falseposition />} />
          <Route path="onepoint" element={<Onepoint />} />
          <Route path="newtonraphson" element={<Newtonraphson />} />
          <Route path="secant" element={<Secant />} />
          <Route path="cholesky" element={<CholeskyDecomposition />} />
          <Route path="camerule" element={<Camerule />} />
          <Route path="gausselimination" element={<GaussEliminationMethod />} />
          <Route path="gaussjordan" element={<GaussJordanMethod />} />
          <Route path="ludecomposition" element={<LUDecomposition />} />
          <Route path="matrixinversion" element={<MatrixInversion />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
