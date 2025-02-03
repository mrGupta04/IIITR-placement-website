import React, { useState, useEffect } from "react";
import Signinsignup from "./signinsignup";
import AdminProfileCard from "./profilecard";

const AdminProfile = ({ onLogout }) => {
  const [Admin, setAdmin] = useState(null);
  const [loginsign, setLoginsign] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("Admin");
  
    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
  
        if (parsedAdmin && typeof parsedAdmin === "object") {
          console.log("Retrieved Admin:", parsedAdmin);
          setAdmin(parsedAdmin);
          setLoginsign(true);
        } else {
          console.error("Invalid Admin data structure:", parsedAdmin);
          localStorage.removeItem("Admin");
        }
      } catch (error) {
        console.error("Error parsing Admin data:", error);
        localStorage.removeItem("Admin");
      }
    }
  }, []);
  
  const handleLogin = (AdminData) => {
    console.log("Login successful, Admin data:", AdminData);
    if (AdminData) {
      localStorage.setItem("Admin", JSON.stringify(AdminData)); // Store AdminData directly
      setAdmin(AdminData); // Update state with the correct structure
      setLoginsign(true);
      alert("Login successful!");
    } else {
      console.error("Invalid Admin data received:", AdminData);
    }
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    localStorage.removeItem("Admin");
    setAdmin(null);
    setLoginsign(false);
    onLogout();
  };

  return (
    <div>
      {loginsign ? (
        <AdminProfileCard Admin={Admin} handleLogout={handleLogout} />
      ) : (
        <Signinsignup setAdmin={handleLogin} setLoginsign={setLoginsign} />
      )}
    </div>
  );
};

export default AdminProfile;
