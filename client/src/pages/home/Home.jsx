import React from 'react';
import '../home/home.css'
import {Header} from '../../components/headerNav/Header.jsx';
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import SecurityIcon from "@mui/icons-material/Security";
import TourIcon from "@mui/icons-material/Tour";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Footer from '../../components/footer/Footer.jsx';




const Home = () => {
  return (
    <div className='mainCont'>
      <section className="homeMain__container">
          <Header  imgUrl= 'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5705.JPG?alt=media&token=e744cdd1-f678-4e85-8b15-3b617bc6f1b7'/>
          
      </section>

      {/* service icons section*/}
      <section className='service'>
        <h1>Our Service Review</h1>
          <div className='service__icons'>
            <div className='icons'>
            <LocalCarWashIcon/>
              <h3>Free </h3>
              <h3>Carwash</h3>
            </div>

            <div className='icons'>
            <SecurityIcon/>
              <h3> 24/7 </h3>
              <h3>security</h3>
            </div>

            <div className='icons'>
              <TourIcon/>
              <h3> Tour  </h3>
              <h3>Assitance</h3>
            </div>

            <div className='icons'>
              <AirportShuttleIcon/>
              <h3>Shuttle</h3>
              <h3>Services</h3>
            </div>

            <div className='icons'>
              <RestaurantIcon/>
              <h3>Restaurant</h3>
            </div>

            <div className='icons'>
              <AirplaneTicketIcon/>
              <h3>Flight</h3>
              <h3>Booking</h3>
            </div>
        </div>
        
      </section>


      <section className='home__picSection'>
        <div className='picSection__first'>
          <header>
            <h3>Luxury redefined</h3>
            <p> 
              Our Rooms are designed to transport <br /> you into an
              environment made for leisure. <br />
              Take your mind off the day-to-day of home <br />
              life and private paradise for yourself.
            </p>
            {/* <button>Explore</button> */}
          </header>
          <div className="pic"></div>
        </div>

        <div className='picSection__first'>
          <header>
              <h3>Book your stay and enjoy the eco-friendliness of our environment.</h3>
              <p> 
              The hotel is located at the midst of <br />several local communities
              who have co-existed <br />peacefully with a unique culture identity.
              <br />Take your mind off the day-to-day of home
                life and private paradise for yourself.
              </p>
              {/* <button>Explore</button> */}
            </header>
            <div className="pic_second"></div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
