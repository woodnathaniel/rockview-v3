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
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';





export default function LogIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState({})
  const [numberRoom, setNumberRooms] = useState('')

 
  const googleAuth = () => {
    window.open("http://rockviewhospitalities-api.vercel.app/auth/google/callback", "_self");
  };

  const submitLoginDetails = async (e) =>{
    setLoading(true)
    e.preventDefault()
    const user ={
      email,
      password
    } 

    try {
      const loginPost = await (axios.post('http://rockviewhospitalities-api.vercel.app/api/users/login', user))
      console.log(loginPost);

      
      if(loginPost.status === 200){
        console.log(loginPost);
        localStorage.setItem('rockviewUser', JSON.stringify(loginPost.data))
        setSucces(true)

        setTimeout(()=>{
          setSucces(false)
          window.location.href='/'
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
      <section className="click__home"><HomeOutlinedIcon/><h4>Home</h4></section>
      <div className="container">
        <section className="icon_section"><PersonOutlineIcon/></section>
        <header className="details_section">
          
          <form action="">
            <div className="email_div">
              <div className='icon'><PersonIcon/></div>
              <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="password_div">
              <div className='icon'><LockIcon /></div>
              <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
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
      
    </div>
  )
}
