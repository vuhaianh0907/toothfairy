import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './treatmentprofilelist.css';

function TreatmentProfilePage() {
  const { id } = useParams();
  const [treatmentProfiles, setTreatmentProfiles] = useState([]);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(1);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(treatmentProfiles.length / perPage);

  useEffect(() => {
    const fetchTreatmentProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/schedule?id=${id}`);
        const data = response.data.treatmentProfiles;
        setTreatmentProfiles(data);
      } catch (error) {
        console.error('Error fetching treatment profiles:', error);
      }
    };

    fetchTreatmentProfiles();
  }, [id]);

  return (
    <div className="treatment-profile-page">
      <h2>Treatment Profiles</h2>
      {treatmentProfiles.slice(startIndex, endIndex).map((profile) => (
        <div key={profile.id} className="profile-card">
          <h3>{profile.description}</h3>
          <p>Ngày tạo hồ sơ: {profile.createdAt}</p>
          <Link to={`/customer/treatmentprofile/${profile.id}`} className="detail-button">
            Xem chi tiết
          </Link>
          {/* Render other profile details */}
        </div>
      ))}
      {totalPages > 1 && (
        <div className="pagination">
          <button id='paging-btn'
            onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span id='paging-btn'>{currentPage}</span>
          <button id='paging-btn'
            onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
}

export default TreatmentProfilePage;
