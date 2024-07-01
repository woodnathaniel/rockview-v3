import { useState, useEffect } from "react";
import { DatePicker, Space, InputNumber } from "antd";
import '../booking/booking.css'
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Success from '../../components/success/Success'
import Error from '../../components/error/Error'

const { RangePicker } = DatePicker;




export default function Booking({data}) {

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [success, setSucces] = useState();
  const [error, setError] = useState();
  const [login, setLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [contact, setContact] = useState(Number);
  const [guest, setGuest] = useState(Number);
  const [children, setChildren] = useState(Number)
  const [occassion, setOccassion] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [totaldays, setTotaldays] = useState(Number);

  // useEffect(() => {
  //   console.log(data);
  //   setRoom(data)
  //   const fetchData = async () => {
  //     try {
  //       if (data) {
  //         const bookrm = (
  //           await axios.post("/api/rooms/getroombyid", { id: data._id })
  //         ).data;
  //         setRoom(bookrm);
  //         setLoading(false);
  //       } else {
  //         setRoom(data);
  //       }
  //     } catch (error) {}
  //   };
  //   fetchData();
  //   return () => {};
  // }, []);


console.log(typeof(data._id));

  async function confirmBooking(e) {

    console.log(data);
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

    const bookingDetails = {
      roomid: data?._id,
      roomtype: data?.roomtype,
      roomname: data?.roomname,
      // userid: `${login._id}`,
      contact: contact,
      email: email,
      guest: guest,
      children: children,
      occassion: occassion,
      fromdate: fromdate,
      todate: todate,
      totaldays: totaldays,
      totalamount: totaldays * data?.rentperday,
    };

    try {
      const confirmedBooked = await axios.post(
        "/api/bookings/bookroom",
        bookingDetails
      );
      console.log(confirmedBooked);

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
      console.log(error);
      console.log("api did not hit");
      setLoading(false);
      setError(true);
      setTimeout(()=>{
        setError(false);
      }, 6000)
    }

    setEmail("");
    setContact(Number);
    setGuest(Number);
    setOccassion("");
    setFromdate("");
    setTodate("");

    setLoading(false);
  }



  function getAdapter(date) {

      if (!date || !Array.isArray(date) || date.length < 2 || !date[0].$d || !date[1].$d) {
        console.error("Invalid date input:", date);
        return;
    }
    
    console.log(date);

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
    <div style={{height:'100%'}}>
      {/* <section className='booking__header_container'>
        <header>
          <div style={{flexDirection:'column'}}>
            <h3>Let our hotel be your gateway to unforgettable adventures amidst the stunning landscapes of our region. </h3>
            <h3>Experience the perfect blend of relaxation and exploration with us.</h3>
          </div>
          <div>
            <h3 style={{color:'red'}}><b>NB:</b>Payment will be made at arival</h3>
          </div>
        </header>

      </section> */}

      <section className="booking__inputdetails__container">
      {loading && <LinearProgress sx={{ width: "95%" }} />}
            {success && (
              <div className='success'>
                {" "}
                <Success msg={"Booked Successfuly"} />{" "}
              </div>
            )}
            {error && (
              <Error
                message={`Something Happend Couldn't Book; Call frontdesk or try again; it could be your network also`}
              />
            )}
        <div className="date__picker">
        <h2>chooce your CheckIn Date and CheckOut date</h2>
        <Space direction="vertical" size={12} style={{ width: "800px" }}>
          <RangePicker
            format={"YYYY-MM-DD"}
            // popupClassName={styles.calendar}
            onChange={getAdapter}
          />
        </Space>
        </div>
     
        <div className="form__wrapper">

          <form  action="">

            <div className="form__first__section__container">
              <div className="form__field__container">
                  <label htmlFor="">Active Email</label>
                  <input

                    style={{cursor:'vertical-text'}}
                      required
                      type="email"
                      value={email}
                      placeholder="Active Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Confirm Email</label>
                  <input

                    style={{cursor:'vertical-text'}}
                      required
                      type="email"
                      value={confirmEmail}
                      placeholder="Active Email"
                      onChange={(e) => setConfirmEmail(e.target.value)}
                    />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Number of Guests (max count is 2)</label>
                  <InputNumber
                    required
                    min={0}
                    max={2}
                    step={1}
                    value={guest}
                    defaultValue={0}
                    onChange={(value) => setGuest(value)}
                  />
              </div>
              <div className="form__field__container">
                  <label htmlFor="">Phone Contact</label>
                  <input
                    required
                    type="text"
                    value={contact}
                    placeholder="Phone Contact"
                    onChange={(e) => setContact(e.target.value)}
                  />
              </div>
            </div>

{/*------------------ second division of the details panel -----------------*/}
            <div className="form__first__section__container"> 
              <div className="form__field__container">
                  <label htmlFor="">Number of children among the Guest (max count is 2)</label>
                  <InputNumber
                    required
                    min={0}
                    max={2}
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

            <button onClick={(e) => confirmBooking(e)}>Confirm Booking</button>
          </form>
        </div>
      </section>
    </div>
  )
}
