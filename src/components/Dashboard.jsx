import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessagingApp from './MessagingApp';
function Dashboard({ user, handleLogout }) {
  const navigate = useNavigate();
  const shoppingDetails = [
    { id: 1, itemName: 'Shirt', price: 25.99 },
    { id: 2, itemName: 'Dress', price: 49.99 },
    { id: 3, itemName: 'Trouser', price: 34.99 }
  ];
  const handleLogin = () => {
    navigate('/login')
  }
  const handleShop = () => {
    navigate('/clothApp')
  }
  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}</h2>
      <h3>{user ? user.email : 'Please login to access the dashboard'}</h3>
      {user ? (
        <>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
          <div>
            <h3>Your Shopping Details:</h3>
            <ul>
              {shoppingDetails.map(item => (
                <li key={item.id}>
                  {item.itemName} - ${item.price}
                </li>
              ))}
            </ul>
            <button className="button-Shop" onClick={handleShop}>Continue Shopping</button>
            <MessagingApp /> 
          </div>
        </>
      ) : (
        <button className="login-button" onClick={handleLogin}>Login</button>


      )}
      <div className="background-image"></div>
    </div>
  );
}

export default Dashboard;

