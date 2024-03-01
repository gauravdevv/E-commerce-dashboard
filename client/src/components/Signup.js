import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collect = async () => {
    console.log(name, email, password);
    const result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await result.json();
    console.warn(data);
    localStorage.setItem("user", JSON.stringify(data));
    if (data) {
      navigate("/");
    }
  };

  return (
    <div className="m3">
      <h1>sign up</h1>
      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        value={name}
        type="text"
        placeholder="Enter Name.."
        onChange={(e) => setname(e.target.value)}
      />
      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        value={email}
        type="text"
        placeholder="Enter E-mail.."
        onChange={(e) => setemail(e.target.value)}
      />
      <input style={{borderRadius:10 +'px'}}
        className="inputbox"
        value={password}
        type="password"
        placeholder="Enter Password.."
        onChange={(e) => setpassword(e.target.value)}
      />
      <input style={{borderRadius:10 +'px',border:"none"}} className="bttn" type="submit" value="sign Up" onClick={collect} />
    </div>
  );
}
