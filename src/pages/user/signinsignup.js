import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { useWindowSize } from "../user/useWindowSize";
import styles from "../../styles/User-signinsignup.module.css";


const LoginContent = () => (
  <div className={styles.content}>
    <h1>Welcome to IIIT Raichur Placement Cell</h1>
    <div className={styles.contentFeatures}>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🎯</span>
        <p>Access exclusive job opportunities from top companies</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>📊</span>
        <p>Track your applications and interview status</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>📝</span>
        <p>Update your profile and resume anytime</p>
      </div>
    </div>
  </div>
);

const SignupContent = () => (
  <div className={styles.content}>
    <h1>Begin Your Career Journey</h1>
    <div className={styles.contentFeatures}>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🚀</span>
        <p>Join our network for placements</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>💼</span>
        <p>Connect with leading tech companies and startups</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🎓</span>
        <p>Access resources for interview preparation</p>
      </div>
    </div>
  </div>
);

const Signinsignup = ({ setUser, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useWindowSize();

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <h1>{isLogin ? "Welcome Back!" : "Create Account"}</h1>
          <p className={styles.mobileSubtitle}>
            {isLogin 
              ? "Sign in to access your placement portal" 
              : "Join IIIT Raichur's placement network"}
          </p>
        </div>
        <div className={styles.mobilePanel}>
          <div className={styles.mobileFormContainer}>
            {isLogin ? (
              <Login setAdmin={setUser} setLoginsign={setLoginsign} />
            ) : (
              <Signup setAdmin={setUser} setLoginsign={setLoginsign} />
            )}
          </div>
        </div>
        <div className={styles.switchContainer}>
          <p className={styles.mobileSwitch}>
            {isLogin ? "New to the platform?" : "Already registered?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)} className={styles.switchLink}>
              {isLogin ? "Create Account" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.signupsignincontainer}>
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
        <Login setUser={setUser} setLoginsign={setLoginsign} />
      ) : (
        <Signup setUser={setUser} setLoginsign={setLoginsign} />
      )}
    </div>
  );
};

export default Signinsignup;