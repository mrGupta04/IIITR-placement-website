import Login from './login';
import Signup from './signup';
import { useState } from 'react';
import styles from '../../styles/User-signinsignup.module.css';

const Signinsignup = ({ setUser, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.profileContainer}>
      {isLogin ? (
        <Login setUser={setUser} setLoginsign={setLoginsign} />
      ) : (
        <Signup setUser={setUser} setLoginsign={setLoginsign} />
      )}
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.signupButton} ${!isLogin ? styles.disabled : ''}`}
          onClick={() => setIsLogin(false)}
          disabled={!isLogin} // Disable if already in Signup
          aria-pressed={!isLogin} // Accessibility: indicates if the button is active
        >
          Signup
        </button>
        <button
          className={`${styles.loginButton} ${isLogin ? styles.disabled : ''}`}
          onClick={() => setIsLogin(true)}
          disabled={isLogin} // Disable if already in Login
          aria-pressed={isLogin} // Accessibility: indicates if the button is active
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Signinsignup;
