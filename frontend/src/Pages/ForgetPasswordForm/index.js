import React, { useState } from "react";
import "./index.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setLoading(false);
      setSuccess("Password reset link has been sent to your email.");
    }, 2000);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-image">
          <img src="/forgot-password.svg" alt="Forgot Password" />
        </div>
        <div className="forgot-form">
          <div className="forgot-heading">
            <h2>Forgot Password?</h2>
            <p className="forgot-subheading">Enter your email to reset your password</p>
          </div>
          <form className="forgot-form-container" onSubmit={handleSubmit}>
            <div className="forgot-input-container">
              <input
                type="email"
                className="forgot-user-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p className="forgot-error-msg">{error}</p>}
            {success && <p className="forgot-success-msg">{success}</p>}
            <button type="submit" className="forgot-button" disabled={loading}>
              {loading ? <div className="forgot-spinner"></div> : "Reset Password"}
            </button>
          </form>
          <div className="forgot-switch-auth">
            <p>
              Remember your password? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
