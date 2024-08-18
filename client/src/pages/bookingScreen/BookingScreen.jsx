import { useEffect, useState, useRef } from 'react'
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
import Footer from '../../components/footer/Footer';
import NavBar from '../../components/navbar/NavBar';
import { Modal } from 'antd';
import Loading from '../../components/Loading/Loading';

const { Meta } = Card;



export default function () {

  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [allow, setAllow] = useState(false)
  const [data, setData] = useState([])

  const bookingRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5, 1],
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, observerOptions);

    const { current: serviceElement } = bookingRef;
    if (serviceElement) {
      observer.observe(serviceElement);
    }

    return () => {
      if (serviceElement) {
        observer.unobserve(serviceElement);
      }
    };
  }, []);

  
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
        const data = (await axios.get(`${process.env.REACT_APP_BASE_URL}/api/rooms/getallrooms`)).data
         setRooms(data.getroomsInfo);
          setAllow(true)
       
      } 
      
      catch (error) {
        console.log(error.message);
      }

    }
    fetchData()


  },[])

  console.log(rooms);

 const handelClick = (data)=>{
  const user = localStorage.getItem('rockviewUser')
  console.log(user)
  if(user === null){
    setOpen(true)
  }else{
    console.log(data);
    setData(data)
    setShow(!show)
  }
 }

  const handleOk2 = () => {
    setLoading1(true)
    window.location.href = '/login'
    setOpen(false)
  };

  const handleCancel1 = () => {
    setLoading2(true)
    window.location.href = '/register'
    setOpen(false)
  };

  const closeClick = () => {
    setShow(!show);
  };



  return (
      <div className={`${open ?'BookingScreenfilter': ''}`}>
        <NavBar/>

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
            
          </Carousel>
          </div>
        </section>


        <section className="service__section booking__animation" ref={bookingRef}>
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


        <section className='note_ahead'>
          <h2>You are almost there in making your booking request.</h2>
          <h3>Please choose your prefered room type <b>(EXECUTIVE SUITE and STANDARD SUITE)</b></h3>
          <h1>Note: Payment is made on day of arrival at the hotel premises</h1>
        </section>

        <section className="avilable__rooms__section">


  {/*----------------- Executive Suite Card section ------------------*/}

            <Card
            cover={
                <div>
                  <Carousel className='antd-room-carousel'  arrows infinite={true} draggable={true} autoplay>

                    {

                    }
                  
                      {
                        
                        rooms[0]?.imageurls.map((url) =>{
                        return <div>
                            <img src={url} alt="pictures of rooms" />
                          </div>
                          
                        })
                      }
                  </Carousel>

              </div>
              
            }
            actions={[
                <div ><h4>Rent per day</h4> <p>{rooms[0]?.rentperday}.00 USD Dollars</p></div>,
                <h3>Maximun Guest per Room is {rooms[0]?.maxcount} if only they are couple.</h3>,

                <div>
                  {
                    allow?  <button className='bkcard__btn__booknow' onClick={() => handelClick(rooms[1])}>{allow? 'BOOK NOW ': ''}</button>: ''
                  }
                </div>          
              ]}
          >
            <Meta
              avatar={''}
              title={<h2>{rooms[0]?.roomtype}</h2>}
              description={''}
              
            />
          </Card>



    {/*----------------- Standard suite Card section ------------------*/}

          <Card
           
            cover={
                <div>
                  <Carousel className='antd-room-carousel'  arrows infinite={true} draggable={true} autoplay>
                  
                      {
                        
                        rooms[1]?.imageurls.map((url) =>{
                        return <div>
                            <img src={url} alt="pictures of rooms" />
                          </div>
                          
                        })
                      }
                  </Carousel>
                </div>
              
            }
            actions={[
              <div ><h4>Rent per day</h4> <p>{rooms[1]?.rentperday}.00 USD Dollars</p></div>,
              <h3>Maximun Guest per Room is {rooms[1]?.maxcount} if only they are couple.</h3>,
              <div>
                {
                   allow?  <button className='bkcard__btn__booknow' onClick={() => handelClick(rooms[1])}>{allow? 'BOOK NOW ': ''}</button>: ''
                }
              </div>

            ]}
          >
            <Meta
              avatar={''}
              title={<h2>{rooms[1]?.roomtype}</h2>}
              description={''}
              
            />
          </Card>
          
          
        </section>
        </div>

 

        <div className={`booking_details ${show ? 'setShow' : 'removeShow'}`} >
        <div  className="close__icon" >
          <DisabledByDefaultIcon onClick={()=> closeClick()}/>
          </div>
          <Booking  data={data}/>
        </div>

        <Modal
        open={open}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}>Oops!!! it seems you dont have account here</h2>}
        onOk={handleOk2}
        onCancel={handleCancel1}
        okText= {<div>{loading1 && <Loading/>}<p style={{fontWeight: 'bolder'}}>LOGIN</p></div>}
        cancelText = {<div>{loading2 && <Loading/>}<p style={{color: 'rgb(59, 108, 197)', fontWeight: 'bolder'}}>REGISTER</p></div>}
        centered
        maskClosable= {false}
        closable = {false}
      >

          <>  
          <h3 style={{color: ''}}>Click the Login if already having Accout here to login</h3>
          <h3 style={{color: ''}}>Or the Register button to have an account here</h3> 
          <h3 style={{color: ''}}>before booking request can be made.</h3> 
          </>

      </Modal>
        <Footer/>
      </div>
  )
}
