import { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './userprofile.css'
// import './ant.css'
// import './admincards.css'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import CircularProgress from '@mui/material/CircularProgress';
import { Dropdown, Flex, message, Space } from 'antd';
import { duration } from '@mui/material';



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


  //Hitting the cancelling booking API.
  async function cancelBooking(bookid, index){
    setLoading(true)

    setconfirmCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = true; // Set the loading state for the specific index to true
      return updatedCircles;
    });

    try {
      const result = await axios.post('http://rockviewhospitalities-api.vercel.app/api/bookings/cancelbooking', {bookid})
      console.log('booking canceled successfuly');
      console.log(result);

      !result.status === 20
      ?
      setConfirmCancelErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
        updatedErrors[index] = true; // Set the cancel error state for the specific index
        return updatedErrors;
      })

      :

      setconfirmCancelSuccess((prevSuccess) => {
        const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
        updatedSuccess[index] = true; // Set the cancel error state for the specific index
        return updatedSuccess;
      });


      setTimeout(() => {
        setconfirmCancelSuccess((prevSuccess) => {
          const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
          updatedSuccess[index] = false;
          window.location.reload()

          // Set the cancel error state for the specific index
          return updatedSuccess;
        });
      }, 3000);
      setLoading(false)
      setSucces(true)
      setTimeout(()=>{
        setSucces(false)
        window.location.reload();
      }, 3000)
    } catch (error) {

      setconfirmCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = false; // Set the loading state for the specific index to true
        return updatedCircles;
      })

      setConfirmCancelErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
        updatedErrors[index] = true; // Set the cancel error state for the specific index
        return updatedErrors;
      });

      setTimeout(() => {
        // Reset the cancel error after 3000 milliseconds
        setConfirmCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = false; // Reset the cancel error state for the specific index
          return updatedErrors;
        });
      }, 6000);

      console.log(error);
      // setLoading(false)
      setError(true)
    }
    setconfirmCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = false; // Set the loading state for the specific index to true
      return updatedCircles;
    })
    setLoading(false)

    setTimeout(() => {
      // Reset the cancel error after 3000 milliseconds
     window.location.reload()
    }, 6000);
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
                  <button onClick={() => cancelBooking(book?._id, index)}>
                    {confirmCancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                    {confirmCircles[index] ? <CircularProgress /> :
                      confirmCancelSuccess[index] ? <Success msg={'Confirmation mail sent, booking request cancelled successfully'} /> : 
                      'Cancel Booking'}
                  </button>
                </div>
              ) : book?.status === 'cancelled' || book?.status === 'rejected' ? (
                ''
              ) : book?.status === 'approved' ? (
                <div className="review__section">
                  <button onClick={() => cancelBooking(book?._id, index)}>
                    {confirmCancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                    {confirmCircles[index] ? <CircularProgress /> :
                      confirmCancelSuccess[index] ? <Success msg={'Confirmation mail sent, booking request cancelled successfully'} /> : 
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
