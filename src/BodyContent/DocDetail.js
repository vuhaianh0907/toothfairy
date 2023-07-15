import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../shared/ListOfDoctors';
import './DocDetail.css';

export default function DocDetail() {
  const { id } = useParams();
  const player = data.find(obj => obj.id === id);

  if (!player) {
    return <div>Player not found</div>;
  }

  const cost = player.cost ? player.cost.toLocaleString() : 'N/A';

  return (
    <div className='container'>
      <div className='product-card'>
        <div className='badge'>{player.name}</div>
        <div className='product-tumb'>
          <img src={`../${player.img}`} alt='' />
        </div>
        <div className='product-details'>
          <h4>{player.club}</h4>
          <div className='product-price'>Market value: € {cost}</div>
          <p>{player.info}</p>
          <div className='product-bottom-details'></div>
          <button>Contract</button>
        </div>
      </div>
    </div>
  );
}
