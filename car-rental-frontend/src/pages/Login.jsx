import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN")
        navigate("/admin");
      else
        navigate("/customer");

    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🚗 Car Rental</h2>
        <input placeholder="Email"
          onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password"
          onChange={e => setForm({...form, password:e.target.value})}/>
        <button onClick={handleLogin}>Login</button>
        <p>Don't have account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;