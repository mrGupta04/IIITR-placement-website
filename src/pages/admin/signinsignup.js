import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import { useWindowSize } from "../user/useWindowSize";
import styles from "../../styles/User-signinsignup.module.css";

const LoginContent = () => (
  <div className={styles.content}>
    <h1>Welcome to Recruiter Portal</h1>
    <div className={styles.contentFeatures}>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>💼</span>
        <p>Post job opportunities and internships</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>👥</span>
        <p>Access qualified student profiles and resumes</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>📊</span>
        <p>Track applications and manage hiring process</p>
      </div>
    </div>
  </div>
);

const SignupContent = () => (
  <div className={styles.content}>
    <h1>Partner With IIIT Raichur</h1>
    <div className={styles.contentFeatures}>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🎯</span>
        <p>Connect with top engineering talent</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🚀</span>
        <p>Streamline your campus recruitment process</p>
      </div>
      <div className={styles.featureItem}>
        <span className={styles.featureIcon}>🤝</span>
        <p>Build long-term campus relationships</p>
      </div>
    </div>
  </div>
);

const Signinsignup = ({ setAdmin, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useWindowSize();

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <h1>{isLogin ? "Recruiter Login" : "Register as Recruiter"}</h1>
          <p className={styles.mobileSubtitle}>
            {isLogin 
              ? "Sign in to access recruiter dashboard" 
              : "Join IIIT Raichur's recruitment network"}
          </p>
        </div>
        <div className={styles.mobilePanel}>
          <div className={styles.mobileFormContainer}>
            {isLogin ? (
              <Login setAdmin={setAdmin} setLoginsign={setLoginsign} />
            ) : (
              <Signup setAdmin={setAdmin} setLoginsign={setLoginsign} />
            )}
          </div>
        </div>
        <div className={styles.switchContainer}>
          <p className={styles.mobileSwitch}>
            {isLogin ? "New recruiter?" : "Already registered?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)} className={styles.switchLink}>
              {isLogin ? "Register Company" : "Sign In"}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isLogin ? (
        <>
          <div className={`${styles.panel} ${styles.leftPanel}`}>
            <LoginContent />
            <button
              className={styles.switchFormButton}
              onClick={() => setIsLogin(false)}
            >
              REGISTER COMPANY
            </button>
          </div>
          <div className={`${styles.panel} ${styles.rightPanel}`}>
            <Login setAdmin={setAdmin} setLoginsign={setLoginsign} />
          </div>
        </>
      ) : (
        <>
          <div className={`${styles.panel} ${styles.rightPanel}`}>
            <Signup setAdmin={setAdmin} setLoginsign={setLoginsign} />
          </div>
          <div className={`${styles.panel} ${styles.leftPanel}`}>
            <SignupContent />
            <button
              className={styles.switchFormButton}
              onClick={() => setIsLogin(true)}
            >
              SIGN IN
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Signinsignup;