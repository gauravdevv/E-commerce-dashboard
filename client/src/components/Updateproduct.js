import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Updateproduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const navigate = useNavigate();
  // const [error,seterror] = useState(false)
  const params = useParams();
  // console.log(params)
  // console.log(params.id)

  const getproduct = async () => {
    let data = await fetch(`http://localhost:5000/product/${params.id}`);
    data = await data.json();

    console.log(data);
    setname(data.name);
    setprice(data.price);
    setcategory(data.category);
    setcompany(data.company);
  };

  useEffect(() => {
    getproduct();
  }, []);

  const productupdate = async () => {
    console.log(price, name, company, category);
    let data = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ price, name, company, category }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(data);
    navigate("/");
  };

  return (
    <div className="ml">
      <h1 style={{marginLeft:"30px"}}>Update product:</h1>
      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        type="text"
        value={name}
        placeholder="Enter product Name..."
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      {/* {error && !name && <span className='invalid-input'>Enter valid name **</span>} */}
      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        type="text"
        value={price}
        placeholder="Enter product Price..."
        onChange={(e) => {
          setprice(e.target.value);
        }}
      />
      {/* {error && !price && <span className='invalid-input'>Enter valid price **</span>} */}

      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        type="text"
        value={category}
        placeholder="Enter product Category..."
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />
      {/* {error && !category && <span className='invalid-input'>Enter valid name **</span>} */}

      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        type="text"
        value={company}
        placeholder="Enter product Company..."
        onChange={(e) => {
          setcompany(e.target.value);
        }}
      />
      {/* {error && !company && <span className='invalid-input'>Enter valid name **</span>} */}

      <button style={{backgroundColor: "red",border:"none"}} className="addbtn" onClick={productupdate}>
        Update Product
      </button>
    </div>
  );
}
