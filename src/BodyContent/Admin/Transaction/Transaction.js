import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transaction.css'; // Import CSS file

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage,setCurrentPage] = useEffect(1);
  const perPage = useState(5);

  useEffect(() => {
    fetchTransactions(); // Gọi hàm fetchTransactions để lấy dữ liệu giao dịch từ API
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/transaction/getall');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="transaction-list">
      <h1>Transaction List</h1>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Partner ID</th>
            <th>Amount</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.partnerId}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.comment}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
