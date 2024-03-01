import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function AddProduct() {
                  const [name,setname] = useState("")
                  const [price,setprice] = useState("")
                  const [category,setcategory] = useState("")
                  const [company,setcompany] = useState("")
                  const [error,seterror] = useState(false)
                
                  const navigate = useNavigate()
          
  
                  const addproduct = async ()=>{
                    console.warn(!name)
                    if(!name || !price || !category || !company){
                      seterror(true)
                      return false;
                    }
                   
                                    console.log(name,price,category,company)
                                    const user_id =JSON.parse(localStorage.getItem('user'))._id
                 console.log(user_id)
                 let data = await fetch('http://localhost:5000/add-product',{
                  method:"post",
                  body: JSON.stringify({name,price,category,company,user_id}),
                  headers:{
                                    'Content-Type':'application/json'
                  }
                 })
                 let result =  await data.json();
                 console.warn(result)
                 alert("new record created")
                 navigate("/")

} 

  return (
    <div className='ml'>
      <h1 style={{marginLeft:"50px"}} >Add product:</h1>
      <input style={{borderRadius:10 +'px'}} className='inputbox' type="text" placeholder='Enter product Name...' onChange={(e)=>{setname(e.target.value)}}/>
        {error && !name && <span className='invalid-input'>Enter valid name **</span>}
      <input style={{borderRadius:10 +'px'}} className='inputbox' type="text" placeholder='Enter product Price...'  onChange={(e)=>{setprice(e.target.value)}}/>
      {error && !price && <span className='invalid-input'>Enter valid price **</span>}

      <input style={{borderRadius:10 +'px'}} className='inputbox' type="text" placeholder='Enter product Category...'  onChange={(e)=>{setcategory(e.target.value)}}/>
      {error && !category && <span className='invalid-input'>Enter valid name **</span>}

      <input style={{borderRadius:10 +'px'}} className='inputbox' type="text" placeholder='Enter product Company...'  onChange={(e)=>{setcompany(e.target.value)}}/>
      {error && !company && <span className='invalid-input'>Enter valid name **</span>}

      <button style={{backgroundColor: "red",border:"none"}} className='addbtn' onClick={addproduct}>Add Product</button>
    </div>
  
  )
}
