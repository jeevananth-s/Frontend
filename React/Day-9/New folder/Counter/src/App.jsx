import React, { useState } from 'react'

const App = () => {
  const [count,setCount]=useState(0)
  if(count<0) {
    alert('Negative not allowed')
  }
  
  const increase=()=> {
    setCount(count+1)
  }
  const decrease=()=> {
    setCount(count-1)
    
  }
  const advanceIncrease=()=> {
    setCount(count+5)
  }
  const advanceDecrease=()=> {
    setCount(count-5)
  }
  return (
    <>
    <div>
      <div className='flex flex-col justify-center items-center bg-green-400 h-screen'>
        <h1>Counter</h1>
        <p>{count}</p>
        <button onClick={increase}>Increase</button>
        <button onClick={decrease}>Decrease</button>
        <button onClick={advanceIncrease} className='bg-amber-100 rounded'>+5</button>
        <button onClick={advanceDecrease} className='bg-amber-100 rounded'>-5</button>
      </div>
      
    </div>

    </>
  )
}

export default App
