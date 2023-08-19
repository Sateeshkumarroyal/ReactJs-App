import React, { useState } from 'react';
import './Admin.css';
import { useNavigate } from 'react-router-dom';

const hardcodedData = [
  {
    id: 1,
    user: 'John Doe',
    status: 'pending'
  },
  {
    id: 2,
    user: 'Jane Smith',
    status: 'pending'
  },
  {
    id: 3,
    user: 'Alice Johnson',
    status: 'pending'
  }
];

function AdminDashboard() {
  const [applications, setApplications] = useState(hardcodedData);
  const navigate = useNavigate();

  const handleApprove = (applicationId) => {
    // Update application status to "approved" in the local data
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, status: 'approved' } : app
      )
    );
  };

  const handleReject = (applicationId) => {
    // Update application status to "rejected" in the local data
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      )
    );
  };

  const handleLogout = () => {
    navigate('/logout');
  }

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <ul className="application-list">
        {applications.map((application) => (
          <li key={application.id} className="application-item">
            <p>User: {application.user}</p>
            <p>Status: {application.status}</p>
            <div className="buttons">
              <button className="approve-button" onClick={() => handleApprove(application.id)}>
                Approve
              </button>
              <button className="reject-button" onClick={() => handleReject(application.id)}>
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="background-image"></div>
    </div>
  );
}

export default AdminDashboard;

