import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './userprofile.css'
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

 


  return (
    <div>

      {
        loading ? <LinearProgress/> :
        <div className={'profileCOnt'}>
        
          <Tabs defaultActiveKey="1" >
            
            <TabPane tab='Profile' key='1'>
                < Userprofile/>

            </TabPane>
            <TabPane className={'animation'} tab='Bookings' key='2'>
              <Bookings userid ={login._id}/>
            </TabPane>
          </Tabs>
        </div>
      }
      
   
     
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
    
  },[userid])

  console.log(userBookedRooms);


  //Hitting the cancelling booking API.
  async function cancelBooking(bookid){
    setLoading(true)

    try {
      const result = await axios.post('/api/bookings/cancelbooking', {bookid})
      console.log('booking canceled successfuly');
      
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
                <span><h5>Room Type: </h5> <p>{book?.roomtype}</p></span>
              </section>
              
              <section className='cards__sections'>
                <span><h5> Check In: </h5> <p>{book?.fromdate}</p></span>
                <span><h5>Check Out: </h5> <p>{book?.todate}</p></span>
              </section>
              <section className='cards__sections'>
                <span><h5> Total Days: </h5> <p>{book?.totaldays}</p></span>
                <span><h5>Total Amount: </h5> <p>{book?.totalamount}</p></span>
              </section>
              <section className='cards__sections'>
                <span style={{display: 'flex', color: 'red'}}>
                  <h5>Booking Status: <p className={`
                                  ${
                                    book?.status === 'rejected' || book?.status === 'cancelled' ? 
                                    'rejected' :
                                    book?.status === 'pending' ? 
                                    'pending' : 
                                    book?.status === 'approved' ?
                                    'approved' : ''
                                  }`
                              }>{(book?.status).toUpperCase()}</p>
                  </h5> 
                </span>
              </section>
              <section>
                {
                  book?.status === 'pending' ? 
                  <div className="review__section "><button onClick={() => cancelBooking(book?._id)}>Cancel</button></div> : 
                  book?.status === 'cancelled'||'rejected' ?
                   '' : ''
                }
                
              </section>
            </div> 
          )
          
          
        })
      }
     
    </div>
  );
}


export const Userprofile = () =>{


  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(true)
  

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('rockviewUser'));
    setLogin(user);
    console.log(user._id);
    setLoading(false)
  }, []);

  return(
    <div className='user_card__header__container'>
      <section className="id__section user_cards__sections">
        <span><h5>Name: </h5> <p>{login?.name}</p></span>
        <span><h5>Email: </h5> <p>{login?.email}</p></span>
      </section>
      <section className='user_cards__sections'>
        <span><h5> User ID: </h5> <p>{login?._id}</p></span>
        <span><h5>isAdmin: </h5> <p>{login?.isAdmin}</p></span>
      </section>
    </div> 
  )
}
