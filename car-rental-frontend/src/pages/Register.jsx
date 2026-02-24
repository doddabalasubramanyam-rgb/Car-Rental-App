import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    await registerUser(form);
    alert("Registered Successfully");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <input placeholder="Name"
          onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})}/>
        <select onChange={e => setForm({...form, role:e.target.value})}>
          <option value="CUSTOMER">Customer</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button onClick={handleRegister}>Register</button>
        <p>Already have account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

export default Register;