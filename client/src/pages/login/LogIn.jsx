import { useState } from 'react';
import './login.css'
import axios from 'axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Error from '../../components/error/Error'
import Success from '../../components/success/Success';
import Loading from '../../components/Loading/Loading';
import { Modal } from 'antd';





export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState({})

 


  const handleOk2 = () => {
    setOpen(false)
    window.location.href = '/'
  };

  const handleCancel1 = () => {
    setOpen(false)
    window.location.href = '/booking'
  };

  const submitLoginDetails = async (e) =>{
    setLoading(true)
    e.preventDefault()
    const user ={
      email,
      password
    } 

    try {
      const loginPost = await (axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, user))

      
      if(loginPost.status === 200){
        localStorage.setItem('rockviewUser', JSON.stringify(loginPost.data))
        setLoading(false)
        setSucces(true)
        setOpen(true)
        setTimeout(()=>{
          setSucces(false)
          // window.location.href='/booking'
        }, 2000)
      }

    }catch (error) {
      console.log(error);
      console.log(error.message);
      setResponse([error?.response?.data, error.message])
      setError(true)
      setLoading(false)
      setTimeout(()=>{
        setError(false)
      }, 7000)
    }
    
  }
  
  return (
    <div className="login_main_container">
      <div className="login_container">
        <section className="icon_section"><PersonOutlineIcon/></section>
        <header className="login_details_section">
          
          <form action="">
            <div>
              <h3 style={{color: 'red' }}>{email === ''? 'required*' : ''}</h3>
              <div className="email_div">
                <div className='icon'><PersonIcon/></div>
                <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
              </div>
            </div>
            
            <div>
               <h3 style={{color: 'red' }}>{password === ''? 'required*' : ''}</h3>
              <div className="password_div">
                <div className='icon'><LockIcon /></div>
                <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
              </div>
            </div>
            
            <button type='submit' onClick={(e)=> submitLoginDetails(e)}>
              {
                loading ? 
                <Loading /> : 
                <div style={{
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap:'20px', 
                  padding: '5px 7px'
                }}><LoginIcon/><h4>Login</h4></div>
              }
            </button>
          </form>

          
        </header>
        <div style={{ marginTop: '20px'}}>
          {
            success && <Success msg={'Login successful'}/> 
            
          }
          {
            error && <Error message={`Error: ${response}`}/>
          }
        </div>
      </div>

      <Modal
        open={open}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}> Successfully Logged In</h2>}
        onOk={handleOk2}
        onCancel={handleCancel1}
        okText= 'Home Page'
        cancelText = 'BOOKING PAGE'
        centered
      >

        <>  
        Navigate Back To Home To Explore Or The Booking
        </>

      </Modal>

    </div>
  )
}
