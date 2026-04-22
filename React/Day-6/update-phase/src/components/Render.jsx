import React, { useState } from 'react'

const Render = () => {
    const [count,setCount]=useState(0)
  return (
    <>
    <div class="bg-amber-500 p-5 h-screen flex flex-col justify-center items-center">
        <div>
            <h1>{count}</h1>
        </div>
        <div className=" flex gap-5 flex-col justify-center items-center">
            <button className="bg-blue-500 rounded-full">Increase</button>
            <button className="bg-violet-500 rounded-full">Decrease</button>
            <button className="bg-amber-900 text-white rounded-full">Reset</button>
        </div>
        

    </div>

    </>
  
  )
}

export default Render
