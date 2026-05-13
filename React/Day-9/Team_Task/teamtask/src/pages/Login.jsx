import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === data.email &&
      storedUser.password === data.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/landing");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => navigate("/register")}>Go to Register</p>
    </div>
  );
};

export default Login;