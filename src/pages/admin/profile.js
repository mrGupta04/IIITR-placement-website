import React, { useState, useEffect } from "react";
import Signinsignup from "./signinsignup";
import AdminProfileCard from "./profilecard";
import styles from '../../styles/profile.module.css';

const AdminProfile = ({ onLogout, goBackToProfile }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        if (parsedAdmin && typeof parsedAdmin === "object") {
          setAdmin(parsedAdmin);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("admin");
        }
      } catch (error) {
        localStorage.removeItem("admin");
      }
    }
  }, []);

  const handleLogin = (adminData) => {
    if (adminData) {
      localStorage.setItem("admin", JSON.stringify(adminData));
      setAdmin(adminData);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminProfileCard handleLogout={handleLogout} />
      ) : (
        <div className={styles.authContainer}>
          <button 
            className={styles.backButton} 
            onClick={goBackToProfile}
          >
            Back to Profile
          </button>
          <Signinsignup setAdmin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default AdminProfile;