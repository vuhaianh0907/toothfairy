import React, { useState } from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './LoginBar.scss';

export default function LoginBar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = (response) => {
    const userString = JSON.stringify(response.data.token);
    sessionStorage.setItem('token', userString);
    window.location.href = '/';
    console.log('Logged in successfully');
  };

  const handleLoginFailure = (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    axios
      .post('http://localhost:3000/api/auth/login', data)
      .then(handleLoginSuccess)
      .catch(handleLoginFailure);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error);
  };

  return (
    <div id="loginBar" className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-18 ">
          <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
              <h2>Đăng nhập</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập Mật khẩu"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button type="submit" className="btn btn-primary btn-block">Đăng Nhập</button>
              </form>

              <div className="login-links">
                <a href="/register">Đăng ký</a>
                <a href="/forgot-password">Quên mật khẩu</a>
              </div>

              <div className="social">
                <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  buttonText="Google"
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleLoginFailure}
                  cookiePolicy={'single_host_origin'}
                  className="btn btn-primary btn-block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
