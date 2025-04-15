"use client"; // Add this directive for Next.js 13+ to make it client-side only

import React, { useState, useEffect } from "react";
import Signinsignup from "./signinsignup";
import AdminProfileCard from "./profilecard";
import styles from '../../styles/Admin-profile.module.css';

const AdminProfile = ({ onLogout, goBackToProfile }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        try {
          const parsedAdmin = JSON.parse(storedAdmin);
          console.log("Retrieved Admin:", parsedAdmin);
          setAdmin(parsedAdmin);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error parsing Admin data:", error);
          localStorage.removeItem("admin"); 
        }
      }
      setIsLoading(false);
    }
  }, []);

  const handleLoginSuccess = (adminData) => {
    console.log("Login successful, Admin data:", adminData);
    if (adminData && typeof window !== 'undefined') {
      localStorage.setItem("admin", JSON.stringify(adminData));
      setAdmin(adminData);
      setIsLoggedIn(true);
    } else {
      console.error("Invalid Admin data received:", adminData);
    }
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    if (typeof window !== 'undefined') {
      localStorage.removeItem("admin");
    }
    setAdmin(null);
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  if (isLoading) {
    return <div className={styles.profileContainer}>Loading...</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {isLoggedIn ? (
        <AdminProfileCard 
          admin={admin} 
          handleLogout={handleLogout}
        />
      ) : (
        <div className={styles.authContainer}>
          <Signinsignup 
            setAdmin={handleLoginSuccess} 
            setLoginsign={setIsLoggedIn} 
          />
          <button 
            className={styles.backButton} 
            onClick={goBackToProfile}
          >
            Back to Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;