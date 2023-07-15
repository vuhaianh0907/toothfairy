import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useParams, Link } from 'react-router-dom';
import './UpdateDoctor.css';
import axios from 'axios';

function AdminUpdateDoctor() {
  const [doctorInfo, setDoctorInfo] = useState({
    fullname: '',
    idCard: '',
    gender: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    qualification: '',
    experience: '',
    password: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { doctorId } = useParams();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/admin/getDoctor?doctorId=${doctorId}`);
        const doctorData = response.data.doctor;
        setDoctorInfo(doctorData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDoctorInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed) {
      try {
        setIsLoading(true);
        await axios.post(`http://localhost:3000/api/account/doctor/update?doctorId=${doctorId}`, doctorInfo);
        window.location.href = `http://localhost:3001/admin/doctordetail/${doctorId}`;
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // TODO: Handle cancellation logic, such as resetting the form or redirecting to another page
    }
  };

  return (
    <div className="form1">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <h2>Cập nhật thông tin bác sĩ</h2>
          <div className="form-group">
            <label>Họ tên:</label>
            <input type="text" name="fullname" value={doctorInfo.fullname} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>CMND/CCCD:</label>
            <input type="text" name="idCard" value={doctorInfo.idCard} onChange={handleChange} />
          </div>
          <div className="gender-options">
            <label>Giới tính:</label>
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={doctorInfo.gender === 'Nam'}
              onChange={handleChange}
            />{' '}
            Nam
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={doctorInfo.gender === 'Nữ'}
              onChange={handleChange}
            />{' '}
            Nữ
          </div>
          <div className="form-group">
            <label>Ngày tháng năm sinh:</label>
            <input type="date" name="dateOfBirth" value={doctorInfo.dateOfBirth} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={doctorInfo.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={doctorInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={doctorInfo.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Bằng cấp:</label>
            <input
              type="text"
              name="qualification"
              value={doctorInfo.qualification}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Kinh nghiệm làm việc:</label>
            <input
              type="text"
              name="experience"
              value={doctorInfo.experience}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit">Cập nhật</button>
            <button type="button" onClick={handleCancel}>
              Hủy bỏ
            </button>
          </div>
        </form>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3>Xác nhận</h3>
            <p>Bạn có chắc chắn muốn cập nhật/hủy bỏ?</p>
            <button onClick={() => handleConfirmation(true)}>Cập nhật</button>
            <button onClick={() => handleConfirmation(false)}>Hủy bỏ</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUpdateDoctor;
