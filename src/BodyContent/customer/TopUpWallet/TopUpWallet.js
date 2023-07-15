import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopUpWallet.css';
import {useParams} from 'react-router-dom';
const TopUpWallet = () => {
  const [userData, setUserData] = useState(null);
  const [QR, setQR] = useState(null);
  const { id } = useParams();
  const note = `nap tien ${id}`;
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/account/customer/details?id=${id}`); // Thay đổi URL API tùy theo yêu cầu của bạn
        setUserData(response.data);
        
       
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);

  

  return (
    <div className="top-up-wallet">
      {userData ? (
        <div>

          <h2 className="user-info-heading">Nạp tự động qua ví momo</h2>
          <p className="user-info">MOMO: 0911413402</p>
          <p className="user-info">Nội dung chuyển khoản: nap tien {id}</p>
          <img src={`https://momosv3.apimienphi.com/api/QRCode?phone=0911413402&amount=0&note=${note}`} />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default TopUpWallet;
