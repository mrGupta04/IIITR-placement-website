import React, { useState, useEffect } from 'react';
import Userprofile from './user/profile';
import Adminprofile from './admin/profile';
import styles from '../styles/profile.module.css';

const Profile = () => {
  const [showUser, setShowUser] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check login state on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

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

  // Go back to profile selection
  const goBackToProfile = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('adminData');
    setShowUser(false);
    setShowAdmin(false);
  };

  return (
    <div className={styles.container}>
      {!showUser && !showAdmin ? (
        <>
          <h2 className={styles.title}>Please select your role</h2>
          <div className={styles.buttons}>
            <button className={styles.button} onClick={() => handleLogin('user')}>Student</button>
            <button className={styles.button} onClick={() => handleLogin('admin')}>Recruiter</button>
          </div>
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