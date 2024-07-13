import { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { Card } from 'antd';
import '../bookingScreen/bookingScreen.css'
import {BookingCard} from '../../components/bookingCard/BookingCard'
import axios from 'axios'
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import SecurityIcon from "@mui/icons-material/Security";
import TourIcon from "@mui/icons-material/Tour";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import Booking from '../booking/Booking';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const { Meta } = Card;



export default function () {

  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])


  // const formattedAmountExecutive = new Intl.NumberFormat('en-GH', {
  //   style: 'currency',
  //   currency: 'GHS' // GHS is the currency code for Cedis
  // }).format(rooms[0]?.rentperday);
  
  useEffect(() => {
      if (show) {
          document.body.style.overflow = 'hidden';
      } else {
          document.body.style.overflow = 'auto';
      }
  }, [show]);

  useEffect(() =>{
    axios.defaults.withCredentials = true
    const fetchData = async() =>{
      try {
        const data = (await axios.get('/api/rooms/getallrooms')).data
        setRooms(data.getroomsInfo);
       
      } 
      
      catch (error) {
        console.log(error.message);
      }

    }
    fetchData()


  },[])

  console.log(rooms);

 const handelClick = (data)=>{
  console.log(data);
  setData(data)
  setShow(!show)
 }
 const closeClick = () => {
  setShow(!show);
};

return (
      <div>

        <div className={`bookingScreen__container ${show ? 'deactive__background' : ''}`}>
           {/*-------------- Heaer Picture Carousel section ---------------*/}
        <section className='bookingScreen__header-container'>
          <div  className="header__pic-carousel-container">
          <Carousel className='ant-booking-carousel' autoplay autoplaySpeed={6000} fade={true} speed={4000}>
            <div>
              <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/reception1.jpg?alt=media&token=d4007d5e-22a6-46d0-bf21-8d1e97323036" alt="pictures of rooms" />
            </div>
            <div>
              <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/check%20in3.jpg?alt=media&token=e26cbd8c-7e36-46ce-92aa-7016d386d598" alt="pictures of rooms" />
            </div>
            <div>
              <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/check%20in1.jpg?alt=media&token=e6f75f0c-f8d8-4bef-b521-1fc306aeeb1e" alt="pictures of rooms" />
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


{/*----------------- Executive Suite Card section ------------------*/}

            <Card
            style={{
              width: 650,
            }}
            cover={
                <div>
                  <Carousel className='antd-room-carousel'  arrows infinite={true} draggable={true} >
                  
                      {
                        
                        rooms[0]?.imageurls.map((url) =>{
                        return <div>
                            <img src={url} alt="pictures of rooms" />
                          </div>
                          
                        })
                      }
                  </Carousel>

                {/* <img
                  alt="example"
                  src={imgurl}
                /> */}
              </div>
              
            }
            actions={[
              <div ><h4>Room Name</h4> <p>{rooms[0]?.roomname}</p></div>,
              <h3>Max count: {rooms[0]?.maxcount}</h3>,
              <button className='bkcard__btn__booknow' onClick={ () => handelClick(rooms[0])}> Book Now</button>,
            ]}
          >
            <Meta
              // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title={rooms[0]?.roomtype}
              description={''}
              
            />
          </Card>



{/*----------------- Standard suite Card section ------------------*/}

          <Card
            style={{
              width: 650,
            }}
            cover={
                <div>
                  <Carousel className='antd-room-carousel'  arrows infinite={true} draggable={true} >
                  
                      {
                        
                        rooms[1]?.imageurls.map((url) =>{
                        return <div>
                            <img src={url} alt="pictures of rooms" />
                          </div>
                          
                        })
                      }
                  </Carousel>

                {/* <img
                  alt="example"
                  src={imgurl}
                /> */}
              </div>
              
            }
            actions={[
              <div ><h4>Room Name</h4> <p>{rooms[1]?.roomname}</p></div>,
              <h3>Max count: {rooms[1]?.maxcount}</h3>,
              <button className='bkcard__btn__booknow' onClick={() => handelClick(rooms[1])}> Book Now</button>,
            ]}
          >
            <Meta
              // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title={rooms[1]?.roomtype}
              description={''}
              
            />
          </Card>
          
          {/* {
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
          } */}
        </section>
        </div>
 

        <div className={`booking_details ${show ? 'setShow' : 'removeShow'}`} >
        <div  className="close__icon" >
          <DisabledByDefaultIcon onClick={()=> closeClick()}/>
          </div>
          <Booking  data={data}/>
        </div>
      </div>
    )
}
