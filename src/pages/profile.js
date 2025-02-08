import React, { useState, useEffect } from 'react';
import Userprofile from './user/profile';
import Adminprofile from './admin/profile';

const Profile = () => {
  const [showUser, setShowUser] = useState(null); //false
  const [showAdmin, setShowAdmin] = useState(null); //false

  // Check login state on component mount
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  // Function to check login status
  const checkLoginStatus = () => {
    const userData = localStorage.getItem('userData');
    const adminData = localStorage.getItem('adminData');

    if (userData) {
      setShowUser(true);
      setShowAdmin(false);
    } else if (adminData) {
      setShowAdmin(true);
      setShowUser(false);
    } else {
      setShowUser(false);
      setShowAdmin(false);
    }
  };

  // Handle login
  const handleLogin = (role) => {
    if (role === 'user') {
      localStorage.setItem('userData', JSON.stringify({ loggedIn: true }));
      setShowUser(true);
      setShowAdmin(false);
    } else if (role === 'admin') {
      localStorage.setItem('adminData', JSON.stringify({ loggedIn: true }));
      setShowAdmin(true);
      setShowUser(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('adminData');
    setShowUser(false);
    setShowAdmin(false);
  };

  return (
    <div>
      {/* Show login buttons only if no user/admin is logged in */}
      {!showUser && !showAdmin ? (
        <>
          <h2>Please select your role</h2>
          <button onClick={() => handleLogin('user')}>Student</button>
          <button onClick={() => handleLogin('admin')}>Recruiter</button>
        </>
      ) : showUser ? (
        <Userprofile onLogout={handleLogout} />
      ) : (
        <Adminprofile onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Profile;
