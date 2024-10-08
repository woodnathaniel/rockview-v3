 import React from 'react'
import NavBar from '../navbar/NavBar'
import '../headerNav/header.css'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useNavigate } from "react-router-dom";




export const Header = ({imgUrl}) =>{

  const bookingPageNavigate = useNavigate();
  const handleClick = () => {
    bookingPageNavigate("/booking");
  };

  return (
    <div className='header__container' style={{
      // backgroundImage:  `url(${imgUrl})`,
      }}>
        <img className='header__image' src={imgUrl} alt="Header Picture" />
      <NavBar />
      <div className='sub-title'>
        <section className='header__text'>
          <h5>WELCOME TO</h5>
          <h2>ROCKVIEW</h2>
          <h4>HOTEL</h4>
          <p>Book your stay and enjoy Luxury, <br /> redifined at one of the most affordable rates</p>
        </section>
        <button onClick={()=>{handleClick()}}> <PermContactCalendarIcon/> BOOK NOW</button>
      </div>
      
    </div>
  )

}