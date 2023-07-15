import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ResetAppointmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const customerResponse = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`);
        const customerData = customerResponse.data.customer;
        setCustomer(customerData);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    const fetchDoctorDetails = async () => {
      try {
        const doctorResponse = await axios.get(`http://localhost:3000/api/account/doctor/details?id=${user.id}`);
        const doctorData = doctorResponse.data.doctor;
        setDoctor(doctorData);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    const fetchSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${user.id}`);
        const filteredSlots = response.data.slots.filter((slot) => slot.status === 'available');
        setSlots(filteredSlots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchCustomerDetails();
    fetchDoctorDetails();
    fetchSlots();
  }, [id, user.id]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleDateChange = (event) => {
    const selectedDateValue = event.target.value;
    const currentDate = new Date().toISOString().split('T')[0];

    if (selectedDateValue >= currentDate) {
      setSelectedDate(selectedDateValue);
    } else {
      console.log("Không thể chọn lịch quá khứ");
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowConfirmation(true);
  };

  const handleConfirmationConfirm = async () => {
    try {
      // Create the appointment object
      const appointmentData = {
        status: 'confirmed',
        doctorID: user.id,
        customerID: id,
        slotID: selectedSlot.id,
        reason: "Bác sĩ hẹn tái khám",
      };

      // Send the POST request to create the appointment
      const response = await axios.post(`http://localhost:3000/api/appointment/create?customerId=${id}`, appointmentData);

      // Check the response from the API
      if (response.status === 200) {
        setConfirmationMessage(response.data.message);
      } else {
        setConfirmationMessage('Failed to confirm appointment');
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      setConfirmationMessage('Failed to confirm appointment');
    }
  };

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  const filteredSlots = selectedDate ? slots.filter((slot) => slot.date === selectedDate) : slots;

  if (!customer || !doctor) {
    return <p>Loading customer and doctor details...</p>;
  }

  return (
    <div className="reset-appointment-page">
      <h2>Đặt lại lịch tái khám</h2>
      <p>Thông tin bác sĩ:</p>
      <p>Họ và tên: {doctor.fullname}</p>
      <p>Email: {doctor.email}</p>

      <p>Thông tin khách hàng:</p>
      <p>Họ và tên: {customer.fullname}</p>
      <p>Email: {customer.email}</p>

      <div className="filter-container">
        <label htmlFor="selectedDate">Chọn ngày:</label>
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      <div className="slots-container">
        <h3>Các lịch hẹn của bác sĩ</h3>
        {filteredSlots.length > 0 ? (
          <ul className="slots-list">
            {filteredSlots.map((slot) => (
              <li key={slot.id}>
                <button className="slot-button" onClick={() => handleSlotClick(slot)}>
                  {slot.time}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có lịch hẹn khả dụng</p>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-modal-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn xác nhận?</p>
            <div className="confirmation-modal-buttons">
              <button className="confirm-button" onClick={handleConfirmationConfirm}>
                Xác nhận
              </button>
              <button className="cancel-button" onClick={handleConfirmationCancel}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationMessage && (
        <div className="confirmation-message">
          <p>{confirmationMessage}</p>
          <Link to="/">Quay lại Trang chủ</Link>
        </div>
      )}
    </div>
  );
}

export default ResetAppointmentPage;
