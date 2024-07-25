import { useState, useEffect } from 'react';
import './contact.css'
import NavBar from '../../components/navbar/NavBar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';
import { message } from 'antd';import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { red } from '@mui/material/colors';


const Contact = () => {



  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mailMessage, setMailMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [error, setError] = useState(false)

  const [state, handleSubmit] = useForm("xnnajzyz");


  useEffect(() => {
    let timer;
    if (state.succeeded) {
      setSucces(true);
      timer = setTimeout(() => {
        setSucces(false);
      }, 300);
    } else{
      // setError(true);
      // timer = setTimeout(() => {
      //   setError(false);
      // }, 300);
    }

    return () => clearTimeout(timer);
  }, [state.succeeded]);

  const submit = async(e) =>{
    e.preventDefault()
    setLoading(true)
    const mail = {
      name: name, 
      email: email, 
      message: mailMessage
    }
    try {
      const sendMail = await axios.post('http://rockviewhospitalities-api.vercel.app/api/user/contact', mail)
      if(sendMail.status === 200){
        setLoading(false)
        setSucces(true)
        setTimeout(()=>{
          setSucces(false)
        },300)
      }
      console.log(sendMail);

    } catch (error) {

      setLoading(false)
      setError(true)
      setTimeout(()=>{
        setError(false)
      }, 300)
    }
    
    setLoading(false)
  }

  return (
    <div>
      {success && message.success('mail sent succesfully')}
      {error && message.error('mail sent Unsuccesfully')}
      <NavBar/>
      <header className='contact_header_secction'>
        <h1>CONTACT-US</h1>
      </header>
      <section className='contact_header_text_section'>
        <h3>WE ARE HERE FOR YOU</h3>
        <p>You are welcome to Rockview Hotel. We are much happy to welcome you home.</p> <p>Do you have any enquiry, complaint or request?</p>
        <p>Please forward it to our support desk and we will get back to you as soon as possible</p> 
      </section>
      <section className='contact_details'>
        <div className='contact_info'>
          <div>
            <h2>Gorog-Tongo Bolgatanga</h2>
            <h2>Upper East Region</h2>
            <h2>Ghana, West Africa</h2>
          </div>
          <div>
            <h3>Phone: +233 20 115 6150, +233 27 598 9534</h3>
            <h3>GPS: UT-O2O6-2986</h3>
            <h3>Email: rockviewhotel@yahoo.com</h3>
          </div>

        </div>
        <div className='contact_message'>
          <form action="" onSubmit={handleSubmit}>
            <div className='message_details'>
              <label htmlFor="">Name</label>
              <h3 style={{color: 'red'}}>{name === ''? 'require*': '' }</h3>
              <input  id="name"
                type="text" 
                name="name"                
                onChange={(e)=> setName(e.target.value)}
                />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
              />
            </div>
            <div className='message_details'>
              <label htmlFor="">Email</label>
              <h3 style={{color: 'red'}}>{email === ''? 'require*': '' }</h3>
              <input  id="email"
                type="email" 
                name="email"
                onChange={(e)=> setEmail(e.target.value)}
               />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
              />
            </div>
            <div className='message_details'>
              <label htmlFor="">Message</label> 
              <h3 style={{color: 'red'}}>{mailMessage === ''? 'require*': '' }</h3>
              <textarea id="message"
                name="message" 
                rows="10" cols="50"
                onChange={(e)=> setMailMessage(e.target.value)}
              ></textarea>
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
              />
            </div>
            <button type='submit' disabled={state.submitting}>Submit</button>
          </form>
        </div>
      </section>
    <Footer />
    </div>
  );
}

export default Contact;
