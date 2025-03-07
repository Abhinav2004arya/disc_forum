import React, { useState } from 'react';

function Profile({ user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="profile-container">
      <button 
        className="profile-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="profile-avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <span className="profile-username">{user.username}</span>
      </button>

      {showDropdown && (
        <div className="profile-dropdown">
          <div className="dropdown-header">
            <strong>{user.username}</strong>
            <small>{user.email}</small>
          </div>
          <div className="dropdown-divider"></div>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;