  import { useState, useEffect } from 'react';
  import './login.css'
  import axios from 'axios';
  import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  
  import LoginIcon from '@mui/icons-material/Login';
  import RotateLeftIcon from '@mui/icons-material/RotateLeft';
  import PersonIcon from '@mui/icons-material/Person';
  import LockIcon from '@mui/icons-material/Lock';
  import Error from '../../components/error/Error'
  import Success from '../../components/success/Success';
  import Loading from '../../components/Loading/Loading';
  import { Modal } from 'antd';
  import { message } from 'antd';





  export default function LogIn() {

    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSucces] = useState(false)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [response, setResponse] = useState({})
    const [hideMail, setHideMail] = useState(false)
    const [antdMssg, setAntdMssg] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });

    useEffect(() => {
      
      messageApi.open({
        type: 'success',
        content: 'Check out you email to reset password',
        duration: 20,
      });

      return () => {
        
      };
    }, [antdMssg]);

  //handle form change 
    function handleOnChange(event){
      console.log(event);
      
      const {name, value} = event.target
      setFormData((prevData)=>({
        
          ...prevData,
          [name]: value
      }))
    }


    //handle Modal show up and hide functionalities
    const handleOk2 = () => {
      setOpen(false)
      window.location.href = '/'
    };

    const handleCancel1 = () => {
      setOpen(false)
      window.location.href = '/booking'
    };

    function forgetPassword(e){
      e.preventDefault()
      formData.password = ''
      setHideMail(true)
      console.log(formData);
      
    }


   //On form submit, checks on either password reset or login option
    const submitLoginDetails = async (e) =>{
      setLoading(true)
      e.preventDefault()
      
      if(formData.password !== ''){
        try {
          const loginPost = await (axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, formData))
  
          
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
        
      }else{

        try {
          const resetPassword = await (axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/rockview/resetpasswordcheck`, formData))
          console.log(resetPassword);
          if(resetPassword){
            setAntdMssg(true)
          }
        } catch (error) {
          
        }
      }
    }

      

    return (
      <div className="login_main_container">
        <div className="login_container">
          <section className="icon_section"><PersonOutlineIcon/></section>
          <header className="login_details_section">
            
            <form action="">
              <h3 className={hideMail ? 'show__text': 'hide_password'} >
                Forgot Password? Enter your Email to reset
              </h3>
              <div>
                <h4 style={{color: 'red' }}>
                  {
                    formData.email === ''? 
                    'required*' : 
                    !/\S+@\S+\.\S+/.test(formData.email)?
                    'incorrect email format':
                    ''
                  }
                </h4>
                <div className="email_div">
                  <div className='icon'><PersonIcon/></div>
                  <input name='email' type="email" placeholder='Email' onChange={(e)=>handleOnChange(e)}/>
                </div>
              </div>
              
              <div  className={hideMail ? 'hide_password':  ''}>
                  <h4 style={{color: 'red' }}>{ formData.password === ''? 'required*' : ''}</h4>
                <div className="password_div">
                  <div className='icon'><LockIcon /></div>
                  <input name='password' type="text" placeholder='Password' onChange={(e)=>handleOnChange(e)}/>
                </div>
              </div>
              
              <section style={{
                display: 'flex',
                alignItems: 'baseline',
                gap : '50px',
                position: 'relative'
              }}>
                <button type='submit' onClick={(e)=> submitLoginDetails(e)}>
                  {
                    loading ? 
                    <Loading /> : 
                    <div style={{
                      display: 'flex', 
                      alignItems: 'center',
                      gap:'20px', 
                      padding: '5px 7px'
                    }}>
                      {
                        hideMail ? <RotateLeftIcon/> : <LoginIcon/>
                      }
                      <h4>{ hideMail ? 'Reset' : 'Login'}</h4>
                    </div>
                  }
                </button>
                  <label 
                    htmlFor=""
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap:'10px',
                      position: 'absolute',
                      right :'0px',
                      bottom : '0px'
                    }}
                  >
                    <a href="" style={{textDecoration: 'underline'}} onClick={(e) =>forgetPassword(e)}>forgot password? </a>
                  </label>
              </section>
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
