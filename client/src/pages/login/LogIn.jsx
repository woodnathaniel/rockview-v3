import { useState } from 'react';
import './login.css'
import axios from 'axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';




export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const googleAuth = () => {
      window.open("http://localhost:5000/auth/google/callback", "_self");
  };

  const submitLoginDetails = async (e) =>{
    e.preventDefault()
    const user ={
      email,
      password
    } 

    try {
      const loginPost = await (axios.post('/api/users/login', user))
      console.log(loginPost);
    } catch (error) {
      console.log(error);
    }
    
  }
  
  return (
    <div className="login_main_container">
      <div className="container">
        <section className="icon_section"><PersonOutlineIcon/></section>
        <section className="details_section">
          <form action="">
            <div className="email_div">
              <div className='icon'><PersonIcon/></div>
              <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="password_div">
              <div className='icon'><LockIcon /></div>
              <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit' onClick={(e)=> submitLoginDetails(e)}><LoginIcon/><h4>Login</h4></button>
          </form>

          
        </section>
        
      </div>
      
    </div>
  )
}
