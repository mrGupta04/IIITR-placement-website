import { useState } from 'react';
import styles from '../../styles/Admin-Forget-password.module.css';

const ForgotPassword = ({ onResetSuccess }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/auth/admin/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);
      
      if (response.ok) {
        setMessage({ text: data.message, type: 'success' });
        setOtpSent(true);
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

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/auth/admin/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessage({ 
          text: "Password reset successful! Please login with your new password.", 
          type: 'success' 
        });
        setSuccess(true);
        setTimeout(onResetSuccess, 3000); // Return to login after 3 seconds
      } else {
        setMessage({ text: data.message || 'Password reset failed', type: 'error' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2 className={styles.forgotPasswordHeading}>Reset Password</h2>
      
      {message.text && (
        <div className={`${styles.message} ${styles[`${message.type}Message`]}`}>
          {message.text}
        </div>
      )}

      {!success ? (
        <>
          {!otpSent ? (
            <form onSubmit={handleSendOtp} className={styles.forgotPasswordForm}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your registered email"
                />
              </div>
              <button 
                type="submit" 
                className={styles.resetButton} 
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtpAndResetPassword} className={styles.forgotPasswordForm}>
              <div className={styles.formGroup}>
                <label htmlFor="otp" className={styles.formLabel}>
                  Verification Code
                </label>
                <input
                  type="text"
                  id="otp"
                  className={styles.formInput}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="newPassword" className={styles.formLabel}>
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className={styles.formInput}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="At least 8 characters"
                  minLength="8"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword" className={styles.formLabel}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.formInput}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter your new password"
                  minLength="8"
                />
              </div>

              <button 
                type="submit" 
                className={styles.resetButton} 
                disabled={loading}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}
        </>
      ) : null}

      <div className={styles.footerLinks}>
        <span 
          className={styles.backToLogin} 
          onClick={onResetSuccess}
        >
          ← Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPassword;