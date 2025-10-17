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
import Camerule from './Calculate/Camerule';
import LUDecomposition from './Calculate/LU Decomposition';
import MatrixInversion from './Calculate/Matrix Inversion';
import GaussElimination from './Calculate/Gauss Elimination';
import GaussJordan from './Calculate/Gauss Jordan';
import GaussSeidel from './Calculate/Guass Seidel';
import Jacobi from './Calculate/Jacobi';
import ConjugateGradient from './Calculate/Conjugate Gradient';
import LinearRegression from './Calculate/Linear Regression';
import PolynomialRegression from './Calculate/Polynomial Regression';
import MultipleLinearRegression from './Calculate/Multiple Linear Regression';



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
          <Route path="camerule" element={<Camerule />} />
          <Route path="gausselimination" element={<GaussElimination />} />
          <Route path="gaussjordan" element={<GaussJordan />} />
          <Route path="ludecomposition" element={<LUDecomposition />} />
          <Route path="matrixinversion" element={<MatrixInversion />} />
          <Route path="gaussseidel" element={<GaussSeidel />} />
          <Route path="jacobi" element={<Jacobi />} />
          <Route path="conjugategradient" element={<ConjugateGradient />} />
          <Route path="linear-regression" element={<LinearRegression />} />
          <Route path="polynomial-regression" element={<PolynomialRegression />} />
          <Route path="multiple-linear-regression" element={<MultipleLinearRegression />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
