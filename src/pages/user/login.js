import React, { useState } from "react";
import ForgotPassword from "./forget-password";
import styles from "../../styles/User-login.module.css"; // Import CSS module

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
      if (!response.ok) throw new Error(userData.message || "Login failed");

      console.log("Login successful, user data:", userData);
      localStorage.setItem("User", JSON.stringify(userData.user));
      setUser(userData.user);
      setLoginsign(true);
    } catch (error) {
      console.error("Error during login:", error.message);
      setError(error.message || "An error occurred. Please try again.");
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
          <h2 className={styles.heading}>Login</h2>

          {error && (
            <p className={styles.errorMessage} aria-live="assertive">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />

          <button
            className={styles.forgotPassword}
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot password?
          </button>

          <button
            className={styles.loginButton}
            onClick={handleLogin}
            disabled={loading}
          >
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
