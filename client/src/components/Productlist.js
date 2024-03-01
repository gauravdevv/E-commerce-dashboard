import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import './css/style.css'

export default function Productlist() {
  const [products, setproducts] = useState([]);

  const getproducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setproducts(result);
  };

  useEffect(() => {
    getproducts();
  }, []);
  console.log(products.length);

  const deleteproduct = async (id) => {
    let data = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
    });
    let result = await data.json();

    if (result) {
      alert("record deleted");
      getproducts();
    }
  };
  const searchhandle = async (e) => {
    console.log(e.target.value);
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      console.log(result);

      if (result) {
        setproducts(result);
       
      }
    } else {
      getproducts();
    }
  };

  return (
    <>
      <h1 className="">Product List ={'>'}</h1>
      <div className="search">
        <input style={{border:"none",marginTop:"-15px"}}
          className="searchtxt"
          type="text"
          placeholder="Search Product..."
          onChange={searchhandle}
        ></input>
      </div>
      <div className="App widt">
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Company</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            { 
               
              products.map((product, index) => 
              
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.company}</td>
                    <td>
                      <Button onClick={() => deleteproduct(product._id)}>
                        Delete
                      </Button>
                      /<Link to={`/update/${product._id}`}>Edit</Link>
                    </td>
                  </tr>
          
              )
              
}
          </tbody>
        </Table>
      </div>
    </>
  );
}
