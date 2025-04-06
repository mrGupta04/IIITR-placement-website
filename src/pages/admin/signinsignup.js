import Login from './login';
import Signup from './signup';
import { useState } from 'react';
import styles from '../../styles/Admin-signinsignup.module.css';

const Signinsignup = ({ setAdmin, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={styles.signupsignincontainer}>
      <div className={styles.signupsignbuttonContainer}>
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
      {isLogin ? (
        <Login setAdmin={setAdmin} setLoginsign={setLoginsign} />
      ) : (
        <Signup setAdmin={setAdmin} setLoginsign={setLoginsign} />
      )}

    </div>
  );
};

export default Signinsignup;
