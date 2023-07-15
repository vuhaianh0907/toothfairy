import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../assets/images/logo-01-01.png';
import avatar from '../assets/images/avatar.jpg';
import './header.scss';

export default function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const storedUserString = sessionStorage.getItem('token');
  const user = JSON.parse(storedUserString);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expirationTime');
    window.location.href = '/login';
  };

  const handleOptionClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav id="header" className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/doctorlist">
                      List Doctor
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/admin/createslot">
                      Create Slot
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to={`/customer/topupwallet/${user.id}`}>
                      Momo
                    </Link>
                  </li>
                  
                </>
              )}
            </ul>
            <div>
              {isLoggedIn ? (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={avatar}
                      width="40"
                      height="40"
                      className="rounded-circle"
                      alt="Avatar"
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {user && user.role === 'doctor' && (
                      <li>
                        <Link
                          to={`/doctor/profile/${user.id}`}
                          onClick={handleOptionClick}
                          className="dropdown-item"
                        >
                          Xem thông tin cá nhân
                        </Link>
                      </li>
                    )}
                    {user && user.role === 'customer' && (
                      <li>
                        <Link
                          to={`/customer/profile/${user.id}`}
                          onClick={handleOptionClick}
                          className="dropdown-item"
                        >
                          Xem thông tin cá nhân
                        </Link>
                      </li>
                    )}
                    {user && user.role === 'admin' && (
                      <li>
                        <Link
                          to="/admin/createdoctor"
                          onClick={handleOptionClick}
                          className="dropdown-item"
                        >
                          Tạo Bác Sĩ
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/customer/profile/edit"
                        onClick={handleOptionClick}
                        className="dropdown-item"
                      >
                        Chỉnh sửa thông tin
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/customer/treatmentprofile/treatment"
                        onClick={handleOptionClick}
                        className="dropdown-item"
                      >
                        Xem hồ sơ bệnh
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/changepass"
                        onClick={handleOptionClick}
                        className="dropdown-item"
                      >
                        Đổi mật khẩu
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        onClick={() => {
                          handleLogout();
                          handleOptionClick();
                        }}
                        className="dropdown-item"
                      >
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link className="btn btn-primary" to="/login">
                  Đăng nhập
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
