import React, { useState, useEffect } from 'react';
import './PatientProfile.css';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PatientProfile = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [treatmentProfiles, setTreatmentProfiles] = useState([]);
  const [treatmentIns, setTreatmentIns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [newTreatmentProfileName, setNewTreatmentProfileName] = useState('');
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);

  const pageSize = 5; // Kích thước trang

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`); // Thay đổi URL API tương ứng
        const customerData = response.data.customer;
        setCustomer(customerData);
        
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    const fetchTreatmentProfiles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/treatment_profile/schedule?id=${id}`); // Thay đổi URL API tương ứng
        const treatmentProfilesData = response.data.treatmentProfiles;
        
        
        setTreatmentProfiles(treatmentProfilesData);
        
      } catch (error) {
        console.error('Error fetching treatment profiles:', error);
      }
    };

    fetchCustomer();
    fetchTreatmentProfiles();
  }, [id]);

  // Tính toán số trang
  const totalPages = Math.ceil(treatmentProfiles.length / pageSize);

  // Lấy danh sách treatment profiles hiện tại dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTreatmentProfiles = treatmentProfiles.slice(startIndex, endIndex);

  // Chuyển đến trang trước đó
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Chuyển đến trang tiếp theo
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Chuyển đến trang đầu tiên
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Chuyển đến trang cuối cùng
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Mở pop-up thêm mới treatment profile
  const openPopup = () => {
    setShowPopup(true);
  };

  // Đóng pop-up thêm mới treatment profile
  const closePopup = () => {
    setShowPopup(false);
  };

  // Xử lý sự kiện thêm mới treatment profile
  const handleAddTreatmentProfile = async () => {
    try {
      // Xử lý logic thêm mới treatment profile tại đây
      const newProfile = {
        customerID: id,
        description: newTreatmentProfileName,
        doctorID: user.id,
      };

      // Gửi yêu cầu tạo treatment profile
      const response = await axios.post('http://localhost:3000/api/treatment_profile/create', newProfile); // Thay đổi URL API tương ứng

      // Xử lý phản hồi từ server
      const createdProfile = response.data;
      console.log('Treatment profile created:', createdProfile);

      // Cập nhật danh sách treatment profiles
      setTreatmentProfiles([...treatmentProfiles, createdProfile]);

      // Sau khi xử lý, đóng pop-up và làm các thao tác cần thiết
      closePopup();
    } catch (error) {
      console.error('Error creating treatment profile:', error);
    }
  };

  return (
    <div className="patient-profile">
      <h2>Thông tin bệnh nhân</h2>
      {customer ? (
        <>
          <div className="info-item">
            <span className="label">Họ tên:</span>
            <span className="value">{customer.fullname}</span>
          </div>

          <div className="info-item">
            <span className="label">Giới tính:</span>
            <span className="value">{customer.gender}</span>
          </div>

          <div className="info-item">
            <span className="label">Số điện thoại:</span>
            <span className="value">{customer.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{customer.email}</span>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div className="actions">
        <button className="add-treatment-profile-button" onClick={openPopup}>
          Thêm mới treatment profile
        </button>
      </div>

      <div className="treatment-profiles">
        <h3>Treatment Profiles</h3>
        {treatmentProfiles.length > 0 ? (
          <>
            <ul>
              {currentTreatmentProfiles.map((profile) => (
                <li key={profile.id}>
                  {profile.description}
                  <button className="view-details-button">
                    <Link to={`/doctor/viewTreatmentProfile/${profile.id}`} >
                      Xem chi tiết
                    </Link>

                  </button>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={goToFirstPage}
                disabled={currentPage === 1}
              >
                &lt;&lt;
              </button>
              <button
                className="pagination-button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
              <button
                className="pagination-button"
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                &gt;&gt;
              </button>
            </div>
          </>
        ) : (
          <p>No treatment profiles available.</p>
        )}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thêm mới treatment profile</h3>
            <input
              type="text"
              placeholder="Tên treatment profile"
              value={newTreatmentProfileName}
              onChange={(e) => setNewTreatmentProfileName(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="popup-button" onClick={handleAddTreatmentProfile}>
                <Link to={`/Doctor/viewpatientprofile/${id}`} >
                  Xác nhận
                </Link>

              </button>
              <button className="popup-button" onClick={closePopup}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
