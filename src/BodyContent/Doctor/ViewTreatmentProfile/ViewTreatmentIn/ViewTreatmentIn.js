import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ViewTreatmentIn.css'; // Import the CSS file for styling

function ViewTreatmentIn() {
  const { id } = useParams(); // Get the ID from the URL

  const [treatmentProfile, setTreatmentProfile] = useState(null);

  useEffect(() => {
    const fetchTreatmentProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/details?id=${id}`); // Replace with your API endpoint
        const profileData = response.data.treatmentProfile;
        setTreatmentProfile(profileData);
      } catch (error) {
        console.error('Error fetching treatment profile:', error);
      }
    };

    fetchTreatmentProfile();
  }, [id]);

  if (!treatmentProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="treatment-container">
      <h2>View Treatment In</h2>
      <div className="progress-box">
        <p><strong>Profile Name:</strong> {treatmentProfile.profileName}</p>
        <p><strong>Treatment Time:</strong> {treatmentProfile.time}</p>
        <p><strong>Treatment Progress:</strong> {treatmentProfile.progress}</p>
        <p><strong>Result:</strong> {treatmentProfile.result}</p>
        <p><strong>Note:</strong> {treatmentProfile.note}</p>
      </div>
    </div>
  );
}

export default ViewTreatmentIn;
