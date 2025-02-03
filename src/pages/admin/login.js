import React, { useState } from "react";
import ForgotPassword from "./forget-password";
import styles from "../../styles/Admin-login.module.css"; // Import CSS

const Login = ({ setLoginsign, setAdmin }) => {
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
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login failed");

      localStorage.setItem("admin", JSON.stringify(result.admin));
      alert("Login successful!");
      setAdmin(result.admin);
      setLoginsign(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSuccess = () => {
    setShowForgotPassword(false);
  };

  return (
    <div className={styles.loginContainer}>
      {!showForgotPassword ? (
        <>
          <h2>Login</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}

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
