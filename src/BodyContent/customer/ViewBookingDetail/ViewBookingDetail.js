import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewBookingDetail.css';

function ViewBookingDetail() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Send GET request to fetch appointment details
    axios
      .get(`http://localhost:3000/api/appointment/details?id=${id}`)
      .then((response) => {
        // Handle the response from the API
        const appointmentData = response.data.appointment;
        
        // Send GET requests to fetch slot and doctor details
        const slotPromise = axios.get(`http://localhost:3000/api/slot/details?id=${appointmentData.slotID}`);
        const doctorPromise = axios.get(`http://localhost:3000/api/account/doctor/details?id=${appointmentData.doctorID}`);

        // Wait for both promises to resolve
        Promise.all([slotPromise, doctorPromise])
          .then(([slotResponse, doctorResponse]) => {
            // Update appointment data with slot and doctor details
            appointmentData.slot = slotResponse.data.slot;
            appointmentData.doctor = doctorResponse.data.doctor;

            setAppointment(appointmentData);
            setIsLoading(false); // Set loading state to false when data has been loaded
          })
          .catch((error) => {
            console.error('API Error:', error);
            setIsLoading(false); // Set loading state to false if an error occurs
          });
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('API Error:', error);
        setIsLoading(false); // Set loading state to false if an error occurs
      });
  }, [id]);

  // Hàm xử lý sự kiện khi ấn nút hủy
  const handleCancelAppointment = () => {
    setShowCancelModal(true);
  };

  // Hàm xử lý sự kiện khi ấn nút đóng của pop-up
  const handleCloseModal = () => {
    setShowCancelModal(false);
  };

  // Hàm xử lý sự kiện khi xác nhận hủy cuộc hẹn
  const handleConfirmCancelAppointment = () => {
    // Gửi yêu cầu POST để cập nhật cuộc hẹn
    axios
      .post(`http://localhost:3000/api/appointment/update?id=${id}`, { status: 'Cancelled' })
      .then((response) => {
        // Xử lý phản hồi từ API (nếu cần)
        console.log('Appointment cancelled:', response.data);

        // Đặt lại trạng thái của cuộc hẹn
        setAppointment((prevAppointment) => ({
          ...prevAppointment,
          status: 'Cancelled'
        }));
      })
      .catch((error) => {
        console.error('API Error:', error);
      });

    setShowCancelModal(false); // Đóng pop-up sau khi đã gửi yêu cầu
  };

  return (
    <div className="view-booking-detail">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Chi tiết đặt lịch</h2>
          <div className="detail-info">
            <span className="label">Ngày điều trị:</span>
            <span>{appointment ? appointment.slot.date : 'Unknown'}</span>
          </div>
          <div className="detail-info">
            <span className="label">Trạng thái:</span>
            <span>{appointment ? appointment.status : 'Unknown'}</span>
          </div>
          <div className="detail-info">
            <span className="label">Bác sĩ:</span>
            <span>{appointment ? appointment.doctor.fullname : 'Unknown'}</span>
          </div>
          <div className="detail-info">
            <span className="label">Slot:</span>
            <span>{appointment ? appointment.slot.time : 'Unknown'}</span>
          </div>
          <div className="detail-info">
            <span className="label">Lí do:</span>
            <span>{appointment ? appointment.reason : 'Unknown'}</span>
          </div>

           {/* Nút hủy appointment chỉ hiển thị khi trạng thái là "Confirmed" */}
           {appointment.status !== 'Cancelled' && appointment.status !== 'Doctor Cancelled' &&(
            <button className="cancel-appointment-button" onClick={handleCancelAppointment}>
              Hủy đặt lịch
            </button>
          )}

          {/* Pop-up xác nhận hủy */}
          {showCancelModal && (
            <div className="cancel-modal">
              <div className="cancel-modal-content">
                <h3>Xác nhận hủy appointment</h3>
                <p>Bạn có chắc chắn muốn hủy appointment này?</p>
                <div className="cancel-modal-buttons">
                  <button className="cancel-button" onClick={handleCloseModal}>
                    Đóng
                  </button>
                  <button className="confirm-button" onClick={handleConfirmCancelAppointment}>
                    Hủy appointment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewBookingDetail;
