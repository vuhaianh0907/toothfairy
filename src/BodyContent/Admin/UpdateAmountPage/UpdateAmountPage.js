import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateAmountPage.css';

const UpdateAmountPage = () => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/amount/get')
      .then((response) => {
        setAmount(response.data.amount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConfirm = () => {
    axios
      .post('http://localhost:3000/api/amount/update', { amount: amount })
      .then((response) => {
        console.log('Amount updated successfully');
      })
      .catch((error) => {
        console.error('Error updating amount:', error);
      });
  };

  return (
    <div className="update-amount-page">
      <h2>Update Amount</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="amount-container">
          <p className="amount-label">Current Amount:</p>
          <p className="amount-value">{amount}</p>
          <input type="number" value={amount} onChange={handleAmountChange} />
          <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default UpdateAmountPage;
