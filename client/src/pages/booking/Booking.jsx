import { useState, useEffect } from "react";
import { DatePicker, Space, InputNumber } from "antd";
import '../booking/booking.css'
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Success from '../../components/success/Success'
import Error from '../../components/error/Error'
import Loading from "../../components/Loading/Loading";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReactFlagsSelect from "react-flags-select-2";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const { RangePicker } = DatePicker;


dayjs.extend(customParseFormat);
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};


const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf('day');
};
const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});





export default function Booking({data}) {

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [roomError, setRoomError] = useState(false);
  const [success, setSucces] = useState(false);
  const [error, setError] = useState(false);
  const [login, setLogin] = useState(false);
  const [response, setResponse] = useState('');
  const [show, setShow] = useState(false)
  const [user, setUser] = useState(null)

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [contact, setContact] = useState(0);
  const [guest, setGuest] = useState(0);
  const [numberRooms, setNumberRooms] = useState(0);
  const [children, setChildren] = useState(0)
  const [occassion, setOccassion] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [totaldays, setTotaldays] = useState(0);
  const [country, setCountry] = useState('')


  useEffect(()=>{
    if(email === confirmEmail){
      setMailError(false)
    }else{
      setMailError(true)
    }

    if(numberRooms > guest){
      setRoomError(true)
    }else{
      setRoomError(false)
    }
      return () => {};
  }, [confirmEmail, guest, numberRooms])

  useEffect(() => {
    
    const user = localStorage.getItem('rockviewUser')
    setUser(JSON.parse(user))
    
    return () => {};
  }, []);



  const closeClick = () => {
    setShow(!show);
  };
  

  async function confirmBooking(e) {

    e.preventDefault();
    setLoading(true);

    // const checkArray = [ `${room._id}`,

    //  `${fromdate}`,
    //   `${todate}`,
    //   `${totaldays}`,
    //   `${totaldays*room.rentperday}`,
    //   `${occasion}`,
    //   `${guest}`,

    // ]
    const totalamount = (totaldays * data?.rentperday)

    const bookingDetails = {
      roomid: data?._id,
      roomtype: data?.roomtype,
      roomname: data?.roomname,
      userid: `${user._id}`,
      contact: contact,
      country: country,
      numberRooms: numberRooms,
      email: email,
      guest: guest,
      children: children,
      occassion: occassion,
      fromdate: fromdate,
      todate: todate,
      totaldays: totaldays,
      totalamount: totalamount
    };

    try {
      const confirmedBooked = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/bookings/bookroom`,
        bookingDetails
      );

      if (confirmedBooked.status === 200) {
        try {
          // const updateAvailable = await axios.post(
          //   "/api/rooms/updateroomavailabilitybyid",
          //   { id: data?._id }
          // );
          setSucces(true);
          setTimeout(() => {
            setSucces(false);
          }, 3000);
        } catch (error) {
          console.log(error);
          setSucces(false);
          setLoading(false);
          setError(true);
        }
      }
    } catch (error) {
      setLoading(false);
      setResponse(error.response.data.details)
      console.log(error);
      console.log(error.response.data.details);
      console.log(typeof(error.response.data.details));
      console.log("api did not hit");
      setError(true);
      setTimeout(()=>{
        setError(false);
      }, 6000)
    }

    setEmail("");
    setContact('');
    setGuest('');
    setOccassion("");
    setFromdate("");
    setTodate("");

    setLoading(false);
    if(!error){
      setTimeout(()=>{
        window.location.href = '/booking'
      }, 6000)

    }
  }



  function getAdapter(date) {

      if (!date || !Array.isArray(date) || date.length < 2 || !date[0].$d || !date[1].$d) {
        console.error("Invalid date input:", date);
        return;
    }
    

    const startDate = formatDate(date[0].$d);
    const endDate = formatDate(date[1].$d);
    setFromdate(startDate);
    setTodate(endDate);
    console.log(startDate, endDate);

    const startDateObject = new Date(startDate);
    const endDateObject = new Date(endDate);
    const differenceInMilliseconds = endDateObject - startDateObject;
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setTotaldays(differenceInDays);
  }

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, "0");
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const year = String(dateObject.getFullYear());
    return `${year}-${month}-${day}`;
  };





  return (
    <div  className="booking__main__container">

      <div className="alerts">
        {success && (
            <div className='success'>
              {" "}
              <Success msg={"Booked Successfuly"} />{" "}
            </div>
          )
        }
            {error && (
                <Error
                  message={`error: ${response}`}
                />
              )
            }
      </div>
   
 
      <div className={`booking__inputdetails__container ${show ? 'setShow' : ''}`}>
         
      {/* <div  className="close__icon" onClick={()=> closeClick()}>
          <DisabledByDefaultIcon onClick={()=> closeClick()}/>
          </div> */}
     
        <div className="form__wrapper">

        <div className="date__picker">
            <h2>Chooce CheckIn Date and CheckOut date here</h2>
            <Space direction="vertical" size={12}>
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledDateTime}
                placeholder={['CheckIn Date', 'CheckOut Date']}
                format={"YYYY-MM-DD"}
                onChange={getAdapter}
              />
            </Space>
          </div>
          
          <form  action="">


         


            <div className="form__first__section__container">
              <div className="form__field__container">
                  <label htmlFor="">Active Email</label>
                  <input
                    style={{cursor:'vertical-text'}}
                      required={true}
                      type="email"
                      value={email}
                      placeholder="Active Email"
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Confirm Email</label>
                  {
                    mailError && <h3 style={{color: 'red'}}>Unmatched emails</h3>
                  }
                  <input

                    style={{cursor:'vertical-text'}}
                      required={true}
                      type="email"
                      value={confirmEmail}
                      placeholder="Active Email"
                      onChange={(e) => setConfirmEmail(e.target.value)}
                    />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Phone Contact</label>
                  <input
                    required={true}
                    type="text"
                    value={contact}
                    placeholder="Phone Contact"
                    onChange={(e) => setContact(e.target.value)}
                  />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Country</label>
                  <ReactFlagsSelect
                      searchable= {true}
                      selected={country}
                      onSelect={(code) => setCountry(code)}
                      placeholder="Select your country"
                      searchPlaceholder="Search countries"
                  />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Number of Rooms</label>
                  <InputNumber
                    required={true}
                    min={0}
                    max={100}
                    step={1}
                    value={numberRooms}
                    defaultValue={0}
                    onChange={(value) => setNumberRooms(value)}
                  />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Number of Guests </label>
                  {
                    roomError && <h4 style={{color: 'red'}}>Number of rooms can't exceed numer of guests</h4>
                  }
                  <InputNumber
                    required={true}
                    min={0}
                    max={100}
                    step={1}
                    value={guest}
                    defaultValue={0}
                    onChange={(value) => setGuest(value)}
                  />
              </div>

            </div>

{/*------------------ second division of the details panel -----------------*/}
            <div className="form__first__section__container"> 
              <div className="form__field__container">
                  <label htmlFor="">Number of children among the Guests</label>
                  <InputNumber
                    required={true}
                    min={0}
                    max={100}
                    step={1}
                    value={children}
                    defaultValue={0}
                    onChange={(value) => setChildren(value)}
                  />
              </div>
              <div className="form__field__container">
                 <label htmlFor="">This field is Optional:? Special Occasions? </label>
                  <input
                    required
                    type="text"
                    value={occassion}
                    placeholder="eg. on Tour, Honeymoon etc"
                    onChange={(e) => setOccassion(e.target.value)}
                  />
              </div>
            </div>

            <button onClick={(e) => confirmBooking(e)}>
              {
                loading ? <Loading /> : <span><EventAvailableIcon style={{fontSize:'35px'}}/>Confirm Booking</span>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
