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
    <div className={styles.pageWrapper}>
      <div className={styles.adminloginContainer}>
        {!showForgotPassword ? (
          <>
            <h2 className={styles.loginheading}>User Login</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className={styles.adminloginbutton}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={() => setShowForgotPassword(true)}
              className={styles.forgotPasswordButton}
            >
              Forgot Password?
            </button>
          </>
        ) : (
          <ForgotPassword onResetSuccess={handleResetSuccess} />
        )}
      </div>
    </div>
  );
};

export default Login;