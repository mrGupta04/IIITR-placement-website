import React, { useState } from "react";
import ForgotPassword from "./forget-password";

const Login = ({ setLoginsign, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
     
        const userData = await response.json();
        if(!response.ok) throw new Error(userData.message||"login failed")
        console.log("Login successful, user data:", userData);
        localStorage.setItem("User", JSON.stringify(userData.user));
        setUser(userData.user);
        setLoginsign(true);
  
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetSuccess = () => {
    // Switch back to login view after password reset
    setShowForgotPassword(false);
  };

  return (
    <div className="login-container">
      {/* Conditionally render ForgotPassword or Login */}
      {!showForgotPassword ? (
        <>
          <h2>Login</h2>

          {error && <p className="error-message">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot Password Link */}
          <a href="#" onClick={() => setShowForgotPassword(true)}>
            Forgot password?
          </a>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </>
      ) : (
        <ForgotPassword onResetSuccess={handleResetSuccess} />
      )}
    </div>
  );
};

export default Login;
