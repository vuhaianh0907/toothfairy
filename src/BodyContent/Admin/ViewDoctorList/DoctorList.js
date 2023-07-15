import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:3000/api/account/doctor/alllist')
      .then((response) => {
        setDoctors(response.data.doctors);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (doctor) => {
    setSelectedDoctor(doctor);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationConfirm = async () => {
    try {
      await axios.post(`http://localhost:3000/api/account/doctor/status?id=${selectedDoctor.id}`);
      
      // Cập nhật trạng thái trong danh sách bác sĩ
      const updatedDoctors = doctors.map((doctor) =>
        doctor.id === selectedDoctor.id ? { ...doctor, status: selectedDoctor.status === 'active' ? 'not active' : 'active' } : doctor
      );
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error('Error updating doctor status:', error);
    }

    // Đóng modal xác nhận
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmationCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="doctor-list">
      <h2 className="doctor-list__title">Danh sách bác sĩ</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ul className="doctor-list__items">
            {currentDoctors.map((doctor) => (
              <li key={doctor.id} className="doctor-item">
                <div className="doctor-item__avatar">
                  <img src={doctor.avatar} alt="Doctor Avatar" />
                </div>
                <div className="doctor-item__details">
                  <p className="doctor-item__name">{doctor.fullname}</p>
                  <p className="doctor-item__specialization">{doctor.qualification}</p>
                </div>
                <button className="status-button" onClick={() => handleStatusChange(doctor)}>
                  {doctor.status === 'active' ? 'Active' : 'Not Active'}
                </button>
                <Link to={`/admin/doctordetail/${doctor.id}`} className="view-details-link">
                  Xem thông tin
                </Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      )}

      {/* Modal xác nhận */}
      <Modal isOpen={isConfirmationModalOpen}>
        <div className="confirmation-modal">
          <h3>Xác nhận</h3>
          <p>Bạn có chắc chắn muốn thay đổi trạng thái của bác sĩ?</p>
          <div className="confirmation-modal-buttons">
            <button className="confirm-button" onClick={handleConfirmationConfirm}>
              Xác nhận
            </button>
            <button className="cancel-button" onClick={handleConfirmationCancel}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorList;
