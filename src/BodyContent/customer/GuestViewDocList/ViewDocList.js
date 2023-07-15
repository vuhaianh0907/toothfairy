import React from 'react';
import './ViewDocList.css';
import { data } from '../../../shared/ListOfDoctors';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GuestViewDocList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    specialization: '',
    experience: '',
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredDoctors = data.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filters.specialization === '' || doctor.specialization === filters.specialization) &&
      (filters.experience === '' || doctor.experience === filters.experience)
    );
  });

  return (
    <div className="container">
      <h1>Danh sách Bác sĩ</h1>
      <p>Mô tả ngắn gọn về danh sách bác sĩ để khách truy cập hiểu được mục tiêu của trang.</p>

      <div className="filters">
        <input type="text" placeholder="Tìm kiếm theo tên" value={searchQuery} onChange={handleSearch} />

        <div>
          <label>Chuyên ngành:</label>
          <select name="specialization" value={filters.specialization} onChange={handleFilterChange}>
            <option value="">Tất cả</option>
            <option value="Răng hàm mặt">Răng hàm mặt</option>
            <option value="Nha khoa tổng quát">Nha khoa tổng quát</option>
            {/* Thêm các lựa chọn chuyên ngành khác */}
          </select>
        </div>

        <div>
          <label>Kinh nghiệm:</label>
          <select name="experience" value={filters.experience} onChange={handleFilterChange}>
            <option value="">Tất cả</option>
            <option value="10 năm">10 năm trở lên</option>
            <option value="5 năm">5-10 năm</option>
            {/* Thêm các lựa chọn kinh nghiệm khác */}
          </select>
        </div>
      </div>

      <div className="doctor-list">
        {filteredDoctors.slice(0, 8).map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <img src={doctor.img} alt={doctor.name} />
            <div className="doctor-details">
              <h3>{doctor.name}</h3>
              <p className="doctor-info">{doctor.info}</p>
            </div>
            <Link to={`/Doctor/${doctor.id}`}>
              <button className="btn">Xem chi tiết</button>
            </Link>
          </div>
        ))}
      </div>

      <div className="advertisement">
        {/* Thêm block quảng cáo hoặc thông tin khác */}
      </div>
    </div>
  );
}
