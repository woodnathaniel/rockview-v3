import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../components/Loading/Loading';
import './admincards.css'
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import TypographyDemo from '../skeleton/Skeleton';




export const UsersBookingsCard = () =>{

  const [antLoadings, setAntLoadings] = useState([]);
  const [searchFilter, setSearchFilter] = useState('')
  const [searchFilterIdType, setSearchFilterIdType] = useState('')
  const [numOfStnd, setNumOfStnd] = useState()
  const [numOfExct, setNumOfExct] = useState()

  const [loading, setLoading] = useState(true)
  const [rejectCircles, setRejectCircles] = useState([])
  const [confirmCircles, setconfirmCircles] = useState([])

  const [confirmCancelErrors, setConfirmCancelErrors] = useState([])
  const [confirmCancelSuccess, setconfirmCancelSuccess] = useState([])

  const [rejectCancelErrors, setRejectCancelErrors] = useState([])
  const [rejectCancelSuccess, setRejectCancelSuccess] = useState([])
  
  const [success, setSucces] = useState()
  const [error, setError] = useState()
  
  const [bookings, setBookings] = useState([])
  const [filterBookigs, setFilterBookigs] = useState([])
 


  function filterFuctionsAll () {
    setLoading(true)
    setFilterBookigs(bookings)
    setLoading(false)
  }

  function PeningfilterFuctions() {
    setLoading(true)
   const filterResult = bookings.filter((each) => each.status === 'pending')
   setFilterBookigs(filterResult)
   setLoading(false)
  }

  function ApprovedfilterFuctions () {
    setLoading(true)
   const filterResult = bookings.filter((each) => each.status === 'approved')
   setFilterBookigs(filterResult)
   setLoading(false)
  }

  function RejectedfilterFuctions () {
    setLoading(true)
   const filterResult = bookings.filter((each) => each.status === 'rejected')
   setFilterBookigs(filterResult)
   setLoading(false)
  }

  function CancelledfilterFuctions () {
    setLoading(true)
    const filterResult = bookings.filter((each) => each.status === 'cancelled')
    setFilterBookigs(filterResult)
    setLoading(false)
  }


  const items = [
    {
      label: 'All Bookings',
      key: '1',
      onClick: filterFuctionsAll
    },
    {
      label: 'Pending',
      key: '2',
      onClick: PeningfilterFuctions
    },
    {
      label: 'Approved',
      key: '3',
      onClick: ApprovedfilterFuctions
    },
    {
      label: 'Rejected',
      key: '4',
      onClick: RejectedfilterFuctions
    },
    {
      label: 'Cancelled',
      key: '5',
      onClick: CancelledfilterFuctions
    },

    {
      label: `Standard ${numOfStnd}`,
      key: '6',
      onClick: CancelledfilterFuctions
    },
    {
      label: `Executive ${numOfExct}`,
      key: '7',
      onClick: CancelledfilterFuctions
    }
  ];

 


  useEffect(()=>{
    setLoading(true)
    
    async function fetchData(){
      try {
        const bookingsResult = await (await axios.get('http://rockviewhospitalities-api.vercel.app/api/bookings/getallbookings')).data
        setBookings(bookingsResult)
        setFilterBookigs(bookingsResult)
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

  function convertISOToLocalDate(isoString) {
    console.log(typeof('isoString'));
    console.log(isoString);
    const date = new Date(isoString);
    const localDate = date.toLocaleDateString();
    console.log(localDate);
    return localDate
  }
  convertISOToLocalDate()
  
  function convertISOToLocalTime(isoString) {
    console.log(typeof('isoString'));
    console.log(isoString);
    const date = new Date(isoString);
    const localTime = date.toLocaleTimeString();
    return localTime ;
  }
  

  //// checkig the Number of roomtype in each filtered array search
  useEffect(()=>{
    const NumOfStnd = filterBookigs.filter(each => each.roomtype === 'Standard Suit')
    setNumOfStnd(NumOfStnd.length)
    const NumOfExct = filterBookigs.filter(each => each.roomtype === 'Executive Suit')
    setNumOfExct(NumOfExct.length)
  }, [filterBookigs])


  // Filter SearchBar Function(userid and BookingId)

  const filterSearchBarFunctions = () =>{
    setLoading(true)
    if(searchFilterIdType === 'user'){
    
     const searchResult = filterBookigs.filter((each) => each?.userid === searchFilter)
     setFilterBookigs(searchResult)
    }else{
      const searchResult = filterBookigs.filter((each) => each?._id === searchFilter)
      setFilterBookigs(searchResult)
    }
    setLoading(false)
  }


     // CONFIRM BOOKING
  async function confirm(e, index, bookid){
    alert(bookid)
    e.preventDefault()

    try {
      // setCircle(true)
      setconfirmCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = true; // Set the loading state for the specific index to true
        return updatedCircles;
      });

      const confirm = await axios.post('http://rockviewhospitalities-api.vercel.app/api/bookings/confirmbooking', {bookid})

      !confirm.status === 200
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
        }, 3000);
    }

    setconfirmCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = false; // Set the loading state for the specific index to true
      return updatedCircles;
    })

  }


    //REJECT BOOKING
    async function Reject(e, index, bookid){

      try {
        // setCircle(true)
        setRejectCircles((prevCircle) => {
          const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
          updatedCircles[index] = true; // Set the loading state for the specific index to true
          return updatedCircles;
        });
  
        const reject = await axios.post('http://rockviewhospitalities-api.vercel.app/api/bookings/rejectbooking', {bookid})
  
        !reject.status === 200
        ?
        setRejectCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = true; // Set the cancel error state for the specific index
          return updatedErrors;
        })
  
        :
  
        setRejectCancelSuccess((prevSuccess) => {
          const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
          updatedSuccess[index] = true; // Set the cancel error state for the specific index
          return updatedSuccess;
        });
  
        setTimeout(() => {
          setRejectCancelSuccess((prevSuccess) => {
            const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
            updatedSuccess[index] = false; 
            window.location.reload()
            return updatedSuccess;
          });
        }, 3000);
  
      } catch (error) {
        setRejectCircles((prevCircle) => {
            const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
            updatedCircles[index] = false; // Set the loading state for the specific index to true
            return updatedCircles;
          })
  
          setRejectCancelErrors((prevErrors) => {
            const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
            updatedErrors[index] = true; // Set the cancel error state for the specific index
            return updatedErrors;
          });
  
          setTimeout(() => {
            // Reset the cancel error after 3000 milliseconds
            setRejectCancelErrors((prevErrors) => {
              const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
              updatedErrors[index] = false; // Reset the cancel error state for the specific index
              return updatedErrors;
            });
          }, 3000);
      }
  
      setRejectCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = false; // Set the loading state for the specific index to true
        return updatedCircles;
      })
  
    }
  







  return(
    <div>
      <div className='Adminpanel__filter'>
        <div>
          <Dropdown.Button
            type='primary'
              icon={<DownOutlined />}
              // loading={antLoadings[1]}
              menu={{
                items,
              }}
          >
            FILTER SEARCH BY REVIEWED STATUS
          </Dropdown.Button>
        </div>
        <div>
          <h3>Filter By ID (*user Id and Booking Id*) </h3>
          <div className='search__bar__filter'>
              <div className='search__icon'><SearchOutlined /></div>
              <input type="text" value={searchFilterIdType} placeholder='Input the ID type here' onChange={(e)=> setSearchFilterIdType(e.target.value)}/>
              <input type="text" value={searchFilter} placeholder='Input ID Here' onChange={(e)=> setSearchFilter(e.target.value)}/>
              <button type='submit' onClick={filterSearchBarFunctions}>Submit</button>
          </div>
        </div>
        <div className='totalNumOfBookings'>
              <h2>No. Of Bookings: </h2> <h3>{filterBookigs.length}</h3>
        </div>
      </div>
   
      <div className='bookingscards__grid__container'>
        { 
          loading && 
          <div className='skeleton'>
            <TypographyDemo />
          </div>
        }

         { 
          loading && 
          <div className='skeleton'>
            <TypographyDemo />
          </div>
        }
         { 
          loading && 
          <div className='skeleton'>
            <TypographyDemo />
          </div>
        }
         { 
          loading && 
          <div className='skeleton'>
            <TypographyDemo />
          </div>
        }
          
          {/* {
            loading && <SkeletonTypography/>
          }
          {
            loading && <SkeletonTypography/>
          }
          {
            loading && <SkeletonTypography/>
          } */}


        {
          filterBookigs.map((booking, index) =>{
            return(
              <div className='card__header__container'>
                <section className="id__section cards__sections">
                  <span><h5>Booking ID: </h5> <p>{booking?._id}</p></span>
                  <span><h5>User ID: </h5> <p>{booking?.userid}</p></span>
                  <span><h5>Email: </h5> <p>{booking?.email}</p></span>
                </section>
                <section className="user__details cards__sections">
                  <h4>{booking?.roomtype}</h4>
                </section>
                <section className='cards__sections'>
                  <span><h5> Check In: </h5> <p>{booking?.fromdate}</p></span>
                  <span><h5>Check Out: </h5> <p>{booking?.todate}</p></span>
                  <span><h5>Total Days: </h5> <p>{booking?.totaldays}</p></span>
                  <span><h5>Total Amount: </h5> <p>{booking?.totalamount}</p></span>
                </section>
               
                <section className='cards__sections' style={{display: 'flex',}}><div className={
                  `status__section cards__sections 
                    ${
                      booking.status === 'rejected'||booking.status === 'cancelled' ? 'rejected' : booking.status === 'pending'?  'pending' :  booking.status === 'approved' ? 'approved' : ''
                    }
                    `
                  }>{(booking?.status)?.toUpperCase()} @ </div> <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', fontStyle: 'italic', color: 'rgb(182, 185, 187)'}}>{convertISOToLocalDate(`${booking?.updatedAt}`)}, {convertISOToLocalTime(`${booking?.updatedAt}`)}</div> </section>
                <section >
                <section className='cards__sections'>
                  <span>Date<h5 style={{fontStyle: 'italic', fontSize: '15px', color: 'rgb(182, 185, 187)'}}>{convertISOToLocalDate(`${booking?.createdAt}`)}</h5></span>
                  <span>Time<h5 style={{fontStyle: 'italic', fontSize: '15px', color: 'rgb(182, 185, 187)'}}>{convertISOToLocalTime(`${booking?.createdAt}`)}</h5></span>
                </section>
                  {
                    booking?.status === 'pending' ? 
                    <div className="review__section ">
                  {/*------------- Confirm Button-------------*/}
                      <button onClick={(e)=>confirm(e, index, booking._id)}>
                        {confirmCancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                        {  confirmCircles[index] ? <CircularProgress /> : confirmCancelSuccess[index] ? <Success msg={'confirmed successful'}/> : 'Confirm'}
                      </button>
                  {/*------------- Reject Button-------------*/}
                      <button onClick={(e)=>Reject(e, index, booking._id)}>
                        {rejectCancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                        {  rejectCircles[index] ? <CircularProgress /> : rejectCancelSuccess[index] ? <Success msg={'rejected successful'}/> : 'Reject'}
                      </button>
                    </div> : 
                    booking?.status === 'cancelled'||'rejected' ?
                    '' : ''
                  }
                  
                </section>
              </div> 
            )
          })
          
        }



      </div>
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
        const room = (await axios.get('http://rockviewhospitalities-api.vercel.app/api/rooms/getallrooms')).data
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
        const getUsers = (await axios.get('http://rockviewhospitalities-api.vercel.app/api/users/getallusers'))
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