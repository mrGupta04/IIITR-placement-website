import { useState } from 'react';
import { FiMail, FiLock, FiKey, FiArrowLeft } from 'react-icons/fi';
import styles from '../../styles/User-Forget-password.module.css';

const ForgotPassword = ({ onResetSuccess }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: 'Please enter your email', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/auth/user/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        setOtpSent(true);
        setMessage({ text: 'OTP sent successfully! Check your email.', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to send OTP', type: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    }
  };

  const handleVerifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }
    
    if (newPassword.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/auth/user/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        setMessage({ 
          text: "Password reset successful! Redirecting to login...", 
          type: 'success' 
        });
        setTimeout(() => onResetSuccess(), 2000);
      } else {
        setMessage({ text: data.message || 'Password reset failed', type: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {!otpSent ? (
          // Email Form
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Reset Password</h2>
            <p className={styles.subtitle}>Enter your email to receive a verification code</p>
            
            <form onSubmit={handleSendOtp} className={styles.form}>
              <div className={styles.inputGroup}>
                <FiMail className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className={`${styles.button} ${loading ? styles.loading : ''}`}
              >
                {loading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
            
            <button 
              onClick={onResetSuccess} 
              className={styles.backButton}
            >
              <FiArrowLeft /> Back to Login
            </button>
          </div>
        ) : (
          // OTP and New Password Form
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Create New Password</h2>
            <p className={styles.subtitle}>Enter the verification code sent to {email}</p>
            
            <form onSubmit={handleVerifyOtpAndResetPassword} className={styles.form}>
              <div className={styles.inputGroup}>
                <FiKey className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Verification Code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FiLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.input}
                  required
                  minLength="8"
                />
              </div>
              
              <div className={styles.inputGroup}>
                <FiLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.input}
                  required
                  minLength="8"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading} 
                className={`${styles.button} ${loading ? styles.loading : ''}`}
              >
                {loading ? (
                  <span className={styles.spinner}></span>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
            
            <button 
              onClick={() => setOtpSent(false)} 
              className={styles.backButton}
            >
              <FiArrowLeft /> Change Email
            </button>
          </div>
        )}
        
        {message.text && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;