import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <div>
        <div>
        <h1>Logo</h1>
        </div>

        <div class="bg-green-500 flex justify-center gap-5 p-10">
            <Link to = "/">Home</Link>
            <Link to = "/render">Render</Link>

        </div>
    </div>
    </>
  )
}

export default NavBar
