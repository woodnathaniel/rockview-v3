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
import { Modal } from 'antd';
import Password from 'antd/es/input/Password';


export default function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState('')
  const [open, setOpen] = useState(false)

  const handleOk2 = () => {
    setOpen(false)
    window.location.href = '/'
  };

  const handleCancel1 = () => {
    setOpen(false)
    window.location.href = '/booking'
  };

  const submitClick = async(e) =>{
    // if((name == ''|| email=== '' || password === '')){
    //   setError(true)
    //   setResponse('name, email and password are requires')
    //   setTimeout(() =>{
    //     setError(false)
    //   }, 3000)
    // }
    setLoading(true)

    e.preventDefault()
    const details = {
      name,
      email,
      password
    }

    try {
      const registerResult = await (axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/register`, details))
      console.log(registerResult);
      setSucces(true)

      if(registerResult.status === 200){
        // localStorage.setItem('rockviewUser', JSON.stringify(loginPost.data))
        setLoading(false)
        setSucces(true)
        setOpen(true)
        setTimeout(()=>{
          setSucces(false)
        }, 2000)
      }

      setTimeout(()=>{
        setSucces(false)
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
    <div className="register_container">
      <section className="icon_section"><PersonOutlineIcon/></section>
      <header className="register_details_section">
        
        <form action="">
        <sub>
          <h3 style={{color: 'red'}}>{name === ''? 'required*' : ''}</h3>
          <div className="email_div">
            
            <div className='icon'><PersonIcon/></div>
            <input type="text" placeholder='Your full name' onChange={(e)=>setName(e.target.value)}/>
          </div>
        </sub>
          
          <sub>
            <h3 style={{color: 'red'}}>{email === ''? 'required*' : ''}</h3>
            <div className="email_div">
              <div className='icon'><PersonIcon/></div>
              <input type="email" placeholder=' Active Email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
          </sub>

        
          <sub>
            <h3 style={{color: 'red'}}>{password === ''? 'required*' : ''}</h3>
            <div className="email_div">
              <div className='icon'><LockIcon/></div>
              <input id='password' type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
          </sub>

       
          <sub>
            <h3 style={{color: 'red'}}>{confirmPassword === ''? 'required*' : ''}</h3>
            <div className="password_div">
              <div className='icon'><LockIcon /></div>
              <input type="password" placeholder='confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
          </sub>

         
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
    
    <Modal
        open={open}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}>Great!! Successfully Registered</h2>}
        onOk={handleOk2}
        onCancel={handleCancel1}
        okText= 'Home Page'
        cancelText = 'BOOKING PAGE'
        centered
      >

        <>  
       <p> Navigate Back To Home To Explore</p>
        <p>Or Navigate TO The Booking Page</p>
        </>

      </Modal>
  </div>
  )
}
