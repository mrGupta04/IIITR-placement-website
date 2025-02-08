import { useState } from 'react';

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
      const response = await fetch('/api/auth/admin/verifyotp', {
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
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Forgot Password</h2>

      {/* Step 1: Request OTP */}
      {!otpSent && !success ? (
        <form onSubmit={handleSendOtp}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      ) : success ? (
        <div>
          <p>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleVerifyOtpAndResetPassword}>
          <div>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
