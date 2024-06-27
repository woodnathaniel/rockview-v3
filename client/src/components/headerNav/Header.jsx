 import React from 'react'
import NavBar from '../navbar/NavBar'
import '../headerNav/header.css'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useNavigate } from "react-router-dom";




export const Header = ({imgUrl}) =>{

  const bookingPageNavigate = useNavigate();
  const handleClick = () => {
    // Navigate to the desired route on button click
    bookingPageNavigate("/booking");
  };

  return (
    <div className='header__container' style={{
      backgroundImage:  `url(${imgUrl})`,
      }}>
      <NavBar />
      <section className='header__text'>
        <h5>WELCOME TO</h5>
        <h2>ROCKVIEW</h2>
        <h4>HOTEL</h4>
        <p>Book your stay and enjoy Luxury, <br /> redifined at one of the most affordable rates</p>
      </section>
      <button onClick={()=>{handleClick()}}> <PermContactCalendarIcon/> BOOK NOW</button>
    </div>
  )

}