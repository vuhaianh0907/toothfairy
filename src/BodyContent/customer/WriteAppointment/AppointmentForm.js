import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

const SlotAppointment = () => {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reason, setReason] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/slot/details?id=${id}`);
        setSlot(response.data.slot);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch slot');
        setLoading(false);
      }
    };

    if (loading) {
      fetchSlot();
    }
  }, [id, loading]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/doctor/details?id=${slot.doctorID}`);
        setDoctor(response.data.doctor);
      } catch (error) {
        setError('Failed to fetch doctor');
      }
    };

    if (slot && slot.doctorID) {
      fetchDoctor();
    }
  }, [slot]);

  const handleConfirmation = async () => {
    try {
      // Xây dựng dữ liệu
      const appointmentData = {
        status: 'confirmed',
        doctorID: doctor.id,
        customerID: user.id,
        slotID: slot.id,
        reason: reason,
      };

      // Gửi yêu cầu POST đến API
      const response = await axios.post(`http://localhost:3000/api/appointment/create?customerId=${id}`, appointmentData);

      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setIsConfirmed(true);
        setIsConfirmationModalOpen(false);
        setIsSuccessModalOpen(true);
      } else {
        setError('Failed to confirm appointment');
      }
    } catch (error) {
      setError('Failed to confirm appointment');
    }
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setReason('');
    setError('');
  };

  return (
    <div>
      {!loading && slot && doctor ? (
        <>
          <p>Ngày khám: {slot.date}</p>
          <p>Thời gian: {slot.time}</p>
          <p>Bác Sĩ: {doctor.fullname}</p>
          <img src={doctor.avatar} alt="Doctor Avatar" />

          {!isConfirmed && (
            <>
              <div>
                <label htmlFor="reason">Lí do:</label>
                <input type="text" id="reason" value={reason} onChange={handleReasonChange} />
              </div>
              <button onClick={() => setIsConfirmationModalOpen(true)}>Xác nhận</button>
            </>
          )}

          <Modal isOpen={isConfirmationModalOpen}>
            <p>Xác nhận cuộc hẹn?</p>
            <button onClick={handleConfirmation}>Xác nhận</button>
            <button onClick={() => setIsConfirmationModalOpen(false)}>Đóng</button>
          </Modal>

          <Modal isOpen={isSuccessModalOpen}>
            <p>{successMessage}</p>
            <button onClick={handleCloseSuccessModal}>Đóng</button>
          </Modal>
        </>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SlotAppointment;
