import React, { useState } from 'react';
import './ViewTreatementList.css'; // Import the CSS file for styling
import AddProfilePopup from './AddProfilePopup/AddProfilePopup';

function ViewTreatementList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 35,
      gender: 'Male',
      doctor: 'Dr. Jane Smith',
      treatmentDate: '2023-06-28',
      symptoms: 'Fever, headache, cough',
      treatmentProgress: 'In progress'
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 42,
      gender: 'Female',
      doctor: 'Dr. Michael Johnson',
      treatmentDate: '2023-06-30',
      symptoms: 'Fatigue, joint pain',
      treatmentProgress: 'Not started'
    },
    // Add more profiles here
  ]);
  const [showAddProfilePopup, setShowAddProfilePopup] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenAddProfilePopup = () => {
    setShowAddProfilePopup(true);
  };

  const handleCloseAddProfilePopup = () => {
    setShowAddProfilePopup(false);
  };

  const handleAddProfile = (profileName) => {
    const newProfile = {
      id: profiles.length + 1,
      name: profileName,
      // Add other properties as needed
    };

    setProfiles([...profiles, newProfile]);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (profileId) => {
    // Placeholder for handling view profile logic
    console.log('View Profile:', profileId);
  };

  const handleInputTreatmentInfo = (profileId) => {
    // Placeholder for handling input treatment info logic
    console.log('Input Treatment Info:', profileId);
  };

  return (
    <div className="clinic-page">
      <h2>Clinic Profiles</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search profile..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="profile-list">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div className="profile-card" key={profile.id}>
              <p><strong>Profile Name:</strong> {profile.name}</p>
              <p><strong>Treatment Date:</strong> {profile.treatmentDate}</p>
              <p><strong>Treatment Progress:</strong> {profile.treatmentProgress}</p>
              <div className="profile-buttons">
                <button onClick={() => handleViewProfile(profile.id)}>View Profile</button>
                <button onClick={() => handleInputTreatmentInfo(profile.id)}>Input Treatment Info</button>
              </div>
            </div>
          ))
        ) : (
          <p>No profiles found.</p>
        )}
      </div>
      <button className="add-profile-button" onClick={handleOpenAddProfilePopup}>Add Profile</button>

      {showAddProfilePopup && (
        <AddProfilePopup onClose={handleCloseAddProfilePopup} onAddProfile={handleAddProfile} />
      )}
    </div>
  );
}

export default ViewTreatementList;
