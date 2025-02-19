import { useState } from 'react';
import styles from '../../styles/User-Forget-password.module.css';

const ForgotPassword = ({ onResetSuccess }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/user/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);
      setMessage(data.message);

      if (data.success) {
        setOtpSent(true);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error occurred. Please try again.');
    }
  };

  const handleVerifyOtpAndResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/user/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      setLoading(false);
      setMessage(data.message);

      if (data.success) {
        setSuccess(true); // Password reset was successful
        setMessage("Your password has been reset successfully. Please login with your new password.");
        onResetSuccess(); // Switch back to login form
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={`${styles.card} ${otpSent ? styles.flipped : ''}`}>
        {/* Front of the Card: Email Input */}
        <div className={styles.cardFront}>
          <h2 className={styles.heading}>Forgot Password</h2>
          <form onSubmit={handleSendOtp}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
          {message && <p className={styles.message}>{message}</p>}
          </div>

          <div className={styles.cardBack}>
          <h2 className={styles.heading}>Reset Password</h2>
          <form onSubmit={handleVerifyOtpAndResetPassword}>
            <div className={styles.inputGroup}>
              <label htmlFor="otp" className={styles.label}>OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="newPassword" className={styles.label}>New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;