import React from 'react';
import { FaUser, FaCalendarAlt } from 'react-icons/fa';
import './TreatmentProcess.css';

const TreatmentProcess = () => {
  const patientName = 'Đỗ Quang Lực';
  const appointmentDate = '28 Tháng 4, 2023';
  const treatingDoctor = 'Dr. Emily Nguyen';
  const service = 'Trám răng';
  const treatmentProcessContent = 'Nội dung quy trình điều trị từ cơ sở dữ liệu';
  const treatmentResultContent = 'Nội dung kết quả điều trị từ cơ sở dữ liệu';
  const notesContent = 'Nội dung ghi chú từ cơ sở dữ liệu';

  return (
    <div className="treatment-process">
      <h2 className="treatment-process__title">Xem quy trình điều trị</h2>
      <div className="treatment-process__info">
        <p className="treatment-process__info-item"><FaUser /> Bệnh Nhân: {patientName}</p>
        <p className="treatment-process__info-item"><FaCalendarAlt /> Ngày khám: {appointmentDate}</p>
        <p className="treatment-process__info-item"><FaUser /> Bác sĩ điều trị: {treatingDoctor}</p>
        <p className="treatment-process__info-item"><FaUser /> Dịch vụ: {service}</p>
      </div>
      <div className="treatment-process__details">
        <div className="treatment-process__section">
          <h3 className="treatment-process__subheading">Quy trình điều trị:</h3>
          <p className="treatment-process__text">{treatmentProcessContent}</p>
        </div>
        <div className="treatment-process__section">
          <h3 className="treatment-process__subheading">Kết quả điều trị:</h3>
          <p className="treatment-process__text">{treatmentResultContent}</p>
        </div>
        <div className="treatment-process__section">
          <h3 className="treatment-process__subheading">Ghi chú:</h3>
          <p className="treatment-process__text">{notesContent}</p>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProcess;
