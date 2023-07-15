import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './DoctorViewProfile.css';
import axios from 'axios';

const DoctorViewProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const doctorPromise = await axios.get(`http://localhost:3000/api/account/doctor/details?id=${id}`);

        const slotsPromise = axios.get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${id}`);
        const [doctorResponse, slotsResponse] = await Promise.all([doctorPromise, slotsPromise]);
        const doctorData = doctorResponse.data.doctor;
        const slotsData = slotsResponse.data.slots;
        setDoctorInfo(doctorData);
        setSlots(slotsData);
      } catch (error) {
        console.log('Error fetching doctor info:', error);
      }
    };

    fetchDoctorInfo();
  }, [id]);

  useEffect(() => {
    // Tính toán ngày mai
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Định dạng ngày thành chuỗi yyyy-MM-dd
    const tomorrowFormatted = tomorrow.toISOString().split('T')[0];

    // Đặt giá trị mặc định cho selectedDate
    setSelectedDate(tomorrowFormatted);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      // Hiển thị popup và lưu slot đã chọn
      setShowPopup(true);
      setSelectedSlot(slot);
    }
  };

  const handlePopupClose = () => {
    // Đóng popup và xóa slot đã chọn
    setShowPopup(false);
    setSelectedSlot(null);
  };

  const handleConfirmClick = async () => {
    try {
      // Gửi yêu cầu API để cập nhật trạng thái slot
      const response = await axios.post(`http://localhost:3000/api/slot/updateStatus`, {
        slotId: selectedSlot.id,
        status: 'closed',
      });
      console.log('Slot updated successfully:', response.data);

      // Đóng popup và làm mới danh sách slot
      setShowPopup(false);
      setSelectedSlot(null);
      fetchSlots();
    } catch (error) {
      console.log('Error updating slot:', error);
    }
  };

  const fetchSlots = async () => {
    try {
      const slotsPromise = axios.get(`http://localhost:3000/api/slot/getSlotbyDoctor?doctorId=${id}`);
      const slotsResponse = await slotsPromise;
      const slotsData = slotsResponse.data.slots;
      setSlots(slotsData);
    } catch (error) {
      console.log('Error fetching slots:', error);
    }
  };

  const filteredSlots = selectedDate ? slots.filter((slot) => slot.date === selectedDate) : slots;

  const handleUpdateProfileClick = () => {
    navigate(`/doctor/updateprofile/${id}`); // Chuyển hướng đến trang chỉnh sửa
  };

  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="doctor-detail">
      <div className="avatar-container">
        <img src="https://via.placeholder.com/150" alt="Doctor Avatar" className="doctor-avatar" />
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
          <span className="info-label">Qualification:</span>
          <span>{doctorInfo.qualification}</span>
        </div>
        <div className="doctor-info">
          <span className="info-label">Experience:</span>
          <span>{doctorInfo.experience}</span>
        </div>
        <div className="filter-container">
          <label htmlFor="dateFilter">Select Date:</label>
          <input type="date" id="dateFilter" value={selectedDate} onChange={handleDateChange} />
        </div>

        <div className="slots-container">
          <h3>Slots:</h3>
          {filteredSlots.length > 0 ? (
            filteredSlots.map((slot) => (
              <button
                key={slot.id}
                className={`slot-button ${slot.status === 'available' ? 'green' : 'gray'}`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.time}
              </button>
            ))
          ) : (
            <div>No slots available</div>
          )}
        </div>

        <div className="options-button-container">
          <button className="options-button" onClick={handleUpdateProfileClick}>
            Chỉnh sửa
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Bạn có muốn đóng slot này không?</h3>
            <div className="popup-buttons">
              <button className="popup-button" onClick={handlePopupClose}>
                Đóng
              </button>
              <button className="popup-button" onClick={handleConfirmClick}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorViewProfile;
