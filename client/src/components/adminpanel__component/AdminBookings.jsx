import React, {useEffect, useState} from 'react';
import './adminBookings.css'
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import Error from '../../components/error/Error';
import Success from '../../components/success/Success';
import CircularProgress from '@mui/material/CircularProgress';
import Loading from '../../components/Loading/Loading';



export const AdminBookings = () => {

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
  

  // CANCEL BOOKINGS
  async function cancelBooking(index, bookid){
    // setCircle(true)
    setCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = true; // Set the loading state for the specific index to true
      return updatedCircles;
    });

    try {
      const cancel = await axios.post('/api/bookings/cancelbooking', {bookid})
      console.log(cancel);
     { 
      !cancel.status === 200
        ?
        setCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = true; // Set the cancel error state for the specific index
          return updatedErrors;
        })

        :

        setCancelSuccess((prevSuccess) => {
          const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
          updatedSuccess[index] = true; // Set the cancel error state for the specific index
          return updatedSuccess;
        });

        setTimeout(() => {
          setCancelSuccess((prevSuccess) => {
            const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
            updatedSuccess[index] = false;

            window.location.reload()
            return updatedSuccess;
          });
        }, 3000);

    } 

    } 
    catch (error) {
      setCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = false; // Set the loading state for the specific index to true
        return updatedCircles;
      })

      setCancelErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
        updatedErrors[index] = true; // Set the cancel error state for the specific index
        return updatedErrors;
      });

      setTimeout(() => {
        // Reset the cancel error after 3000 milliseconds
        setCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = false; 

          return updatedErrors;
        });
      }, 3000);
    }
    
    setCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = false; // Set the loading state for the specific index to true
      return updatedCircles;
    })
  }




// CONFIRM BOOKING

async function confirm(index, bookid){

  try {
     // setCircle(true)
     setCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = true; // Set the loading state for the specific index to true
      return updatedCircles;
    });

    const confirm = await axios.post('/api/bookings/confirmbooking', {bookid})

    !confirm.status === 200
    ?
    setCancelErrors((prevErrors) => {
      const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
      updatedErrors[index] = true; // Set the cancel error state for the specific index
      return updatedErrors;
    })

    :

    setCancelSuccess((prevSuccess) => {
      const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
      updatedSuccess[index] = true; // Set the cancel error state for the specific index
      return updatedSuccess;
    });

    setTimeout(() => {
      setCancelSuccess((prevSuccess) => {
        const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
        updatedSuccess[index] = false;
        window.location.reload()

        // Set the cancel error state for the specific index
        return updatedSuccess;
      });
    }, 3000);

  } catch (error) {
    setCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = false; // Set the loading state for the specific index to true
        return updatedCircles;
      })

      setCancelErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
        updatedErrors[index] = true; // Set the cancel error state for the specific index
        return updatedErrors;
      });

      setTimeout(() => {
        // Reset the cancel error after 3000 milliseconds
        setCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = false; // Reset the cancel error state for the specific index
          return updatedErrors;
        });
      }, 3000);
  }

  setCircles((prevCircle) => {
    const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
    updatedCircles[index] = false; // Set the loading state for the specific index to true
    return updatedCircles;
  })

}



