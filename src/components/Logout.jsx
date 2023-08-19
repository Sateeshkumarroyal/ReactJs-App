import React from 'react';
import './Logout.css'; 
import { useNavigate } from 'react-router-dom';

function Logout({ handleLogout }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  return (
    <div className="logout-container">
      <h1 className="logout-message">You have successfully logged out. If you want Login ?</h1>
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <div className="background-image"></div>
    </div>
  );
}

export default Logout;
