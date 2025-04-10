import { useState } from 'react';
import styles from '../../styles/User-Forget-password.module.css';

const ForgotPassword = ({ onResetSuccess }) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await fetch('/api/auth/user/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      setLoading(false);
      setMessage(data.message);
      if (data.success) onResetSuccess();
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
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="New Password"
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
      )}

      {message && (
        <p className={`${styles.message} ${message.includes('success') ? styles.success : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;