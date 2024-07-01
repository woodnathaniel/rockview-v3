import { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import '../bookingScreen/bookingScreen.css'
import {BookingCard} from '../../components/bookingCard/BookingCard'
import axios from 'axios'
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import SecurityIcon from "@mui/icons-material/Security";
import TourIcon from "@mui/icons-material/Tour";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";


export default function () {

  const [rooms, setRooms] = useState([]);

  

  useEffect(() =>{
    const fetchData = async() =>{
      try {
        const data = (await axios.get('/api/rooms/getallrooms')).data
        setRooms(data.getroomsInfo);
        console.log(rooms);
      } 
      
      catch (error) {
        console.log(error.message);
      }

    }
    fetchData()


  },[])




    return (
      <div className='bookingScreen__container'>

  {/*-------------- Heaer Picture Carousel section ---------------*/}
        <section className='bookingScreen__header-container'>
          <div  className="header__pic-carousel-container">
          <Carousel className='ant-booking-carousel' autoplay autoplaySpeed={6000} fade={true} speed={4000}>
            <div>
              <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/bookingScreenCarousel%2F10%20Secrets%20to%20Score%20a%20Free%20Hotel%20Room%20Upgrade.jpeg?alt=media&token=2ac266d3-a51b-4cfe-9591-814186da2c04" alt="pictures of rooms" />
            </div>
            <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/bookingScreenCarousel%2FTake%20control%20of%20your%20guests%20with%20the%20External%20Identities%20Policy.jpeg?alt=media&token=7d76b5e4-abd7-4f5a-aabb-4d606fe3322d" alt="pictures of rooms" />
            </div>
            <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/bookingScreenCarousel%2FTravel%20tips%20and%20advice_%20Stupid%20things%20hotel%20guests%20do.jpeg?alt=media&token=f90166ce-ff03-4e1d-adf1-8493b6ff03ae" alt="pictures of rooms" />
            </div>
            {/* <div>
            <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5742.JPG?alt=media&token=64d98fa2-f42a-42a9-80e6-a868b1ae58e8" alt="pictures of rooms" />
            </div> */}
          </Carousel>
          </div>
        </section>


        <section className="service__section">
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


        <section className="avilable__rooms__section">
          
          {
            rooms.map((room)=>{
             return <BookingCard 
             data={room}
                key={room.id}
                imgurl={room?.imageurls[0]} 
                roomname={room?.roomname} 
                roomtype={room?.roomtype}
                maxcount={room?.maxcount}
                rentperday={room?.rentperday}
              />
            })
          }
        </section>
      </div>
    )
}
