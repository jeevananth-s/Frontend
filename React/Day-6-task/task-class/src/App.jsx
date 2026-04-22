import React, { useState } from 'react'

const App = () => {
  const [base,setBase]=useState(false)
  const click = ()=> {
    setBase(!base)
  }
  return (
    <div className='bg-green-400 flex flex-col gap-5 justify-center items-center h-50'>
      <h1>Conditional Rendering</h1>
      <p className="bg-amber-300 rounded-full w-30 text-center">{base? <p className="bg-violet-400">Sample_True</p> :<p className="bg-red-500">Sample_False</p>}</p>
      <button onClick={click} className="bg-white rounded-full w-15">Click</button>
    </div>
  )
}

export default App
