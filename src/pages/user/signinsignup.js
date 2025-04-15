import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import  useWindowSize  from "../../utils/useuserwindow";
import styles from "../../styles/User-signinsignup.module.css";

const Signinsignup = ({ setUser, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useWindowSize();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsTransitioning(false);
    }, 500);
  };

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <h1>{isLogin}</h1>
          <p className={styles.mobileSubtitle}>
            {isLogin
             }
          </p>
        </div>

        <div className={styles.mobileFormWrapper}>
          {isLogin ? (
            <Login setUser={setUser} setLoginsign={setLoginsign} />
          ) : (
            <Signup setUser={setUser} setLoginsign={setLoginsign} />
          )}
        </div>

        <div className={styles.switchContainer}>
          <p>
            {isLogin ? "New to the platform?" : "Already registered?"}{" "}
            <button onClick={handleToggle} className={styles.switchButton}>
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.formPanel}>


        <div className={styles.formContent}>
          {isLogin ? (
            <Login setUser={setUser} setLoginsign={setLoginsign} />
          ) : (
            <Signup setUser={setUser} setLoginsign={setLoginsign} />
          )}
        </div>
        <div className={styles.toggleContainer}>
          <button
            className={styles.toggleButton}
            onClick={handleToggle}
            disabled={isTransitioning}
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signinsignup;