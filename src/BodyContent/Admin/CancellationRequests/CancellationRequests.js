import React, { useState } from 'react';
import './CancellationRequests.css';

const CancellationRequests = () => {
  const [currentPendingPage, setCurrentPendingPage] = useState(1);
  const [currentApprovedPage, setCurrentApprovedPage] = useState(1);
  const requestsPerPage = 3;

  const cancellationRequests = [
    {
      id: 1,
      patientName: 'John Doe',
      doctorName: 'Dr. Emily Nguyen',
      reason: 'Emergency situation',
      status: 'Pending',
      date: '2023-07-01',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      doctorName: 'Dr. David Johnson',
      reason: 'Change of schedule',
      status: 'Pending',
      date: '2023-07-02',
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      doctorName: 'Dr. Sophia Lee',
      reason: 'Family emergency',
      status: 'Pending',
      date: '2023-07-03',
    },
    {
      id: 4,
      patientName: 'Emma Wilson',
      doctorName: 'Dr. Jacob Anderson',
      reason: 'Illness',
      status: 'Pending',
      date: '2023-07-04',
    },
    {
      id: 5,
      patientName: 'Oliver Taylor',
      doctorName: 'Dr. Olivia Martin',
      reason: 'Unexpected travel',
      status: 'Pending',
      date: '2023-07-05',
    },
    {
      id: 6,
      patientName: 'Sophia Allen',
      doctorName: 'Dr. Ethan Garcia',
      reason: 'Change of plans',
      status: 'Approved',
      date: '2023-07-01',
    },
    {
      id: 7,
      patientName: 'Noah Walker',
      doctorName: 'Dr. Ava Robinson',
      reason: 'Work commitment',
      status: 'Approved',
      date: '2023-07-02',
    },
    {
      id: 8,
      patientName: 'Isabella Clark',
      doctorName: 'Dr. Logan Mitchell',
      reason: 'Personal reasons',
      status: 'Approved',
      date: '2023-07-03',
    },
    {
      id: 9,
      patientName: 'James Baker',
      doctorName: 'Dr. Mia Nelson',
      reason: 'Unforeseen circumstances',
      status: 'Approved',
      date: '2023-07-04',
    },
    {
      id: 10,
      patientName: 'Charlotte Turner',
      doctorName: 'Dr. Noah Martinez',
      reason: 'Other commitments',
      status: 'Approved',
      date: '2023-07-05',
    },

  ];

  const pendingRequests = cancellationRequests.filter(
    (request) => request.status === 'Pending'
  );
  const approvedRequests = cancellationRequests.filter(
    (request) => request.status === 'Approved'
  );

  const pendingPagesCount = Math.ceil(pendingRequests.length / requestsPerPage);
  const approvedPagesCount = Math.ceil(approvedRequests.length / requestsPerPage);

  const handlePendingPageChange = (pageNumber) => setCurrentPendingPage(pageNumber);
  const handleApprovedPageChange = (pageNumber) => setCurrentApprovedPage(pageNumber);

  const renderPendingRequests = () => {
    const startIndex = (currentPendingPage - 1) * requestsPerPage;
    const endIndex = startIndex + requestsPerPage;
    const currentRequests = pendingRequests.slice(startIndex, endIndex);

    return currentRequests.map((request) => (
      <div className="request" key={request.id}>
        <div className="request-info">
          <p className="request-patient">{request.patientName}</p>
          <p className="request-doctor">{request.doctorName}</p>
          <p className="request-reason">{request.reason}</p>
        </div>
        <div className="request-status">
          <p className="request-date">{request.date}</p>
          <div className="request-actions">
            <button className="action-button reject-button">Từ chối</button>
            <button className="action-button approve-button">Duyệt</button>
          </div>
        </div>
      </div>
    ));
  };

  const renderApprovedRequests = () => {
    const startIndex = (currentApprovedPage - 1) * requestsPerPage;
    const endIndex = startIndex + requestsPerPage;
    const currentRequests = approvedRequests.slice(startIndex, endIndex);

    return currentRequests.map((request) => (
      <div className="request" key={request.id}>
        <div className="request-info">
          <p className="request-patient">{request.patientName}</p>
          <p className="request-doctor">{request.doctorName}</p>
          <p className="request-reason">{request.reason}</p>
        </div>
        <div className="request-status">
          <p className="request-date">{request.date}</p>
          <p className="request-approval">{request.status === 'Approved' ? 'Đã duyệt' : 'Từ chối'}</p>
        </div>
      </div>
    ));
  };

  const renderPaginationItems = (pagesCount, currentPage, handlePageChange) => {
    const paginationItems = [];

    for (let i = 1; i <= pagesCount; i++) {
      paginationItems.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return paginationItems;
  };

  return (
    <div className="cancellation-requests">
      <h1>Các yêu cầu hủy booking</h1>
      <div className="requests-container">
        <div className="requests-section">
          <h2>Đang chờ phê duyệt</h2>
          <div className="request-list pending-requests">
            {renderPendingRequests()}
          </div>
          <div className="pagination">
            {currentPendingPage > 1 && (
              <button
                className="pagination-button"
                onClick={() => handlePendingPageChange(currentPendingPage - 1)}
              >
                &lt;
              </button>
            )}
            {renderPaginationItems(pendingPagesCount, currentPendingPage, handlePendingPageChange)}
            {currentPendingPage < pendingPagesCount && (
              <button
                className="pagination-button"
                onClick={() => handlePendingPageChange(currentPendingPage + 1)}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
        <div className="requests-section">
          <h2>Đơn đã phê duyệt</h2>
          <div className="request-list approved-requests">
            {renderApprovedRequests()}
          </div>
          <div className="pagination">
            {currentApprovedPage > 1 && (
              <button
                className="pagination-button"
                onClick={() => handleApprovedPageChange(currentApprovedPage - 1)}
              >
                &lt;
              </button>
            )}
            {renderPaginationItems(approvedPagesCount, currentApprovedPage, handleApprovedPageChange)}
            {currentApprovedPage < approvedPagesCount && (
              <button
                className="pagination-button"
                onClick={() => handleApprovedPageChange(currentApprovedPage + 1)}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRequests;
