import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import styles from "../../styles/User-signinsignup.module.css";

const Signinsignup = ({ setUser, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.signupsignincontainer }>
      <div className={styles.signupsignbuttonContainer}>
        <button
          className={`${styles.signupButton} ${!isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
        <button
          className={`${styles.loginButton} ${isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
      </div>
      {isLogin ? (
        <Login setAdmin={setUser} setLoginsign={setLoginsign} />
      ) : (
        <Signup setAdmin={setUser} setLoginsign={setLoginsign} />
      )}
    </div>
  );
};

export default Signinsignup;
