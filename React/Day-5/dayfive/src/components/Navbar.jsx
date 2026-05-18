import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <div className='bg-blue-300 flex justify-between items-center h-24 p-5'>

            <div >
                Logo
            </div>

            <div className='flex gap-5'>
                <Link className='bg-green-500 text-white p-2 hover:bg-blue-400 transition duration-700 ' to="/">Home</Link>
                <Link className='bg-green-500 text-white p-2 hover:bg-blue-400 transition duration-700' to = "/render">Rendering Process</Link>

            </div>

        </div>
    </>
  )
}

export default Navbar