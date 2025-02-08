import React, { useState, useEffect } from "react";
import Signinsignup from "./signinsignup";
import ProfileCard from "./profilecard";
import Update from './update';

const Userprofile = ({ onLogout }) => {
  const [user, setUser] = useState(null);
  const [loginsign, setLoginsign] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Retrieved User:", parsedUser);
        setUser(parsedUser);
        setLoginsign(true);
      } catch (error) {
        console.error("Error parsing User data:", error);
        localStorage.removeItem("User"); 
      }
    }
  }, []);

  const handleLogin = (userData) => {
    console.log("Login successful, User data:", userData);
    if (userData) {
      localStorage.setItem("User", JSON.stringify(userData));
      setUser(userData);
      setLoginsign(true);
      alert("Login successful!");
    } else {
      console.error("Invalid User data received:", userData);
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("User");
    setUser(null);
    setLoginsign(false);
    onLogout();
  };

  return (
    <div>
      {loginsign ? (
        <ProfileCard user={user} handleLogout={handleLogout} />
      ) : (
        <Signinsignup setUser={handleLogin} setLoginsign={setLoginsign} />
      )}
    </div>
  );
};

export default Userprofile;
