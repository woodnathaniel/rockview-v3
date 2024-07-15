import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, message, Space, Tooltip } from 'antd'
import './navprofile.css'
import LogoutIcon from '@mui/icons-material/Logout';



function NavProfile() {

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  
  const items = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutIcon />,
    },
   
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };




  return (
    <div>
      <div className='auth_navprofile'>
          {
            true ? <>   <Dropdown.Button menu={menuProps} placement="bottom" >
            <UserOutlined />{'WOOD'}
          </Dropdown.Button></> :
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