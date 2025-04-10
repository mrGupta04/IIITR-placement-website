import React, { useState, useEffect } from "react";
import Signinsignup from "./signinsignup";
import ProfileCard from "./profilecard";
import Update from './update';
import styles from '../../styles/profile.module.css';

const Userprofile = ({ onLogout, goBackToProfile }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Retrieved User:", parsedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing User data:", error);
        localStorage.removeItem("User"); 
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    console.log("Login successful, User data:", userData);
    if (userData) {
      localStorage.setItem("User", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      console.error("Invalid User data received:", userData);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("User");
    setUser(null);
    setIsLoggedIn(false);
    if (onLogout) onLogout();
  };

  const handleUpdateSuccess = (updatedUser) => {
    localStorage.setItem("User", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowUpdate(false);
  };

  return (
    <div className={styles.profileContainer}>
      {isLoggedIn ? (
        showUpdate ? (
          <Update 
            user={user} 
            onUpdateSuccess={handleUpdateSuccess} 
            onCancel={() => setShowUpdate(false)}
          />
        ) : (
          <ProfileCard 
            user={user} 
            handleLogout={handleLogout}
            onUpdate={() => setShowUpdate(true)}
          />
        )
      ) : (
        <div className={styles.authContainer}>
          <button 
            className={styles.backButton} 
            onClick={goBackToProfile}
          >
            Back to Profile
          </button>
          <Signinsignup 
            setUser={handleLoginSuccess} 
            setLoginsign={setIsLoggedIn} 
          />
        </div>
      )}
    </div>
  );
};

export default Userprofile;
