import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CustomerViewBooking.css';
import ViewBookingDetail from '../ViewBookingDetail/ViewBookingDetail';

function CustomerViewBooking() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/appointment/appointmentcustomer?customerID=${id}`)
      .then((response) => {
        const appointmentsData = response.data.appointments;
        const appointmentPromises = appointmentsData.map((appointment) => {
          const doctorPromise = axios.get(`http://localhost:3000/api/account/doctor/details?id=${appointment.doctorID}`);
          const slotPromise = axios.get(`http://localhost:3000/api/slot/details?id=${appointment.slotID}`);

          return Promise.all([doctorPromise, slotPromise])
            .then(([doctorResponse, slotResponse]) => {
              appointment.doctor = doctorResponse.data.doctor;
              appointment.slot = slotResponse.data.slot;
              return appointment;
            });
        });

        Promise.all(appointmentPromises)
          .then((updatedAppointments) => {
            // Sắp xếp danh sách appointments theo updatedAt
            const sortedAppointments = updatedAppointments.sort((a, b) => {
              const updatedAtA = new Date(a.updatedAt);
              const updatedAtB = new Date(b.updatedAt);
              return updatedAtB - updatedAtA;
            });

            setAppointments(sortedAppointments);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error('API Error:', error);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error('API Error:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const totalPages = Math.ceil(appointments.length / perPage);

  return (
    <div className="customer-view-booking">
      <h2>Danh sách đặt lịch</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="booking-list">
          {appointments.slice(startIndex, endIndex).map((appointment) => (
            <div className="booking-form" key={appointment.id}>
              <div className="booking-info">
                <span className="label">Ngày điều trị:</span>
                <span>{appointment.slot.date}</span>
              </div>
              <div className="booking-info">
                <span className="label">Trạng thái:</span>
                <span>{appointment.status}</span>
              </div>
              <div className="booking-info">
                <span className="label">Bác sĩ:</span>
                <span>{appointment.doctor ? appointment.doctor.fullname : 'Unknown Doctor'}</span>
              </div>
              <div className="booking-info">
                <span className="label">Slot:</span>
                <span>{appointment.slot ? appointment.slot.time : 'Unknown Slot'}</span>
              </div>
              <div className="booking-actions">
                <Link to={`/customer/booking/detail/${appointment.id}`} className="view-details-button">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
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
      {selectedAppointment && (
        <ViewBookingDetail appointment={selectedAppointment} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default CustomerViewBooking;
