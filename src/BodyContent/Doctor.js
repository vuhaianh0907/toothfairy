import './Doctor.css';
import React from 'react'
import { data } from "../shared/ListOfDoctors"
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Doctor() {
  const [player, setPlayer] = useState([])
  return (

    <div className='container'>
      {data.map((data) => (
        <div className='column'>
          <div className='card'>
            <img src={data.img} />
            <h3> {data.name} </h3>
            <p className='title'> {data.club} </p>
            <a href={`Doctor/${data.id}`}>
              <p><button className='btn'>Detail</button></p>
            </a>

          </div>
        </div>
      ))}
    </div>

  )
}
