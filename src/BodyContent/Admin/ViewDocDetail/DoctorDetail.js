import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './DoctorDetail.css';

const DoctorDetail = () => {
  const { doctorId } = useParams(); // Truy cập vào doctorId từ URL parameter

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorPromise = axios.get(`http://localhost:3000/api/account/doctor/details?id=${doctorId}`);
        const slotsPromise = axios.get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${doctorId}`);

        const [doctorResponse, slotsResponse] = await Promise.all([doctorPromise, slotsPromise]);

        const doctorData = doctorResponse.data.doctor;
        const slotsData = slotsResponse.data.slots;

        setDoctorInfo(doctorData);
        setSlots(slotsData);
      } catch (error) {
        console.error(error);
        // Xử lý lỗi nếu có
      }
    };

    fetchData();
  }, [doctorId]);
  useEffect(() => {
    // Đặt giá trị mặc định cho selectedDate là ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
  }, []);


  const handleEditInfo = () => {
    // Thực hiện các thao tác cần thiết khi click vào nút chỉnh sửa
    console.log('Chỉnh sửa thông tin bác sĩ');
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSlotClick = (slotTime) => {
    // Xử lý khi người dùng nhấp vào slot time
    console.log('Selected slot time:', slotTime);
  };

  const filteredSlots = selectedDate
    ? slots.filter((slot) => slot.date === selectedDate)
    : slots;

  // Kiểm tra xem dữ liệu có được tải lên từ server hay chưa
  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-detail">
      <div className="avatar-container">
        <img src={doctorInfo.avatar} alt="Doctor Avatar" className="doctor-avatar" />
      </div>
      <div className="info-container">
        <div className="doctor-name">{doctorInfo.fullname}</div>
        <div className="doctor-info">
          <span className="info-label">ID Card:</span>
          <span>{doctorInfo.idCard}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Gender:</span>
          <span>{doctorInfo.gender}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Date of Birth:</span>
          <span>{doctorInfo.dateOfBirth}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Phone Number:</span>
          <span>{doctorInfo.phone}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Email:</span>
          <span>{doctorInfo.email}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Address:</span>
          <span>{doctorInfo.address}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">qualification:</span>
          <span>{doctorInfo.qualification}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Experience:</span>
          <span>{doctorInfo.experience}</span>
        </div>
        
        <div className="filter-container">
        <label htmlFor="dateFilter">Select Date:</label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="slots-container">
        <h3>Slots:</h3>
        {filteredSlots.length > 0 ? (
          filteredSlots.map((slot) => (
            <button
              key={slot.id}
              className="slot-button"
              onClick={() => handleSlotClick(slot.time)}
            >
              {slot.time}
            </button>
          ))
        ) : (
          <div>No slots available</div>
        )}
      </div>
      <div className="edit-button-container">
        <Link to={`/admin/doctor/update/${doctorId}`} className="edit-button">
          Edit Information
        </Link>
      </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
