import React from 'react'

function Falseposition() {
  return (
    <div>
      <center>
        <h1 className='text-2xl'>False position</h1>
        <input type="text" placeholder='Enter function f(x)' className='border p-2 m-2 w-64' />
        <input type="text" placeholder='Enter x0' className='border p-2 m-2 w-32' />
        <input type="text" placeholder='Enter x1' className='border p-2 m-2 w-32' />
        <input type="text" placeholder='Enter tolerance' className='border p-2 m-2 w-32' />
        <br />  
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'>Calculate</button>
        <div className='mt-4'>
          <h2 className='text-xl'>Result:</h2>
          <p>Root: </p>
          <p>Iterations: </p>
        </div>
      </center>
    </div>

  )
}

export default Falseposition