import React, { useEffect, useState } from 'react'

const App = () => {

  const [product,setProduct]=useState([])
  
  useEffect(()=> {
     
      const fetchData=async ()=> {
      const getData= await fetch("https://dummyjson.com/products?limit=20")
      const changeData=await getData.json()
       setProduct(changeData.products)
      }

      
      
      fetchData()
    },[])
  return (
    <>
    <h1>useEffect</h1>
    <table border={2}>
    <thead>
        <tr>
          <th>S.no</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
    </thead>
    <tbody>
          {product.map((e)=>(
            <tr key={e.i}>
                <td>{e.id}</td>
                <td>{e.title}</td>
                <td>{e.price}</td>
            </tr>
            
          ))}
      </tbody>

    </table>
  </>
  )
}

export default App


