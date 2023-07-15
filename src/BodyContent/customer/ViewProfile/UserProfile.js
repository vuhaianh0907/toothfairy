import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGenderless, FaCalendarAlt, FaUser, FaMoneyBillAlt } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`);
        const userData = response.data.customer;
        setUser(userData);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditProfile = () => {
    navigate(`/customer/profile/edit/${id}`);
  };

  const handleViewAppointments = () => {
    // Xử lý sự kiện xem danh sách phiếu khám
    console.log('Xem danh sách phiếu khám');
  };

  const handleViewMedicalRecords = () => {
    // Xử lý sự kiện xem danh sách hồ sơ bệnh
    console.log('Xem danh sách hồ sơ bệnh');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-profile__avatar">
        <img src="https://source.unsplash.com/random/200x200" alt="Avatar" className="avatar-image" />
      </div>
      <div className="user-profile__info">
        <h2 className="user-profile__name">Tên: {user.fullname}</h2>
        <div className="user-profile__column">
          <p><FaEnvelope /> Email: {user.email}</p>
          <p><FaMapMarkerAlt /> Địa chỉ: {user.address}</p>
          <p><FaPhone /> Điện thoại: {user.phone}</p>
        </div>
        <div className="user-profile__column">
          <p><FaGenderless /> Giới tính: {user.gender}</p>
          <p><FaCalendarAlt /> Ngày tạo: {user.createdAt}</p>
          <p><FaCalendarAlt /> Ngày cập nhật: {user.updatedAt}</p>
          <p><FaUser /> Vai trò: {user.role}</p>
          <p><FaMoneyBillAlt /> Số dư: {user.balance}</p>
        </div>
      </div>
      <button className="edit-profile-button" onClick={handleEditProfile}>Chỉnh sửa thông tin</button>
      <div className="user-profile__actions">
        <button className="user-profile__action-button" onClick={handleViewAppointments}>
          Xem danh sách phiếu khám
        </button>
        <button className="user-profile__action-button" onClick={handleViewMedicalRecords}>
          Xem danh sách hồ sơ bệnh
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
