import React, { useState } from 'react';

export default function DoctorViewBooking() {
    const [appointments, setAppointments] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    // Dữ liệu mẫu danh sách phiếu đặt lịch khám
    const sampleAppointments = [
        {
            id: 1,
            avatar: '.../',
            service: 'Khám tổng quát',
            status: 'Đã khám',
            bookingStatus: 'Hoàn thành',
        },
        {
            id: 2,
            avatar: 'https://example.com/avatar2.png',
            service: 'Khám tổng quát',
            status: 'Đang chờ khám',
            bookingStatus: 'Gửi yêu cầu hủy đơn',
        },
        // Thêm các phiếu đặt lịch khám khác vào đây
    ];

    // Dữ liệu mẫu lịch trình khám
    const sampleSchedule = [
        {
            id: 1,
            avatar: 'https://example.com/avatar3.png',
            service: 'Khám tổng quát',
            status: 'Đã khám',
            bookingStatus: 'Hoàn thành',
        },
        {
            id: 2,
            avatar: 'https://example.com/avatar4.png',
            service: 'Khám tổng quát',
            status: 'Đang chờ khám',
            bookingStatus: 'Gửi yêu cầu hủy đơn',
        },
        // Thêm lịch trình khám khác vào đây
    ];

    // Xử lý khi nhấn vào nút "Xem phiếu khám"
    const handleViewAppointment = (appointment) => {
        setSelectedAppointment(appointment);
    };

    // Xử lý khi đóng pop-up
    const handleClosePopup = () => {
        setSelectedAppointment(null);
    };

    return (
        <div>
            <h1>Danh sách phiếu đặt lịch khám</h1>
            {sampleAppointments.map((appointment) => (
                <div key={appointment.id}>
                    <img src={appointment.avatar} alt="Avatar" />
                    <p>Loại dịch vụ: {appointment.service}</p>
                    <p>Trạng thái: {appointment.status}</p>
                    <button onClick={() => handleViewAppointment(appointment)}>
                        Xem phiếu khám
                    </button>
                    <p>Trạng thái phiếu đặt: {appointment.bookingStatus}</p>
                </div>
            ))}

            <div className="pagination">
                {/* Hiển thị các nút điều hướng và số trang */}
            </div>

            <h1>Lịch trình khám</h1>
            {sampleSchedule.map((appointment) => (
                <div key={appointment.id}>
                    <img src={appointment.avatar} alt="Avatar" />
                    <p>Loại dịch vụ: {appointment.service}</p>
                    <p>Trạng thái: {appointment.status}</p>
                    <button onClick={() => handleViewAppointment(appointment)}>
                        Xem phiếu khám
                    </button>
                    <p>Trạng thái phiếu đặt: {appointment.bookingStatus}</p>
                </div>
            ))}

            <div className="pagination">
                {/* Hiển thị các nút điều hướng và số trang */}
            </div>

            {/* Pop-up "Phiếu đặt lịch khám" */}
            {selectedAppointment && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Phiếu đặt lịch khám</h2>
                        <p>Họ và tên người đặt lịch khám: {selectedAppointment.name}</p>
                        <p>Ngày khám bệnh: {selectedAppointment.date}</p>
                        <p>Loại dịch vụ khám: {selectedAppointment.service}</p>
                        <p>Thời gian khám: {selectedAppointment.time}</p>
                        <div>Nội dung khám: {selectedAppointment.content}</div>
                        <p>Trạng thái phiếu đặt: {selectedAppointment.bookingStatus}</p>
                        <button onClick={() => handleViewPatientProfile(selectedAppointment.patientId)}>
                            Xem hồ sơ bệnh nhân
                        </button>
                        <button onClick={handleClosePopup}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}
