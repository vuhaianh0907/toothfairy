import React, { useState } from 'react';
import axios from 'axios';
import './AddAmountPage.scss';

function AddAmountPage() {
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConfirmation = (action) => {
    setSelectedAction(action);
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleSubmit = () => {
    if (customerId === '' || amount === '') {
      setErrorMessage('Vui lòng nhập ID khách hàng và số tiền');
      return;
    }

    const requestData = {
      customerId,
      amount: parseInt(amount),
    };

    let apiUrl = '';

    if (selectedAction === 'add') {
      apiUrl = 'http://localhost:3000/api/account/customer/addAmount';
    } else if (selectedAction === 'subtract') {
      apiUrl = 'http://localhost:3000/api/account/customer/subtractAmount';
    }

    axios
      .post(apiUrl, requestData)
      .then((response) => {
        setCustomerId('');
        setAmount('');
        setErrorMessage('');
        setSuccessMessage(response.data.message); // Update success message from response data
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(`Lỗi khi ${selectedAction === 'add' ? 'cộng' : 'trừ'} tiền`);
      });

    setShowConfirmation(false);
  };

  return (
    <div className="add-amount-page">
      <h2>Cộng/Trừ tiền cho khách hàng</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="input-fields">
        <div className="form-group">
          <label htmlFor="customerId">ID khách hàng:</label>
          <input type="text" className="form-control" id="customerId" value={customerId} onChange={handleCustomerIdChange} />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Số tiền:</label>
          <input type="number" className="form-control" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-primary" onClick={() => handleConfirmation('add')}>
          Cộng tiền
        </button>
        <button className="btn btn-primary" onClick={() => handleConfirmation('subtract')}>
          Trừ tiền
        </button>
      </div>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>Bạn có chắc chắn muốn {selectedAction === 'add' ? 'cộng' : 'trừ'} tiền cho khách hàng?</p>
            <div className="confirmation-buttons">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Xác nhận
              </button>
              <button className="btn btn-secondary" onClick={handleConfirmationClose}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAmountPage;
