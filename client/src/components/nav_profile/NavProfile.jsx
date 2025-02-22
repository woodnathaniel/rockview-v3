import { useState, useEffect } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, message, Space, Tooltip } from 'antd'
import './navprofile.css'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';


function NavProfile() {

  const [isLogin, setIsLogin] = useState(true)
  const [user, setUser] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(()=>{
    const rockviewUser = localStorage.getItem('rockviewUser');
    const user = JSON.parse(rockviewUser)
    setUser(user)
    if(user){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  }, [])


  const handleButtonClick = (e) => {
    
  };
  function handleProfileClick(){
    window.location.href = '/profile'
  }
  const loginhandle = (e) => {
    window.location.href = '/login'
  };
  const signUphandle = (e) => {
    window.location.href = '/register'
  };
  
  const adminhandle = (e) => {
    window.location.href = '/adminpanel'
  };
  const logOuthandle = (e) => {
    localStorage.removeItem('rockviewUser')
    window.location.reload()
  };
  
  const items = [
    {
      label: `${isLogin ? 'Profile' : ''}`,
      key: 1,
      icon: isLogin ? <UserOutlined /> : '',
      onClick: isLogin ? handleProfileClick : handleButtonClick,
    },
    {
      label: `${isLogin ? 'Logout' : ''}`,
      key: 2,
      icon: isLogin ? <LogoutIcon /> : '',
      onClick: isLogin ? logOuthandle : handleButtonClick
    },

    {
      label: `${user?.isAdmin ? 'Admin Panel' : ''}`,
      key: 4,
      icon: user?.isAdmin ? <DashboardIcon /> : '',
      onClick: user?.isAdmin ? adminhandle : handleButtonClick
    },
    
    {
      label: `${!isLogin ? 'Sign Up' : ''}`,
      key: 4,
      icon: !isLogin ? <HowToRegIcon /> : '',
      onClick: !isLogin ? signUphandle : handleButtonClick
    },
    {
      label: `${!isLogin ? 'Login' : ''}`,
      key: 3,
      icon: !isLogin ? <LoginIcon /> : '',
      onClick: !isLogin ? loginhandle : handleButtonClick
    },
   
  ];

  const menuProps = {
    items,
  };

  const checkIsLogin = ()=>{
    if(isLogin){
      return menuProps[0]
    }else{
      return menuProps
    }
  }




  return (
    <div>
      <div className='auth_navprofile'>
          {
            true ? 
            <>   
              <Dropdown.Button menu={menuProps} placement="bottom" >
              <UserOutlined />{!isLogin ? 'Login / SignUp' : user?.name?.toUpperCase()}
              </Dropdown.Button>
            </> :
            <> 
              <button>Signup</button>
              <button onClick={()=>window.location.href = '/login'}>Login</button> 
            </>
          }
          
        </div>
    </div>
  )
}

export default NavProfile