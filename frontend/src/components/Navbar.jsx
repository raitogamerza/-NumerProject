import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  // dropdown: Root of equations
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const rootDropdownRef = useRef(null);

  // dropdown: Linear algebra equation (ใหม่)
  const [linearDropdownOpen, setLinearDropdownOpen] = useState(false);
  const linearDropdownRef = useRef(null);

  // dropdowns: Interpolation, Extrapolation, Integration, Differentiation
  const [interpDropdownOpen, setInterpDropdownOpen] = useState(false);
  const interpDropdownRef = useRef(null);
  const [extraDropdownOpen, setExtraDropdownOpen] = useState(false);
  const extraDropdownRef = useRef(null);
  const [integrDropdownOpen, setIntegrDropdownOpen] = useState(false);
  const integrDropdownRef = useRef(null);
  const [diffDropdownOpen, setDiffDropdownOpen] = useState(false);
  const diffDropdownRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (rootDropdownRef.current && !rootDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (linearDropdownRef.current && !linearDropdownRef.current.contains(e.target)) {
        setLinearDropdownOpen(false);
      }
      if (interpDropdownRef.current && !interpDropdownRef.current.contains(e.target)) {
        setInterpDropdownOpen(false);
      }
      if (extraDropdownRef.current && !extraDropdownRef.current.contains(e.target)) {
        setExtraDropdownOpen(false);
      }
      if (integrDropdownRef.current && !integrDropdownRef.current.contains(e.target)) {
        setIntegrDropdownOpen(false);
      }
      if (diffDropdownRef.current && !diffDropdownRef.current.contains(e.target)) {
        setDiffDropdownOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="relative max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!w700wp"
            className="h-8"
            alt="Numerical Method Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Numerical Method
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={open}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/Home"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>

            {/* Root of equations dropdown */}
            <li className="relative" ref={rootDropdownRef}>
              <button
                id="dropdownNavbarLink"
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen((v) => !v);
                  setLinearDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={dropdownOpen}
                aria-controls="dropdownNavbar"
              >
                Root of equations
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div
                id="dropdownNavbar"
                className={`${dropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 176 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li><Link to="/Graphical" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Graphical</Link></li>
                  <li><Link to="/Bisection" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Bisection</Link></li>
                  <li><Link to="/Falseposition" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">False position</Link></li>
                  <li><Link to="/Onepoint" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">One point</Link></li>
                  <li><Link to="/Newtonraphson" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newton raphson</Link></li>
                  <li><Link to="/Secant" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Secant</Link></li>
                </ul>
              </div>
            </li>

            {/* Linear algebra equation dropdown (ใหม่) */}
            <li className="relative" ref={linearDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLinearDropdownOpen((v) => !v);
                  setDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={linearDropdownOpen}
                aria-controls="dropdownLinear"
              >
                Linear algebra equation
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div
                id="dropdownLinear"
                className={`${linearDropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-56 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 220 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li><Link to="/Camerule" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cramer's Rule</Link></li>
                  <li><Link to="/MatrixInversion" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Matrix Inversion</Link></li>
                  <li><Link to="/GaussElimination" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gaussian Elimination</Link></li>
                  <li><Link to="/GaussJordan" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gauss-Jordan</Link></li>
                  <li><Link to="/LUDecomposition" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LU Decomposition</Link></li>
                  <li><Link to="/Jacobi" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Jacobi Iteration</Link></li>
                  <li><Link to="/GaussSeidel" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gauss-Seidel</Link></li>
                  <li><Link to="/ConjugateGradient" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Conjugate Gradient</Link></li>
                </ul>
              </div>
            </li>

            {/* Interpolation dropdown */}
            <li className="relative" ref={interpDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setInterpDropdownOpen((v) => !v);
                  setExtraDropdownOpen(false);
                  setIntegrDropdownOpen(false);
                  setDiffDropdownOpen(false);
                  setDropdownOpen(false);
                  setLinearDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={interpDropdownOpen}
                aria-controls="dropdownInterp"
              >
                Interpolation
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div
                id="dropdownInterp"
                className={`${interpDropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-56 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 220 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newton's Divided Difference</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Lagrange Interpolation</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Spline Interpolation</a></li>
                </ul>
              </div>
            </li>

            {/* Extrapolation dropdown */}
            <li className="relative" ref={extraDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExtraDropdownOpen((v) => !v);
                  setInterpDropdownOpen(false);
                  setIntegrDropdownOpen(false);
                  setDiffDropdownOpen(false);
                  setDropdownOpen(false);
                  setLinearDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={extraDropdownOpen}
                aria-controls="dropdownExtra"
              >
                Extrapolation
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div
                id="dropdownExtra"
                className={`${extraDropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-56 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 220 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li><Link to="/linear-regression" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Linear Regression</Link></li>
                  <li><Link to="/polynomial-regression" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Polynomial Regression</Link></li>
                  <li><Link to="/multiple-linear-regression" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Multiple Linear Regression</Link></li>
                </ul>
              </div>
            </li>

            {/* Integration dropdown */}
            <li className="relative" ref={integrDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIntegrDropdownOpen((v) => !v);
                  setInterpDropdownOpen(false);
                  setExtraDropdownOpen(false);
                  setDiffDropdownOpen(false);
                  setDropdownOpen(false);
                  setLinearDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={integrDropdownOpen}
                aria-controls="dropdownIntegr"
              >
                Integration
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div
                id="dropdownIntegr"
                className={`${integrDropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-56 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 220 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <Link to="/Trapezoidal" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Trapezoidal Rule</Link>
                  <Link to="/CompositeTrapezoidal" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Composite Trapezoidal Rule</Link>
                  <Link to="/Simpsons" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Simpson's Rule</Link>
                  <Link to="/CompositeSimpson" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Composite Simpson's Rule</Link>
                </ul>
              </div>
            </li>

            {/* Differentiation dropdown */}
            <li className="relative" ref={diffDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDiffDropdownOpen((v) => !v);
                  setInterpDropdownOpen(false);
                  setExtraDropdownOpen(false);
                  setIntegrDropdownOpen(false);
                  setDropdownOpen(false);
                  setLinearDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                aria-expanded={diffDropdownOpen}
                aria-controls="dropdownDiff"
              >
                Differentiation
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div
                id="dropdownDiff"
                className={`${diffDropdownOpen ? "block" : "hidden"} z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-56 dark:bg-gray-700 dark:divide-gray-600 md:absolute md:left-4 md:top-full md:mt-2`}
                style={{ minWidth: 220 }}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <Link to="/numerical-differentiation" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Numerical Differentiation</Link>  
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;