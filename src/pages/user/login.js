import React, { useState } from "react";
import ForgotPassword from "./forget-password";
import styles from "../../styles/User-Login.module.css";

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
    setError("");

    try {
      const response = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();
      if (!response.ok) throw new Error(userData.message || "Login failed");

      localStorage.setItem("User", JSON.stringify(userData.user));
      setUser(userData.user);
      setLoginsign(true);
    } catch (error) {
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.userloginContainer}>
      {!showForgotPassword ? (
        <>
          <h2 className={styles.loginheading}>Welcome Back</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.userlogininput}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.userlogininput}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={styles.userloginbutton}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <a
            onClick={() => setShowForgotPassword(true)}
            className={styles.userforgetpasswordlink}
          >
            Forgot Password?
          </a>
        </>
      ) : (
        <ForgotPassword onResetSuccess={() => setShowForgotPassword(false)} />
      )}
    </div>
  );
};

export default Login;