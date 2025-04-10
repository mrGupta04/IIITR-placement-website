import React, { useState, useEffect } from 'react';
import Userprofile from './user/profile';
import Adminprofile from './admin/profile';
import styles from '../styles/profile.module.css';

const Profile = () => {
  const [showUser, setShowUser] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const userData = localStorage.getItem('userData');
    const adminData = localStorage.getItem('adminData');

    if (userData) {
      animateTransition(() => {
        setShowUser(true);
        setShowAdmin(false);
      });
    } else if (adminData) {
      animateTransition(() => {
        setShowAdmin(true);
        setShowUser(false);
      });
    }
  };

  const animateTransition = (callback) => {
    setIsAnimating(true);
    setTimeout(() => {
      callback();
      setIsAnimating(false);
    }, 300);
  };

  const handleLogin = (role) => {
    animateTransition(() => {
      if (role === 'user') {
        localStorage.setItem('userData', JSON.stringify({ loggedIn: true }));
        setShowUser(true);
        setShowAdmin(false);
      } else if (role === 'admin') {
        localStorage.setItem('adminData', JSON.stringify({ loggedIn: true }));
        setShowAdmin(true);
        setShowUser(false);
      }
    });
  };

  const handleLogout = () => {
    animateTransition(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('adminData');
      setShowUser(false);
      setShowAdmin(false);
    });
  };

  const goBackToProfile = () => {
    animateTransition(() => {
      localStorage.removeItem('userData');
      localStorage.removeItem('adminData');
      setShowUser(false);
      setShowAdmin(false);
    });
  };

  return (
    <div className={`${styles.container} ${isAnimating ? styles.fadeOut : styles.fadeIn}`}>
      {!showUser && !showAdmin ? (
        <div className={styles.selectionPanel}>
          <div className={styles.header}>
            <h1 className={styles.title}>Welcome to CareerConnect</h1>
            <p className={styles.subtitle}>A Job portal powered by IIIT Raichur</p>
          </div>
          
          <div className={styles.roleCards}>
            <div className={styles.card} onClick={() => handleLogin('user')}>
              <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 22a8 8 0 0116 0h-2a6 6 0 00-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                </svg>
              </div>
              <h3>Student</h3>
              <p>Access your learning dashboard, job opportunities, and career resources</p>
              <button className={styles.cardButton}>Continue as Student</button>
            </div>

            <div className={styles.card} onClick={() => handleLogin('admin')}>
              <div className={styles.cardIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14v8H4a8 8 0 018-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9 4h1v5h-8v-5h1v-1a3 3 0 016 0v1zm-2 0v-1a1 1 0 00-2 0v1h2z" />
                </svg>
              </div>
              <h3>Recruiter</h3>
              <p>Manage job postings, view candidate profiles, and track applications</p>
              <button className={styles.cardButton}>Continue as Recruiter</button>
            </div>
          </div>

          <div className={styles.footer}>
            <p>Not sure which to choose? <button className={styles.helpLink}>Get help</button></p>
          </div>
        </div>
      ) : showUser ? (
        <div className={styles.profileContainer}>
          <Userprofile onLogout={handleLogout} goBackToProfile={goBackToProfile} />
        </div>
      ) : (
        <div className={styles.profileContainer}>
          <Adminprofile onLogout={handleLogout} goBackToProfile={goBackToProfile} />
        </div>
      )}
    </div>
  );
};

export default Profile;