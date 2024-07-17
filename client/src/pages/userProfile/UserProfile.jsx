import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './userprofile.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { FloatButton } from 'antd';
// import './ant.css'
// import './admincards.css'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';


const {TabPane} = Tabs

const Profile = () => {
  const [login, setLogin] = useState({})
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('rockviewUser'));
    setLogin(user);
    console.log(user._id);
    setLoading(false)
  }, []);

  function floatUnclick(){
    window.location.href = '/'
  }



  return (
    <div>

      {
        loading ? <LinearProgress/> :
        <div className={'profileCOnt'}>
        
          <Tabs defaultActiveKey="1" >
            
            <TabPane tab='Profile' key='1'>
                NAME: {login.name}

            </TabPane>
            <TabPane className={'animation'} tab='Bookings' key='2'>
              <Bookings userid ={login._id}/>
            </TabPane>
          </Tabs>
        </div>
      }
      
      <FloatButton
      icon={<HomeOutlinedIcon />}
      description="Home"
      shape="square"
      onClick={floatUnclick}
      style={{
        right: 34,
        width:  80,
        height: 80,
        borderRadius: 100
        
      }}
    />
     
    </div>
    
  );
}
export default Profile;




export const Bookings = ({userid}) => {

  const [userBookedRooms, setUserBookedRooms]=useState([])
  const [loading, setLoading] = useState(true)
  const [success, setSucces] = useState()
  const [error, setError] = useState()

  useEffect( ()=>{
    //Fetch user bookings, API.
    async function fetchData(){
      try {
        const userBookings = await (await (axios.post('http://rockviewhospitalities-api.vercel.app/api/bookings/getbookingbyid', {id: userid}))).data
        setUserBookedRooms(userBookings)
        if(userBookings){
          setLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
    
  },[])

  console.log(userBookedRooms);


  //Hitting the cancelling booking API.
  async function cancelBooking(bookid, roomid){

    try {
      setLoading(true)
      const result = await axios.post('/api/bookings/cancelbooking', {bookid, roomid})
      console.log('booking canceled successfuly');
      if(result.status === 200){
        try {
          const updateAvailable = await axios.post('/api/rooms/updateroomavailabilitybyid', {id: roomid})
          console.log('room status updated');

          if(updateAvailable.status === 200){
            setLoading(false)
            setSucces(true)
            setTimeout(()=>{
              setSucces(false)
              window.location.reload();
            }, 3000)
          }else{
            setSucces(false)
          }
        } catch (error) {
          console.log(error);
          console.log('room status updat failed');
        }
      }
      setSucces(true)
      setTimeout(()=>{
        setSucces(false)
        window.location.reload();
      }, 3000)
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(true)
    }
  }
  

  return (
    <div className={'bookCont'}>
     {loading && <LinearProgress sx={{ width: '95%' }}/>}
     {error && <Error message={`couldn't cancel Booking, try again or call FrontDesk for help`}/>}
     {success && <Success msg={`Booking Cancelled Successfuly`}/>}
      {
        userBookedRooms.length === 0 ? <Error message={'You Have No Booking'} /> :
        userBookedRooms.map(book=>{
          return(
            <div className='card__header__container'>
              <section className="id__section cards__sections">
                <span><h5>Booking ID: </h5> <p>{book?._id}</p></span>
                <span><h5>Room name: </h5> <p>{book?.roomname}</p></span>
              </section>
              <section className="user__details cards__sections">
                <h4>{book?.roomtype}</h4>
              </section>
              <section className='cards__sections'>
                <span><h5> Check In: </h5> <p>{book?.fromdate}</p></span>
                <span><h5>Check Out: </h5> <p>{book?.todate}</p></span>
              </section>
              <section className='cards__sections'>
                <span><h5> Check In: </h5> <p>{book?.totalamount}</p></span>
                <span><h5>Check Out: </h5> 
                  <p className={`
                                  ${
                                    book?.status === 'rejected' || book?.status === 'cancelled' ? 
                                    'rejected' :
                                    book?.status === 'pending' ? 
                                    'pending' : 
                                    book?.status === 'approved' ?
                                    'approved' : ''
                                  }`
                              }>{book?.status}</p>
                  </span>
              </section>
              {/* <section className={
                `status__section cards__sections 
                  ${
                    book.status === 'rejected'||book.status === 'cancelled' ? 'rejected' : book.status === 'pend'?  'pend' :  booking.status === 'approved' ? 'approved' : ''
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
  );
}

  
