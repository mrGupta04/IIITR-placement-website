import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import styles from "../../styles/User-signinsignup.module.css";

const Signinsignup = ({ setUser, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.toggleButtons}>
        <button
          className={`${styles.toggleButton} ${isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`${styles.toggleButton} ${!isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>
      <div className={styles.formWrapper}>
        {isLogin ? (
          <div className={`${styles.form} ${styles.show}`}>
            <Login setUser={setUser} setLoginsign={setLoginsign} />
          </div>
        ) : (
          <div className={`${styles.form} ${styles.show}`}>
            <Signup setUser={setUser} setLoginsign={setLoginsign} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Signinsignup;
