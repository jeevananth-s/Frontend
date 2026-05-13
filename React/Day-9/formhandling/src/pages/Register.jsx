import React from 'react'

const Register = () => {
  return (
    <>
    <div>
      <form>
        <div >
          <h1 className='text-center text-4xl p-4'>Register Your Details</h1>
        </div>
        <div className='bg-gray-400 border-6 w-screen h-screen flex flex-col gap-5 justify-center items-center'>
          <input className='bg-white border-2 rounded p-0.5' type="text" placeholder='Enter e-mail id' />
          <input className='bg-white border-2 rounded p-0.5' type="tel" placeholder='Enter Mobile No.' />
          <input className='bg-white border-2 rounded p-0.5' type="password" placeholder='Create Password' />
          <input className='border-2 rounded p-0.5' type="submit"/>
        </div>
         
        
       
      </form>
    </div>
    </>
  )
}

export default Register
