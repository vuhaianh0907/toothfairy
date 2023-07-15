import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ViewDocDetail.css';
import axios from 'axios';

export default function ViewDocDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Send GET request to fetch doctor details
    axios
      .get(`http://localhost:3000/api/account/doctor/details?id=${id}`)
      .then((response) => {
        // Handle the response from the API
        setDoctor(response.data.doctor);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('API Error:', error);
      });

    // Send GET request to fetch slots for the doctor
    axios
      .get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${id}`)
      .then((response) => {
        // Handle the response from the API
        const filteredSlots = response.data.slots.filter((slot) => slot.status === 'available');
        setSlots(filteredSlots);
      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('API Error:', error);
      });
  }, [id]);

  useEffect(() => {
    // Set default value for selectedDate as tomorrow
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

  const handleSlotClick = (slotId) => {
    // Xử lý khi người dùng nhấp vào lịch hẹn
    console.log("Selected slot:", slotId);
  };

  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
    : slots;

  return (
    <div className="container">
      {doctor ? (
        <div className="doctor-profile">
          <img src={doctor.avatar} alt="Doctor Profile" className="profile-picture" />
          <h2 className="doctor-name">{doctor.fullname}</h2>
          <div className="doctor-information">
            <h3>Thông tin bác sĩ</h3>
            <div className="info-item">
              <h4>Chứng chỉ:</h4>
              <p>{doctor.qualification}</p>
            </div>
            <div className="info-item">
              <h4>Kinh nghiệm:</h4>
              <p>{doctor.experience}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

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
                <Link to={`/customer/slot/appointment/${slot.id}`}>
                  <button className="slot-button" onClick={() => handleSlotClick(slot.id)}>
                    {slot.time}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Không có lịch hẹn khả dụng</p>
        )}
      </div>
    </div>
  );
}
