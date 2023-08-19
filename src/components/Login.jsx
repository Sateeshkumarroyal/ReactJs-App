import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login({ handleLogin, activeSession, handleAccountLocked }) {
  const [accountActivated] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
  const maxFailedAttempts = 3;
  const [activationMethod, setActivationMethod] = useState('email'); // Default activation method
  const [isActivated, setIsActivated] = useState(false); // State to track activation status
  const [capturedFace, setCapturedFace] = useState(null);
  const [capturedCredentials, setCapturedCredentials] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('unverified'); // 'unverified', 'verified', 'rejected'

  // Hardcoded user data for demonstration
  const hardcodedUserData = [
    { id: 1, email: 'royalsateeshkumar@gmail.com', password: 'password123', activationCode: '123456' },
    { id: 1, email: ' techchallenge@regovtech.com', password: 'password1234', activationCode: '123457' },
    // Add more users here
  ];

  // Hardcoded user data for demonstration
  const eKYC = [
    {
      id: 1,
      email: 'royalsateeshkumar@gmail.com',
      password: 'password123',
      isVerified: true,
      faceImage: null,
      credentialsImage: null,
    },
    {
      id: 2,
      email: 'techchallenge@regovtech.com',
      password: 'password1234',
      isVerified: false,
      faceImage: null,
      credentialsImage: null,
    }
    // Add more users here
  ];

  const handleForgotPassword = () => {
    navigate('/forgetPassword');
  }
  const handleAdmin = () => {
    navigate('/Admin');
  }

  const handleFieldBlur = (field) => {
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [field]: true,
    }));
    // Clear the error for the corresponding field
    if (field === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    } else if (field === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  const isFieldTouched = (field) => touchedFields[field];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = hardcodedUserData.find((userData) => userData.email === email);
      const eKycuser = eKYC.find((userData) => userData.email === email);

      if (!eKycuser) {
        setErrors({ email: 'User not found' });
        return;
      }

      if (!eKycuser.isVerified) {
        setErrors({ email: 'Account not verified' });
        return;
      }

      if (!user) {
        setErrors({ email: 'User not found' });
        return;
      }

      if (!user.activationCode) {
        setErrors({ email: 'Account not activated' });
        return;
      }

      if (activationMethod === 'otp' && !isActivated) {
        // If using OTP activation, check if user is activated
        setErrors({ email: 'Account not activated with OTP' });
        return;
      }
      if (accountActivated) {
        if (activeSession) {
          console.log('User already logged in on another device');
          return;
        }

        if (failedAttempts >= maxFailedAttempts) {
          handleAccountLocked();
          console.log('Account locked due to too many failed attempts');
          return;
        }

        const newErrors = {};

        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Invalid email address';
        }

        if (!password) {
          newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
          // Perform login logic here
          const user = { email };
          handleLogin(user);
          navigate('/dashboard');
        } else {
          setFailedAttempts(failedAttempts + 1);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Activation Method:</label>    { /*email/OTP Activataion*/}
        <select
          className="form-control"
          value={activationMethod}
          onChange={(e) => setActivationMethod(e.target.value)}
        >
          <option value="email">Email</option>
          <option value="otp">OTP</option>
        </select>
      </div>
      {activationMethod === 'otp' && !isActivated && (
        <div className="form-group">
          <button className="activate-btn" onClick={() => setIsActivated(true)}>
            Activate with OTP
          </button>
        </div>
      )}

      <div className="form-group">    { /*eKyc*/}
        {verificationStatus === 'unverified' && (
          <div className="verification-section">
            <h3>Identity Verification</h3>
            <button className="capture-face-btn" onClick={() => setCapturedFace('dummy-face-image')}>
              Capture Face
            </button>
            <button
              className="capture-credentials-btn"
              onClick={() => setCapturedCredentials('dummy-credentials-image')}
            >
              Capture Credentials
            </button>
            <button
              className="verify-btn"
              onClick={() => setVerificationStatus('verified')}
            >
              Verify Identity
            </button>
          </div>
        )}
        {verificationStatus === 'verified' && (
          <p className="verification-success">Identity Verified</p>
        )}
      </div>


      <div className={`form-group ${isFieldTouched('email') && errors.email ? 'touched' : ''}`}>
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email && 'is-invalid'}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleFieldBlur('email')}
        />
        {isFieldTouched('email') && errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className={`form-group ${isFieldTouched('password') && errors.password ? 'touched' : ''}`}>
        <label>Password</label>
        <input
          type="password"
          className={`form-control ${errors.password && 'is-invalid'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => handleFieldBlur('password')}
        />
        {isFieldTouched('password') && errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className="form-group">
        <button className="forgot-password-btn" onClick={handleForgotPassword}>
          Forgot Password
        </button>
      </div>
      <div className="form-group">
        <button className="admin-btn" onClick={handleAdmin}>
          Admin
        </button>
      </div>

      <button className="btn btn-primary" onClick={handleLoginSubmit}>Login</button>

      <div className="background-image"></div>
    </div>
  );
}

export default Login;

