import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './LoginBar.css';

export default function LoginBar() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        axios
            .post('https://dencelclinic.onrender.com/api/auth/login', data)
            .then((response) => {
                console.log(response.data);
                setIsLoggedIn(true);
                setShowOptions(true);
                alert(`Chào mừng ${response.data.fullname}!`); // Hiển thị thông báo chào mừng
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
    };

    const handleGoogleLoginSuccess = (response) => {
        console.log(response);
    };

    const handleGoogleLoginFailure = (error) => {
        console.log(error);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <div>Xin chào!</div>
                    {showOptions && (
                        <div>
                            {/* Hiển thị các tùy chọn */}
                            <ul>
                                <li>
                                    <Link to="/profile">Xem thông tin cá nhân</Link>
                                </li>
                                <li>
                                    <Link to="/edit-profile">Chỉnh sửa thông tin</Link>
                                </li>
                                <li>
                                    <Link to="/admin/createdoctor">Tạo Bác Xĩ</Link>
                                </li>
                                <li>
                                    <Link to="/medical-records">Xem hồ sơ bệnh</Link>
                                </li>
                                <li>
                                    <Link to="/change-password">Đổi mật khẩu</Link>
                                </li>
                                <li>
                                    <Link to="/logout" onClick={handleLogout}>
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <form className="login-form" onSubmit={handleSubmit}>
                    <h3>Đăng nhập</h3>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit">Đăng nhập</button>

                    <div className="login-links">
                        <Link to="/register">Đăng ký tài khoản</Link>
                        <Link to="/forgot-password">Quên mật khẩu</Link>
                    </div>

                    <div className="social">
                        <GoogleLogin
                            clientId="YOUR_GOOGLE_CLIENT_ID"
                            buttonText=" Đăng nhập bằng Google"
                            onSuccess={handleGoogleLoginSuccess}
                            onFailure={handleGoogleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </form>
            )}
        </div>
    );
}
