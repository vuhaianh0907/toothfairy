import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './AdminCreateSlot.scss';

function CreateSchedulePage() {
  const [searchValue, setSearchValue] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [isScheduleCreated, setIsScheduleCreated] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const doctorsPerPage = 5;
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  const navigate = useNavigate();

  const fetchDoctorsByName = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/getAllDoctorByName?name=${searchValue}`);
      setDoctors(response.data.doctors);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching doctors by name:', error);
    }
  };

  const handleSearchDoctor = () => {
    fetchDoctorsByName();
  };

  useEffect(() => {
    fetchDoctorsByName();
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSelectStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleSelectEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleSelectShift = (shift) => {
    const updatedShifts = [...selectedShifts];
    if (updatedShifts.includes(shift)) {
      updatedShifts.splice(updatedShifts.indexOf(shift), 1);
    } else {
      updatedShifts.push(shift);
    }
    setSelectedShifts(updatedShifts);
  };

  const handleSaveSchedule = () => {
    if (selectedDoctor && startDate && endDate && selectedShifts.length > 0) {
      const newSchedule = {
        doctor: selectedDoctor,
        startDate: startDate,
        endDate: endDate,
        shifts: selectedShifts,
      };

      setIsLoading(true);

      axios
        .post('http://localhost:3000/api/slot/create', newSchedule)
        .then((response) => {
          setScheduleList([...scheduleList, newSchedule]);
          setIsScheduleCreated(true);
          toast.success('Lưu thành công!');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error creating schedule:', error);
          toast.error('Lưu thất bại!');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
    }
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <div className="admin-create-slot__container">
        <h2>Tạo Lịch Làm Việc</h2>

        <div>
          <h3>Tìm kiếm bác sĩ</h3>
          <div className="admin-create-slot__search-doctor">
            <input
              type="text"
              placeholder="Nhập tên bác sĩ"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleSearchDoctor}>Tìm kiếm</button>
          </div>
          <ul className="admin-create-slot__doctor-list">
            {currentDoctors.map((doctor) => (
              <li
                key={doctor.id}
                onClick={() => handleSelectDoctor(doctor)}
                className={selectedDoctor === doctor ? 'selected-doctor' : ''}
              >
                <img src={doctor.avatar} alt={doctor.fullname} />
                <p className={selectedDoctor === doctor ? 'selected-doctor-name' : ''}>{doctor.fullname}</p>
              </li>
            ))}
          </ul>

          <ul className="admin-create-slot__pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => paginate(pageNumber)}
                  className={currentPage === pageNumber ? 'active' : ''}
                >
                  <span className="pagination-number">{pageNumber}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedDoctor && (
          <div>
            <h3>Chọn khoảng thời gian</h3>
            <div>
              <label htmlFor="startDate">Ngày bắt đầu:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleSelectStartDate}
              />
            </div>
            <div>
              <label htmlFor="endDate">Ngày kết thúc:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleSelectEndDate}
              />
            </div>
          </div>
        )}

        {selectedDoctor && startDate && endDate && (
          <div>
            <h3>Chọn ca làm việc</h3>
            <div>
              <input
                type="checkbox"
                id="shift1"
                checked={selectedShifts.includes('Ca sáng')}
                onChange={() => handleSelectShift('Ca sáng')}
              />
              <label htmlFor="shift1">Ca sáng</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="shift2"
                checked={selectedShifts.includes('Ca chiều')}
                onChange={() => handleSelectShift('Ca chiều')}
              />
              <label htmlFor="shift2">Ca chiều</label>
            </div>
          </div>
        )}

        {selectedDoctor && startDate && endDate && selectedShifts.length > 0 && (
          <div>
            <button onClick={handleSaveSchedule} disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        )}

        {isScheduleCreated && (
          <div>
            <h3>Lịch đã tạo</h3>
            <p>Bác sĩ: {selectedDoctor.fullname}</p>
            <p>Ngày bắt đầu: {startDate}</p>
            <p>Ngàykết thúc: {endDate}</p>
            <p>Ca làm việc: {selectedShifts.join(', ')}</p>
          </div>
        )}

        <div>
          <table>
            <thead>
              <tr>
                <th>Bác sĩ</th>
                <th>Ngày</th>
                <th>Ca làm việc</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((schedule, index) => (
                <tr key={index}>
                  <td>{schedule.doctor.fullname}</td>
                  <td>{schedule.startDate} - {schedule.endDate}</td>
                  <td>{schedule.shifts.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateSchedulePage;
