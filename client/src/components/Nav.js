import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div><img className="logopic" alt="logo" src="https://png.pngtree.com/png-clipart/20210718/original/pngtree-gs-letter-logo-png-image_6537685.jpg"/>
      {auth?<ul className="nav-ul right">
    <li >
      <Link style={{color:"white"}} to="/">HOME</Link>
    </li>
    <li>
      <Link style={{color:"white"}} to="/add">ADD PRODUCTS</Link>
    </li>
    <li>
      <Link style={{color:"white"}} to="/update">UPDATE</Link>
    </li>

    <li>
      <Link style={{color:"white"}} to="/profile">PROFILE</Link>
    </li>
    <li >
    <Link to="/signup" onClick={logout}>LOGOUT  {auth?<span style={{color:"white"}}>Welcome [{(JSON.parse(auth).name)}]</span> :null}</Link>
    </li>
    </ul>:
    <ul className="nav-ul right"><li><Link to="/signup">SIGN UP</Link></li>
    <li className="mar"><Link to="/login">LOGIN</Link></li></ul>
      }
      
      
       
    </div>
  );
};
export default Nav;
