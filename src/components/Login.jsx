import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });
  const [activationMethod, setActivationMethod] = useState('email'); // Default activation method
  const [isActivated, setIsActivated] = useState(false); // State to track activation status
  // eslint-disable-next-line
  const [capturedFace, setCapturedFace] = useState(null);
  // eslint-disable-next-line
  const [capturedCredentials, setCapturedCredentials] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('unverified');
  const [isAccountBlocked, setIsAccountBlocked] = useState(false); // Track account blocking

  // eKyc user data 
  const hardcodedUserData = [
    {
      id: 1,
      email: 'royalsateeshkumar@gmail.com',         //     valid credentials
      password: 'password123456',
      isVerified: true,
      faceImage: null,
      credentialsImage: null,
      activationCode: '123456',
      isLoggedOnAnotherDevice: false,
       maxFailedAttempts: 1 
    },
    {
      id: 2,
      email: 'techchallenge1@regovtech.com',        //Account not Activated --- Activation code
      password: 'password1',
      isVerified: true,
      faceImage: null,
      credentialsImage: null,
      isLoggedOnAnotherDevice: false,
      activationCode: null,
      maxFailedAttempts: 1 
    },
    {
      id: 3,
      email: 'techchallenge2@regovtech.com',         //Account logged in Other device
      password: 'password12',
      isVerified: true,
      faceImage: null,
      credentialsImage: null,
      isLoggedOnAnotherDevice: true,
      activationCode: '12',
      maxFailedAttempts: 1 
    },
    {
      id: 3,
      email: 'techchallenge3@regovtech.com',                 
      password: 'password123',
      isVerified: true,
      faceImage: null,
      credentialsImage: null,
      isLoggedOnAnotherDevice: false,
      activationCode: '123',
      maxFailedAttempts: 3
    },
    {  
      id: 4,
      email: 'techchallenge24@regovtech.com',         //ekyc not verified
      password: 'password1234',
      isVerified: false,
      faceImage: null,
      credentialsImage: null,
      isLoggedOnAnotherDevice: false,
      activationCode: '1234',
      maxFailedAttempts: 1 
    }
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
    // Access the captured email address
  console.log('Email:', email);
  console.log('password:', password);
  console.log('failed:', failedAttempts);


    // Check if the account is already blocked
    if (isAccountBlocked) {
      setIsAccountBlocked(false); 
      return;
    }
  
    try {
      const user = hardcodedUserData.find((userData) => userData.email === email);
      console.log('max:', user.maxFailedAttempts);

  
      if (!user) {
        toast.error('User not found');
        return;
      }
  
      if (!user.isVerified) {
        toast.error('Account not verified');
        return;
      }
  
  
      if (!user.activationCode) {
        toast.error('Account not activated');
        return;
      }
  
      if (activationMethod === 'otp' && !isActivated) {
        toast.error('Account not activated with OTP');
        return;
      }
  
      if (user && user.isLoggedOnAnotherDevice) {
        toast.error('User already logged in on another device');
        console.log('User already logged in on another device');
        return;
      }
  
 if (user && user.password !== password) {
        // Increment the failed login attempts
        setFailedAttempts(failedAttempts + 1);

        if (failedAttempts >= 2) {
          // If there have been 3 or more failed attempts, block the account
          setIsAccountBlocked(true);
          toast.error('Account locked due to too many failed attempts.');
          return;
        }

        toast.error('Incorrect password');
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
        const user = { email };
        handleLogin(user);
        navigate('/dashboard');
      } else {
        setFailedAttempts(failedAttempts + 1);
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
      <ToastContainer
        toastClassName="custom-toast" 
        bodyClassName="custom-toast-body" 
        position="top-right" 
        autoClose={5000} // Auto-close after 5 seconds
      />
      <div className="background-image"></div>
    </div>
  );
}

export default Login;

