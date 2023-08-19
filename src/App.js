
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ClothingApplication from './components/ClothingApplication';
import ForgetPassword from './components/ForgetPassword';
import Logout from './components/Logout'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
          <Route path="/logout" element={<Logout  handleLogout={handleLogout}/>} />
          <Route path="/dashboard" element={<Dashboard user={loggedInUser} handleLogout={handleLogout} />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/clothApp" element={<ClothingApplication />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;