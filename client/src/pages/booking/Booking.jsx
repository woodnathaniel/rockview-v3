import { useState } from "react";
import { DatePicker, Space, InputNumber } from "antd";
import '../booking/booking.css'


export default function Booking() {

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(Number);
  const [guest, setGuest] = useState(Number);
  const [children, setChildren] = useState(Number)
  const [occassion, setOccassion] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [totaldays, setTotaldays] = useState(Number);


  return (
    <div>
      <section className='booking__header_container'>
        <header>
          <div style={{flexDirection:'column'}}>
            <h3>Let our hotel be your gateway to unforgettable adventures amidst the stunning landscapes of our region. </h3>
            <h3>Experience the perfect blend of relaxation and exploration with us.</h3>
          </div>
          <div>
            <h3 style={{color:'red'}}><b>NB:</b>Payment will be made at arival</h3>
          </div>
        </header>

      </section>

      <section className="booking__inputdetails__container">
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
                  <label htmlFor="">Number of Guests</label>
                  <InputNumber
                    required
                    min={0}
                    max={100}
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
                  <label htmlFor="">Number of children among the Guest</label>
                  <InputNumber
                    required
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

            <button >Confirm Booking</button>
          </form>
        </div>
      </section>
    </div>
  )
}