//REJECT BOOKING
async function Reject(index, bookid){

  try {
     // setCircle(true)
     setCircles((prevCircle) => {
      const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
      updatedCircles[index] = true; // Set the loading state for the specific index to true
      return updatedCircles;
    });

    const reject = await axios.post('/api/bookings/rejectbooking', {bookid})

    !reject.status === 200
    ?
    setCancelErrors((prevErrors) => {
      const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
      updatedErrors[index] = true; // Set the cancel error state for the specific index
      return updatedErrors;
    })

    :

    setCancelSuccess((prevSuccess) => {
      const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
      updatedSuccess[index] = true; // Set the cancel error state for the specific index
      return updatedSuccess;
    });

    setTimeout(() => {
      setCancelSuccess((prevSuccess) => {
        const updatedSuccess = [...prevSuccess]; // Copy the previous cancelErrors array
        updatedSuccess[index] = false; 
        window.location.reload()
        return updatedSuccess;
      });
    }, 3000);

  } catch (error) {
    setCircles((prevCircle) => {
        const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
        updatedCircles[index] = false; // Set the loading state for the specific index to true
        return updatedCircles;
      })

      setCancelErrors((prevErrors) => {
        const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
        updatedErrors[index] = true; // Set the cancel error state for the specific index
        return updatedErrors;
      });

      setTimeout(() => {
        // Reset the cancel error after 3000 milliseconds
        setCancelErrors((prevErrors) => {
          const updatedErrors = [...prevErrors]; // Copy the previous cancelErrors array
          updatedErrors[index] = false; // Reset the cancel error state for the specific index
          return updatedErrors;
        });
      }, 3000);
  }

  setCircles((prevCircle) => {
    const updatedCircles = [...prevCircle]; // Copy the previous cancelErrors array
    updatedCircles[index] = false; // Set the loading state for the specific index to true
    return updatedCircles;
  })

}



  return (
    <div className={'adminGrid'}>
      { success && <Success style={{marginBottom: '20px'}} msg={'succesfully'} /> }
      { error && <Error style={{marginBottom: '20px'}} message={'No bookings Yet'} /> }
      <div>
        <table className={'tableContainer'}>
          <thead className={'tableHeader'}>
            <tr>
              <th>Booking ID</th>
              <th>Room Name</th>
              <th>UserID</th>
              <th>Email</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          { loading && <LinearProgress style={{marginBottom: '20px', marginTop: '20px', height:'8px', alignItems: 'center'}}/> }

             { 
                bookings.length === 0 && <Error message={'No Bookings'}/>
              }
            {

              bookings.map((book, index)=>{
                return(
                  <tr className='tableRow'>
                    <td>{book._id}</td>
                    <td>{book.roomname}</td>
                    <td>{book.userid}</td>
                    <td>{book.email}</td>
                    <td>{book.fromdate}</td>
                    <td>{book.todate}</td>
                    <td style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                      <div>
                        {book.status}
                      </div>
                      <div style={{gap: '10px'}}>
                      {
                       book.status === 'pending'

                        ? 

                        <div style={{gap: '20px'}}> 
                        
                          <button onClick={()=>confirm(index, book._id)}> 
                              {cancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                              {  circles[index] ? <CircularProgress /> : cancelSuccess[index] ? <Success msg={'confirmed successful'}/> : 'Confirm'} 
                          </button> 
                        
                          
                         
                            <button onClick={()=>Reject(index, book._id)}>
                               {cancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />}
                              {  circles[index] ? <CircularProgress /> : cancelSuccess[index] ? <Success msg={'rejected successful'}/> : 'Reject'}
                            </button> 
                         
                          
                        </div>

                        :  book.status === 'booked' || book.status === 'approved'

                            ?

                         <div style={{gap: '20px'}}> 
                          <button onClick={()=>cancelBooking(index, book._id)}>
                             {
                               circles[index] ? <CircularProgress /> : cancelSuccess[index] ? <Success msg={'cancelled successful'}/> 
                                : 'Cancel'
                             }
                             {cancelErrors[index] && <Error style={{marginBottom: '20px'}} message={'Error'} />} 
                             </button> 
                         </div>
                            : <> </>
                      }
                      </div>
                       
                    </td>
                  </tr>
                )
              })
            }
          
      </tbody>
        </table>
      </div>
    </div>
  );
}





export const AdminRooms = () => {

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
    


  return (
    <div className={'adminGrid'}>
      { success && <Success msg={'loaded succesfully'} style={{marginBottom: '20px'}} /> }
      { error && <Error message={'No bookings Yet'} style={{marginBottom: '20px'}}/> }
      <div>
        <table className={'tableContainer'}>
          <thead className={'tableHeader'}>
            <tr>
              <th>RoomID</th>
              <th>Room Type</th>
              <th>Room Name</th>
              <th>RentPerDay</th>
              <th>No. of Bookings</th>
            </tr>
          </thead>
          <tbody>
          { loading && <LinearProgress style={{marginBottom: '20px', marginTop: '20px', height:'7px'}}/> }

              { 
                rooms.length === 0 && <Error message={'No Rooms; That could be network'}/>
              }

            {
              rooms.map((room)=>{
                // const no = room.currentbookings.length
                return(
                  <tr className='tableRow'>
                    <td>{room._id}</td>
                    <td>{room.roomtype}</td>
                    <td>{room.roomname}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.currentbookings.length}</td>
                  </tr>
                )
              })
            }
          
      </tbody>
        </table>
      </div>
    </div>
  );
}



export const AdminUsers = () => {

  const [loading, setLoading] = useState(true)
  const [success, setSucces] = useState()
  const [error, setError] = useState()
  const [users, setUsers] = useState([])

  

  useEffect(()=>{
    async function fetchData(){
      try {
        const getUsers = (await axios.get('/api/users/getallusers')).data
        setUsers(getUsers)
        console.log(users);
        if(users.status === 200){
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
    


  return (
    <div className={'adminGrid'}>
      { success && <Success msg={'loaded succesfully'} style={{marginBottom: '20px'}}/> }
      { error && <Error message={'No bookings Yet'} style={{marginBottom: '20px'}}/> }
      <div>
        <table className={'tableContainer'}>
          <thead className={'tableHeader'}>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
            </tr>
          </thead>
          <tbody>
          { loading && <LinearProgress style={{display: 'flex', marginBottom: '20px', marginTop: '20px', height:'8px'}}/> }

              {
                users.length === 0 && <Error message={'No Users'}/>
              }
            {
              users.map((user)=>{
                // const no = room.currentbookings.length
                return(
                  <tr className='tableRow'>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{`${user.isAdmin}`}</td>
                  </tr>
                )
              })
            }
          
      </tbody>
        </table>
      </div>
    </div>
  );
}


