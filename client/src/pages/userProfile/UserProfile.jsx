import { Suspense, useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './userprofile.css'
// import './ant.css'
// import './admincards.css'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import CircularProgress from '@mui/material/CircularProgress';
import { Modal } from 'antd';
import Loading from '../../components/Loading/Loading';



const {TabPane} = Tabs

const Profile = () => {
  const [login, setLogin] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)



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
  const [open, setOpen] = useState(false)
  const [reason, SetResason] =useState('')
  const [bookingID, setBookingID] = useState('')
  const [rejectMail, SetRejectMail] =useState('')

  const [userBookedRooms, setUserBookedRooms]=useState([])
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(false)
  const [success, setSucces] = useState(false)
  const [error, setError] = useState(false)
  const [respose, setResponse] = useState(false)
  const [confirmCircles, setconfirmCircles] = useState([])

  const [confirmCancelErrors, setConfirmCancelErrors] = useState([])
  const [confirmCancelSuccess, setconfirmCancelSuccess] = useState([])




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

  const handleCancel1 = () => {
    setOpen(false)
  };

  const displayReason = (bookid, mail) =>{
    setOpen(true)
    setBookingID(bookid)
    SetRejectMail(mail)
  }

  //Hitting the cancelling booking API.
  async function cancelBooking({}){
    setLoading2(true)

    try {
      const result = await axios.post('http://rockviewhospitalities-api.vercel.app/api/bookings/cancelbooking', {bookid: bookingID,  reason: reason, email: rejectMail})
      console.log('booking canceled successfuly');
      console.log(result);

      !result.status === 200
      ?
      setError(true)

      :

      setSucces(true)
  
          
      setLoading2(false)
      setSucces(true)
      setTimeout(()=>{
        setSucces(false)
        window.location.reload();
      }, 3000)

    } catch (error) {

      setLoading2(false)
  
          setError(true)

          setTimeout(() => {
            // Reset the cancel error after 3000 milliseconds
            setError(false)
          }, 3000);

      console.log(error);
      // setLoading(false)
      setError(true)
    }
    setLoading2(false)
    setOpen(false)
    
    setTimeout(() => {
     window.location.reload()
    }, 3000);
  }
  

  return (
    <div className={'bookCont'}>
     {loading && <LinearProgress sx={{ width: '95%' }}/>}
     {error && <Error message={`couldn't cancel Booking, try again or call FrontDesk for help`}/>}
     {success && <Success msg={`Booking Cancelled Successfuly`}/>}
      {
        userBookedRooms.length === 0 ? <Error message={'You Have No Booking'} /> :
        userBookedRooms.map((book, index)=>{
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

              {/* {confirmCancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
              {  confirmCircles[index] ? <CircularProgress /> : confirmCancelSuccess[index] ? <Success msg={'confirmed successful'}/> : 'Confirm'} */}


              {
              book?.status === 'pending' ? (
                <div className="review__section">
                  <button onClick={() => displayReason(book?._id, index)}>
                    {error && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                    {loading2 ? <CircularProgress /> :
                      success ? <Success msg={'Confirmation mail sent, booking request cancelled successfully'} /> : 
                      'Cancel Booking'}
                  </button>
                </div>
              ) : book?.status === 'cancelled' || book?.status === 'rejected' ? (
                ''
              ) : book?.status === 'approved' ? (
                <div className="review__section">
                  <button onClick={() => displayReason(book?._id, book?.email)}>
                    {error && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                    {loading2 ? <CircularProgress /> :
                      success ? <Success msg={'Confirmation mail sent, booking request cancelled successfully'} /> : 
                      'Cancel Booking'}
                  </button>
                </div>
              ) : (
                ''
              )}
              </section>
            </div> 
          )
          
          
        })
      }

      <Modal
        open={open}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}>Please give reason for Cancelling. It serves as a feedback for us to improve</h2>}
        onOk={cancelBooking}
        onCancel={handleCancel1}
        okText= {loading ? <Loading/> : 'Confirm Rejection'}
        cancelText = 'Cancel'
        centered
      >

        {
          <textarea id="large-input" className="large-input" rows="10" cols="45" placeholder="Briefly type the reason for canceling the booking request" onChange={(e) => SetResason(e.target.value)}></textarea>
        }

      </Modal>
     
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
