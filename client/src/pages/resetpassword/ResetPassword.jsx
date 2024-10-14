
import { useState } from 'react'
import { Modal } from 'antd';
import Password from 'antd/es/input/Password'
import Error from '../../components/error/Error'
import Success from '../../components/success/Success';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';  
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { message } from 'antd';



export const ResetPassword = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)
  const [success, setSucces] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [response, setResponse] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  let formDataResult = {}

  const handleOnChange= (e)=>{
    e.preventDefault()
    const {name, value} = e.target
    setFormData((prev) =>({
        ...prev,
        [name]: value    
      }))

      formDataResult = {
        email: formData.email,
        password: formData.password
      }
  }

  const handleOk2 = () => {
    setOpen(false)
    window.location.href = '/'
  };

  const handleCancel1 = () => {
    setOpen(false)
    window.location.href = '/booking'
  };

  const handleOnSubmit = async (e)=>{

    setLoading(true)
    try {
      const submit = await (axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/rockview/resetpasswordcheck`, formDataResult))
      console.log(submit);
      
      if(submit.status === 200){

        messageApi.open({
          type: 'success',
          content: 'Password Changed',
          duration: 20,
        });
        
        console.log('successful');
        
      }
    } catch (error) {
      console.log(error.message);
      
    }
    setLoading(true)
    
  }



  return (
    <div className="login_main_container">
    <div className="login_container">
      <section className="icon_section"><PersonOutlineIcon/></section>
      <header className="login_details_section">
        
        <form action="">
          <div>
            <h5 style={{color: 'red' }}>
              {
                formData.email === ''? 
                'required*' : 
                !/\S+@\S+\.\S+/.test(formData.email)?
                'incorrect email format':
                ''
              }</h5>
            <div className="email_div">
              <div className='icon'><PersonIcon/></div>
              <input name='email' type="email" placeholder='Email' onChange={(e)=>handleOnChange(e)}/>
            </div>
          </div>
          
          <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
          }}>
              <h5 style={{color: 'red' }}>{formData.password === ''? 'required*' : ''}</h5>
            <div className="password_div">
              <div className='icon'><LockIcon /></div>
              <input name='password' type="text" placeholder='Password' onChange={(e)=>handleOnChange(e)}/>
            </div>
            
            <section>
                <h5 style={{color: 'red' }}>
                  {
                    formData.confirmPassword === '' ? 
                    'required*' : 
                    formData.confirmPassword !== formData.password ?
                    `password dont match` : ''
                  }</h5>
              <div className="password_div">
                <div className='icon'><LockIcon /></div>
                <input name='confirmPassword' type="text" placeholder='Password' onChange={(e)=>handleOnChange(e)}/>
              </div>
            </section>
          </div>
          
          <button type='submit' onClick={(e) => handleOnSubmit(e)}>
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
      title={<h2 style={{color:'rgb(163, 5, 5)'}}>Password Successfully Changed🥳</h2>}
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
