import React, { useState } from 'react';
import axios from 'axios';
import './ChangePass.scss';
import { useNavigate } from 'react-router-dom';

function ChangePass() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const storedUserString = sessionStorage.getItem("token");
  const user = JSON.parse(storedUserString);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra mật khẩu hiện tại và xác nhận mật khẩu mới
    if (password === '') {
      setErrorMessage('Vui lòng nhập mật khẩu hiện tại');
      return;
    }

    if (newPassword === '') {
      setErrorMessage('Vui lòng nhập mật khẩu mới');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }
    const email = user.email;
    try {
      const response = await axios.post('http://localhost:3000/api/auth/changepass', {
        email,
        password,
        newPassword,
      });

      // Xử lý phản hồi từ API (nếu cần)
      console.log(response.data);

      // Đặt lại các trường dữ liệu
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');

      if (response.status === 200) {
        navigate('/');
      } else {
        setErrorMessage(response.data.error);
        return;
      }
    } catch (error) {
      // Xử lý lỗi từ API (nếu cần)
    }
  };

  return (
    <div id="ChangePass" className="change-pass">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Thay đổi mật khẩu</h2>
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
          <input
            type="password"
            id="currentPassword"
            value={password}
            onChange={handleChangePassword}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleChangeNewPassword}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Thay đổi mật khẩu</button>
      </form>
    </div>
  );
}

export default ChangePass;
