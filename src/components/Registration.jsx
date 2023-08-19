// Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });

  const handleRegistration = () => {
    // Perform validation before registration
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      // Validation passed, perform registration logic
      navigate('/login')
    } else {
      setErrors(newErrors);
    }
  };


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


  return (
    // Registration form and activation method selection
    <div className="registration-container">
      <h2>Registration</h2>
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
      <button className="btn btn-primary" onClick={handleRegistration}>Register</button>
      <div className="background-image"></div>
    </div>
  );
}

export default Registration;
