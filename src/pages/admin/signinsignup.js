"use client"

import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import  useWindowSize  from "../../utils/usewindowsize";
import styles from "../../styles/Admin-signinsignup.module.css";

const LoginContent = () => (
  <div className={styles.authPortalContent}>
    <h1 className={styles.authPortalTitle}>Welcome to Recruiter Portal</h1>
    <div className={styles.authFeatureList}>
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>💼</span>
        </div>
        <p className={styles.authFeatureText}>Post job opportunities and internships</p>
      </div>
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>👥</span>
        </div>
        <p className={styles.authFeatureText}>Access qualified student profiles and resumes</p>
      </div>
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>📊</span>
        </div>
        <p className={styles.authFeatureText}>Track applications and manage hiring process</p>
      </div>
    </div>
  </div>
);
const SignupContent = () => (
  <div className={styles.authPortalContent}>
    <h1 className={styles.authPortalTitle}>Partner With IIIT Raichur</h1>
    <p className={styles.authPortalSubtitle}>
      Join India's premier technical institute for exceptional recruitment opportunities
    </p>
    
    <div className={styles.authFeatureList}>
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>🎯</span>
        </div>
        <div>
          <h3 className={styles.authFeatureHeading}>Top Engineering Talent</h3>
          <p className={styles.authFeatureText}>
            Access 500+ high-performing students across Computer Science, 
            Electronics, and Data Science disciplines
          </p>
        </div>
      </div>
      
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>🚀</span>
        </div>
        <div>
          <h3 className={styles.authFeatureHeading}>Efficient Recruitment</h3>
          <p className={styles.authFeatureText}>
            Our streamlined portal reduces hiring time by 40% with automated scheduling, 
            resume filtering, and interview coordination
          </p>
        </div>
      </div>
      
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>🤝</span>
        </div>
        <div>
          <h3 className={styles.authFeatureHeading}>Campus Engagement</h3>
          <p className={styles.authFeatureText}>
            Build brand presence through tech talks, hackathons, and pre-placement 
            engagements with our student community
          </p>
        </div>
      </div>
      
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>📈</span>
        </div>
        <div>
          <h3 className={styles.authFeatureHeading}>Placement Analytics</h3>
          <p className={styles.authFeatureText}>
            Get detailed insights on candidate skills, academic performance, 
            and placement statistics to make informed decisions
          </p>
        </div>
      </div>
      
      <div className={styles.authFeatureItem}>
        <div className={styles.authFeatureIconContainer}>
          <span className={styles.authFeatureIcon}>🏆</span>
        </div>
        <div>
          <h3 className={styles.authFeatureHeading}>Preferred Partner Benefits</h3>
          <p className={styles.authFeatureText}>
            Early access to top candidates, dedicated relationship manager, 
            and exclusive invites to campus innovation showcases
          </p>
        </div>
      </div>
    </div>
    
    
  </div>
);

const Signinsignup = ({ setAdmin, setLoginsign }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useWindowSize();

  if (isMobile === undefined) {
    return <div className={styles.authLoading}>Loading...</div>;
  }

  if (isMobile) {
    return (
      <div className={styles.authMobileContainer}>
        <div className={styles.authMobileHeader}>
          <h1 className={styles.authMobileTitle}>
            {isLogin ? "Recruiter Login" : "Register as Recruiter"}
          </h1>
          <p className={styles.authMobileSubtitle}>
            {isLogin
              ? "Sign in to access recruiter dashboard"
              : "Join IIIT Raichur's recruitment network"}
          </p>
        </div>
        
        <div className={styles.authMobilePanel}>
          {isLogin ? (
            <Login setAdmin={setAdmin} setLoginsign={setLoginsign} />
          ) : (
            <Signup setAdmin={setAdmin} setLoginsign={setLoginsign} />
          )}
        </div>
        
        <div className={styles.authSwitchContainer}>
          <p className={styles.authMobileSwitchText}>
            {isLogin ? "New recruiter?" : "Already registered?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={styles.authSwitchButton}
            >
              {isLogin ? "Register Company" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPortalContainer}>
      {/* Login View: Content Left, Form Right */}
      {isLogin ? (
        <>
          <div className={`${styles.authContentPanel} ${styles.authLoginContentPanel}`}>
            <LoginContent />
          </div>
          <div className={styles.authFormPanel}>
          <div className={styles.authSwitchContainer}>
              <p className={styles.authSwitchText}>
                New recruiter?{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className={styles.authSwitchButton}
                >
                  Create Account
                </button>
              </p>
            </div>
            <Login setAdmin={setAdmin} setLoginsign={setLoginsign} />
            
          </div>
        </>
      ) : (
        <>
          <div className={styles.authFormPanel}>
          <div className={styles.authSwitchContainer}>
              <p className={styles.authSwitchText}>
                Already registered?{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className={styles.authSwitchButton}
                >
                  Sign In
                </button>
              </p>
            </div>
            <Signup setAdmin={setAdmin} setLoginsign={setLoginsign} />
           
          </div>
          <div className={`${styles.authContentPanel} ${styles.authSignupContentPanel}`}>
            <SignupContent />
          </div>
        </>
      )}
    </div>
  );
};

export default Signinsignup;