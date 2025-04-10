import { useState } from 'react';
import styles from '../../styles/Admin-forgetpassword.module.css';


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
      const response = await fetch('/api/auth/admin/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) setOtpSent(true);
    } catch (error) {
      setLoading(false);
      setMessage('Error occurred. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/admin/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      
      const data = await response.json();
      setLoading(false);
      setMessage(data.message);
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => onResetSuccess(), 3000); // Auto-close after 3 seconds
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Reset Password</h2>
      
      {!otpSent ? (
        <form onSubmit={handleSendOtp} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : success ? (
        <div className={`${styles.message} ${styles.success}`}>
          {message}
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="otp">OTP Code</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {message && !success && (
        <div className={`${styles.message} ${styles.error}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;