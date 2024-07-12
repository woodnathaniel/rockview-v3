import React from 'react'
import './register.css'
import { useState } from 'react';
import axios from 'axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Error from '../../components/error/Error'
import Success from '../../components/success/Success';
import Loading from '../../components/Loading/Loading';
import HomeIcon from '@mui/icons-material/Home';


export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState('')

  const submitClick = async(e) =>{
    setLoading(true)

    e.preventDefault()
    const details = {
      name,
      email,
      password
    }

    try {
      const registerResult = await (axios.post('/api/users/register', details))
      console.log(registerResult);
      setSucces(true)

      setTimeout(()=>{
        setSucces(false)
        // window.location.href='/booking'
      }, 2000)
    } catch (error) {
      setError(true)
      setLoading(false)
      setTimeout(()=>{
        setError(false)
      }, 7000)
      setResponse(error.response.data.error)
      console.log(error);
      console.log(error.response.data.error);
    }
  }



  return (
    <div className="login_main_container">
    <section className="click__home"><HomeIcon/><h4>Home</h4></section>
    <div className="container">
      <section className="icon_section"><PersonOutlineIcon/></section>
      <header className="details_section">
        
        <form action="">
          <div className="email_div">
            <div className='icon'><PersonIcon/></div>
            <input type="text" placeholder='Your full name' onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="email_div">
            <div className='icon'><PersonIcon/></div>
            <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="email_div">
            <div className='icon'><PersonIcon/></div>
            <input type="text" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="password_div">
            <div className='icon'><LockIcon /></div>
            <input type="text" placeholder='confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
          <button type='submit' onClick={(e)=> submitClick(e)}>
            {
              loading ? 
              <Loading /> : 
              <div style={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                gap:'20px', 
                padding: '5px 7px'
              }}><LoginIcon/><h4>Sing Up</h4></div>
            }
          </button>
        </form>

        
      </header>
      <div style={{ marginTop: '20px'}}>
        {
          success && <Success msg={'User registered successfully'}/> 
          
        }
        {
          error && <Error message={`${response}`}/>
        }
      </div>
    </div>
    
  </div>
  )
}
