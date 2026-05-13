import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (!user.email || !user.password) {
      alert("Fill all fields");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
      <p onClick={() => navigate("/login")}>Go to Login</p>
    </div>
  );
};

export default Register;