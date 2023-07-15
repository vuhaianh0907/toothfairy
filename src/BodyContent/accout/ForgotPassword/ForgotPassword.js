import React from 'react';
import './ForgotPassword.scss';

export default function ForgotPassword() {
    const [email, setEmail] = React.useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Thực hiện xử lý gửi email đặt lại mật khẩu với địa chỉ email đã nhập
    };

    return (
        <div id="ForgotPassword" className="forgot-password-container">

            <form onSubmit={handleSubmit}>
                <h2>Quên mật khẩu</h2>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                <button type="submit" name="action" value="reset">Đặt lại mật khẩu</button>
                <div className='back-to-login'>
                    <a href="/login" className='register-link'>Quay lại đăng nhập</a>
                </div>
            </form>

        </div>


    );
}
