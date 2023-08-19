import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      // Validate the email format
      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error('Invalid email format.');
        return;
      }
      // Make API request to initiate password reset
      // Display success or error message based on response
      toast.success('Password reset email sent.');
      // Add a delay before navigating to the login page
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay for 2 seconds 
    } catch (error) {
      toast.error('Failed to send reset email.');
    }

  };

  return (
    <div className="container">
      <h2>Forget Password</h2>
      <form className="password-form" onSubmit={handleForgetPassword}>
        <input
          type="email"
          className="email-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="reset-button">Send Reset Email</button>
      </form>
      <div className="background-image"></div>
      <ToastContainer
        toastClassName="custom-toast" 
        bodyClassName="custom-toast-body" 
        position="top-right" 
        autoClose={5000} // Auto-close after 5 seconds
      />
    </div>
  );
}

export default ForgetPassword;
