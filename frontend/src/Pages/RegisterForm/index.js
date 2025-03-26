import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import AuthContext from "../../context/AuthContext";



const RegisterForm = () => {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg || "Something went wrong. Please try again.");
    setIsLoading(false);
  };

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      return "All fields are required.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setShowSubmitError(false);

    const validationError = validateForm();
    if (validationError) {
      onSubmitFailure(validationError);
      return;
    }

    const userDetails = { username, email, password };
    console.log(`User Details in registration page: ${username, email, password}`);

    try {
      const response = await register(userDetails);
      console.log(`Response in registration page: ${response}`);

      if (response === "User registered successfully") {
        navigate("/login");
      } else {
        onSubmitFailure(response?.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        onSubmitFailure(error.response.data.error);
      } else {
        onSubmitFailure("Network error. Please try again.");
      }
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-form">
          <div className="heading">
            <h2>Create Account</h2>
            <p className="subheading">Join us today to get started</p>
          </div>
          <form className="form-container" onSubmit={onSubmitForm}>
            <div className="input-container">
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="user-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="email"
                id="email"
                placeholder="Email address"
                className="user-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-container">
              <input
                type="password"
                id="password"
                placeholder="Password (min 6 characters)"
                className="user-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="auth-button" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Register"
              )}
            </button>

            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            
            {/* <div className="terms">
              <p>By registering, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a></p>
            </div> */}
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <div className="social-login">
              <button type="button" className="social-btn google">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
                Continue with Google
              </button>
            </div>
          </form>
          <p className="switch-auth">Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;