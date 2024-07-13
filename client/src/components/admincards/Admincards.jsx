import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../components/Loading/Loading';
import './admincards.css'



export const UsersBookingsCard = () =>{

  
  const [loading, setLoading] = useState(true)
  const [circles, setCircles] = useState([])
  const [cancelErrors, setCancelErrors] = useState([])
  const [cancelSuccess, setCancelSuccess] = useState([])
  const [success, setSucces] = useState()
  const [error, setError] = useState()
  
  const [bookings, setBookings] = useState([])

  useEffect(()=>{
    setLoading(true)
    
    async function fetchData(){
      try {
        const bookings = await (await axios.get('/api/bookings/getallbookings')).data
        setBookings(bookings)
        console.log(bookings);
        if(bookings.status === 200){
          setLoading(false)
          setSucces(true)
          setTimeout(()=>{
            setSucces(false)
          }, 3000)
        }
      } catch (error) {
        console.log(error);
        setError(true)
        setLoading(false)
      }

    }
    fetchData()
    setLoading(false)
  },[])




  return(
    <div className='bookingscards__grid__container'>
      {
        bookings.map((booking) =>{
          return(
            <div className='card__header__container'>
              <section className="id__section cards__sections">
                <span><h5>Booking ID: </h5> <p>{booking?._id}</p></span>
                <span><h5>User ID: </h5> <p>{booking?.userid}</p></span>
              </section>
              <section className="user__details cards__sections">
                <h4>{booking?.roomname}</h4>
                <h4>{booking?.email}</h4>
              </section>
              <section className='cards__sections'>
                <span><h5> Check In: </h5> <p>{booking?.fromdate}</p></span>
                <span><h5>Check Out: </h5> <p>{booking?.todate}</p></span>
              </section>
              <section className={
                `status__section cards__sections 
                  ${
                    booking.status === 'rejected'||booking.status === 'cancelled' ? 'rejected' : booking.status === 'pending'?  'pending' :  booking.status === 'approved' ? 'approved' : ''
                  }
                  `
                }>{booking?.status}</section>
              <section >
                {
                  booking?.status === 'pending' ? 
                  <div className="review__section "><button>Confirm</button><button>Reject</button></div> : 
                  booking?.status === 'cancelled'||'rejected' ?
                   '' : ''
                }
                
              </section>
            </div> 
          )
        })
         
      }
    </div>
  )
}


export const AdminRooms = () =>{
  
  const [loading, setLoading] = useState(true)
  const [success, setSucces] = useState()
  const [error, setError] = useState()
  const [rooms, setRooms] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try {
        const room = (await axios.get('/api/rooms/getallrooms')).data
        setRooms(room.getroomsInfo)
        console.log(room);
        if(room.status === 200){
          setLoading(false)
          setSucces(true)
          setTimeout(()=>{
            setSucces(false)
          }, 3000)
        }
      } catch (error) {
        console.log(error);
        setError(true)
        setLoading(false)
      }

    }
    fetchData()
    setLoading(false)
  },[])





  return(

          <div className='bookingscards__grid__container'>
      {
        rooms.map((booking) =>{
          return(
            <div className='card__header__container'>
              <section className="id__section cards__sections">
                <span><h5>Booking ID: </h5> <p>{booking?._id}</p></span>
                <span><h5>User ID: </h5> <p>{booking?.roomname}</p></span>
              </section>
              <section className="user__details cards__sections">
                <h4>{booking?.roomtype}</h4>
                <h4>{booking?.rentperday}</h4>
              </section>
              <section className='cards__sections'>
                <span><h5> Current bookings: </h5> <p>{booking?.currentbookings.length}</p></span>
                <span><h5>Approved bookings: </h5> <p>{booking?.approvedbookings.length}</p></span>
              </section>
              {/* <section className={
                `status__section cards__sections 
                  ${
                    booking.status === 'rejected'||booking.status === 'cancelled' ? 'rejected' : booking.status === 'pending'?  'pending' :  booking.status === 'approved' ? 'approved' : ''
                  }
                  `
                }>{booking?.status}</section>
              <section >
                {
                  booking?.status === 'pending' ? 
                  <div className="review__section "><button>Confirm</button><button>Reject</button></div> : 
                  booking?.status === 'cancelled'||'rejected' ?
                   '' : ''
                }
                
              </section> */}
            </div> 
          )
        })
         
      }
    </div>
  )
}


export const AdminUsers = () =>{

  const [loading, setLoading] = useState(true)
  const [success, setSucces] = useState()
  const [error, setError] = useState()
  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function fetchData(){
      try {
        const getUsers = (await axios.get('/api/users/getallusers'))
        setUsers(getUsers.data)
        if(getUsers.status === 200){
          setLoading(false)
          setSucces(true)
          setTimeout(()=>{
            setSucces(false)
          }, 3000)
        }
      } catch (error) {
        console.log(error);
        setError(true)
        setLoading(false)
      }

    }
    fetchData()
    setLoading(false)
  },[])
    

  return(
    <div className='bookingscards__grid__container'>
    {
      users.map((booking) =>{
        return(
          <div className='card__header__container'>
            <section className="id__section cards__sections">
              <span><h5>User ID: </h5><p>{booking?._id}</p></span>
              <span><h5>User Name: </h5><p>{booking?.name}</p></span>
            </section>
            <section className="user__details cards__sections">
              <h4>{booking?.email}</h4>
            </section>
            <section className='cards__sections'>
              <span><h5> isAdmin: </h5> <p>{booking.isAdmin}</p></span>
            </section>
            {/* <section className={
              `status__section cards__sections 
                ${
                  booking.status === 'rejected'||booking.status === 'cancelled' ? 'rejected' : booking.status === 'pending'?  'pending' :  booking.status === 'approved' ? 'approved' : ''
                }
                `
              }>{booking?.status}</section>
            <section >
              {
                booking?.status === 'pending' ? 
                <div className="review__section "><button>Confirm</button><button>Reject</button></div> : 
                booking?.status === 'cancelled'||'rejected' ?
                 '' : ''
              }
              
            </section> */}
          </div> 
        )
      })
       
    }
  </div>
  )
}