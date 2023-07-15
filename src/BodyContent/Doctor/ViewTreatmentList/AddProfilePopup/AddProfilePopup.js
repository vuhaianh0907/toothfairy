import React, { useState } from 'react';
import './AddProfilePopup.css'; // Import the CSS file for styling

function AddProfilePopup({ onClose, onAddProfile }) {
  const [profileName, setProfileName] = useState('');

  const handleProfileNameChange = (event) => {
    setProfileName(event.target.value);
  };

  const handleAddProfile = () => {
    onAddProfile(profileName);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Add Profile</h2>
        <div className="profile-name-input">
          <label>Profile Name:</label>
          <input type="text" value={profileName} onChange={handleProfileNameChange} />
        </div>
        <div className="popup-buttons">
          <button onClick={handleAddProfile}>Add Profile</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default AddProfilePopup;
