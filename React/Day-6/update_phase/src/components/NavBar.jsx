import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <div>
        <div>
        <h1>Logo</h1>
        </div>
        <div>
        <Link to ="/">Home</Link>
        <Link to="/render">RenderProcess</Link>
        </div>
    </div>
    </>
  )
}

export default NavBar
