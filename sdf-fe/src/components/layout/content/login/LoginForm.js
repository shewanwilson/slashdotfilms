import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm({ setIsSignedIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }
      
      // Set signed in state for rest of app
      localStorage.setItem("isSignedIn", "true");
      setIsSignedIn(true);
      navigate("/");

    } catch (err) {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <div className="login-footer">
          <Link to="/register" className="login-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
