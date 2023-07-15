import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './viewBooking.css';

const ViewBooking = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const [currentPageFuture, setCurrentPageFuture] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const appointmentsPerPage = 3;
  const dateNow = new Date().toISOString();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/appointment/appointmentdoctor?doctorID=${id}`);
        const appointmentsData = response.data.appointments;

        // Lấy thông tin chi tiết của customer và slot cho từng appointment
        const appointmentsWithDetails = await Promise.all(
          appointmentsData.map(async (appointment) => {
            const customerId = appointment.customerID;
            const slotId = appointment.slotID;

            // Lấy thông tin customer
            const customerResponse = await axios.get(`http://localhost:3000/api/account/customer/details?id=${customerId}`);
            const customerData = customerResponse.data.customer;

            // Lấy thông tin slot
            const slotResponse = await axios.get(`http://localhost:3000/api/slot/details?id=${slotId}`);
            const slotData = slotResponse.data.slot;

            // Kết hợp thông tin appointment, customer và slot thành một object mới
            return {
              ...appointment,
              customer: customerData,
              slot: slotData,
            };
          })
        );

        setAppointments(appointmentsWithDetails);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [id]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại

    const todayAppointmentsData = appointments.filter((appointment) => appointment.slot.date === currentDate);
    const futureAppointmentsData = appointments.filter((appointment) => appointment.slot.date > currentDate);

    setTodayAppointments(todayAppointmentsData);
    setFutureAppointments(futureAppointmentsData);
  }, [appointments]);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseProfile = () => {
    setSelectedAppointment(null);
  };

  const handleTodayPageChange = (pageNumber) => {
    console.log(pageNumber);
    setCurrentPageToday(pageNumber);
  };

  const handleFuturePageChange = (pageNumber) => {
    setCurrentPageFuture(pageNumber);
  };

  const handleCancelAppointment = async (appointmentId) => {
    setSelectedAppointment(appointments.find((appointment) => appointment.id === appointmentId));
    setShowConfirmation(true);
  };

  const handleRequestCancellation = async (appointmentId) => {
    setSelectedAppointment(appointments.find((appointment) => appointment.id === appointmentId));
    setShowConfirmation(true);
  };

  const handleConfirmCancelAppointment = async () => {
    try {
      // Gửi yêu cầu hủy lịch hẹn
      await axios.post(`http://localhost:3000/api/appointment/updatedoctor?id=${selectedAppointment.id}`, { status: 'Doctor Cancelled' });
      // Cập nhật lại danh sách lịch hẹn
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === selectedAppointment.id) {
          return {
            ...appointment,
            status: 'Doctor Cancelled',
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleConfirmRequestCancellation = async () => {
    try {
      // Gửi yêu cầu hủy lịch hẹn
      await axios.post(`http://localhost:3000/api/appointment/update?id=${selectedAppointment.id}`, { status: 'Cancellation Requested' });
      // Cập nhật lại danh sách lịch hẹn
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === selectedAppointment.id) {
          return {
            ...appointment,
            status: 'Cancellation Requested',
          };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error requesting cancellation:', error);
    }
  };
  const StoreIDSlot = (slotID) => {
    const data = JSON.stringify(slotID);
    sessionStorage.setItem('SlotID', data);
  };

  const handleCancelConfirmation = () => {
    setSelectedAppointment(null);
    setShowConfirmation(false);
  };
  


  const renderAppointmentListFuture = (appointments) => {
    const startIndex = (currentPageFuture - 1) * appointmentsPerPage;
    const endIndex = currentPageFuture * appointmentsPerPage;
    const currentAppointments = appointments.slice(startIndex, endIndex);
    console.log(appointments);
    return (
      <>

        {currentAppointments.map((appointment) => (
          <li className="appointment-item" key={appointment.id}>
            <button className="appointment-button" onClick={() => handleViewAppointment(appointment)}>
              Xem phiếu khám
            </button>
            <span className="appointment-info">Họ tên: {appointment.customer.fullname}</span>
            <span className="appointment-info">Lí do đến khám: {appointment.reason}</span>
            <span className="appointment-info">Ngày khám: {appointment.slot.date}</span>
            <span className="appointment-info">Giờ khám: {appointment.slot.time}</span>
            <span className="appointment-info">Trạng thái: {appointment.status}</span>
            {appointment.status === 'confirmed' && (
              <>
                {appointment.slot.date === new Date().toISOString().split('T')[0] ? (
                  <button className="cancel-button" onClick={() => handleRequestCancellation(appointment.id)}>
                    Yêu cầu hủy
                  </button>
                ) : (
                  <button className="cancel-button" onClick={() => handleCancelAppointment(appointment.id)}>
                    Hủy
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </>
    );
  };
  const renderAppointmentListToday = (appointments) => {
    const startIndex = (currentPageToday - 1) * appointmentsPerPage;
    const endIndex = currentPageToday * appointmentsPerPage;
    const currentAppointments = appointments.slice(startIndex, endIndex);
    console.log(appointments);
    return (
      <>

        {currentAppointments.map((appointment) => (
          <li className="appointment-item" key={appointment.id}>
            <button className="appointment-button" onClick={() => handleViewAppointment(appointment)}>
              Xem phiếu khám
            </button>
            <span className="appointment-info">Họ tên: {appointment.customer.fullname}</span>
            <span className="appointment-info">Lí do đến khám: {appointment.reason}</span>
            <span className="appointment-info">Ngày khám: {appointment.slot.date}</span>
            <span className="appointment-info">Giờ khám: {appointment.slot.time}</span>
            <span className="appointment-info">Trạng thái: {appointment.status}</span>
            {appointment.status === 'confirmed' && (
              <>
                {appointment.slot.date === new Date().toISOString().split('T')[0] ? (
                  <div>
                    <button className="cancel-button" onClick={() => handleRequestCancellation(appointment.id)}>
                      Yêu cầu hủy
                    </button>

                  </div>


                ) : (
                  <button className="cancel-button" onClick={() => handleCancelAppointment(appointment.id)}>
                    Hủy
                  </button>
                )}
              </>
            )}
          </li>
        ))}
      </>
    );
  };

  const renderPagination = (totalPages, currentPage, onPageChange) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    );
  };

  // Calculate total pages for today's appointments and future appointments
  const totalTodayPages = Math.ceil(todayAppointments.length / appointmentsPerPage);
  const totalFuturePages = Math.ceil(futureAppointments.length / appointmentsPerPage);

  return (
    <div className="view-booking-container">
      <h2 className="view-booking-heading">Danh sách lịch hẹn</h2>
      <div className="appointments-section">
        <h3 className="appointments-heading">Hôm nay {dateNow}</h3>
        {todayAppointments.length > 0 ? (
          <>
            <ul className="appointments-list">{renderAppointmentListToday(todayAppointments)}</ul>
            {renderPagination(totalTodayPages, currentPageToday, handleTodayPageChange)}
          </>
        ) : (
          <p className="no-appointments-message">Không có lịch hẹn nào hôm nay.</p>
        )}
      </div>
      <div className="appointments-section">
        <h3 className="appointments-heading">Tương lai</h3>
        {futureAppointments.length > 0 ? (
          <>
            <ul className="appointments-list">{renderAppointmentListFuture(futureAppointments)}</ul>
            {renderPagination(totalFuturePages, currentPageFuture, handleFuturePageChange)}
          </>
        ) : (
          <p className="no-appointments-message">Không có lịch hẹn trong tương lai.</p>
        )}
      </div>
      {selectedAppointment && (
        <div className="appointment-profile">
          <div className="profile-info">
            <span className="profile-label">Họ tên:</span>
            <span className="profile-value">{selectedAppointment.customer.name}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Ngày sinh:</span>
            <span className="profile-value">{selectedAppointment.customer.dateOfBirth}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Giới tính:</span>
            <span className="profile-value">{selectedAppointment.customer.gender}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Lí do đến khám:</span>
            <span className="profile-value">{selectedAppointment.reason}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Ngày khám:</span>
            <span className="profile-value">{selectedAppointment.slot.date}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Giờ khám:</span>
            <span className="profile-value">{selectedAppointment.slot.time}</span>
          </div>
          <div className="profile-info">
            <span className="profile-label">Trạng thái:</span>
            <span className="profile-value">{selectedAppointment.status}</span>
          </div>
          {selectedAppointment.status === 'confirmed' && (
            <>
              {selectedAppointment.slot.date === new Date().toISOString().split('T')[0] ? (
                <div>
                  <button className="cancel-button">
                    <Link to={`/Doctor/viewpatientprofile/${selectedAppointment.customer.id}`} className="view-profile-link" onClick={StoreIDSlot(selectedAppointment.id)}>
                      Xem hồ sơ
                    </Link>
                  </button>

                  <button className="cancel-button" onClick={handleConfirmRequestCancellation}>
                    Yêu cầu hủy
                  </button>
                </div>

              ) : (
                <button className="cancel-button" onClick={handleConfirmCancelAppointment}>
                  Hủy
                </button>
              )}
            </>
          )}
          <button className="close-button" onClick={handleCloseProfile}>
            Đóng
          </button>
        </div>
      )}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p className="confirmation-message">Bạn có chắc chắn muốn hủy lịch hẹn này?</p>
          <div className="confirmation-buttons">
            <button className="confirmation-button" onClick={handleConfirmCancelAppointment}>
              Xác nhận
            </button>
            <button className="confirmation-button" onClick={handleCancelConfirmation}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBooking;
