import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer } from 'antd';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import KingBedIcon from '@mui/icons-material/KingBed';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import NavProfile from '../nav_profile/NavProfile';
import CollectionsIcon from '@mui/icons-material/Collections';


const NavBar = () => {
  const [isNavShowing, setIsNavShowing] = useState(true)
  const [open, setOpen] = useState(false);


  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    setIsNavShowing(!isNavShowing)
  };



  return (
    <div className= 'main__container'>
      
      <Drawer title="Menu" onClose={onClose} open={open}>
        <NavLink to='/' ><HomeIcon/>Home</NavLink>
        <NavLink to='/facilities' ><SpaceDashboardIcon/>Facilities</NavLink>
        <NavLink to='/rooms' ><KingBedIcon/>Rooms</NavLink>
        <NavLink to='/contact' ><ContactMailIcon/>Contacts</NavLink>
        <NavLink to='/gallery' ><CollectionsIcon/>Gallery</NavLink>
        <h3>Profile</h3>
        <div style={{padding: '10px', borderTop: 'solid 2px black',  borderBottom: 'solid 2px  black',}}>
        <NavProfile />
        </div>
        
      </Drawer>
      <div className='logo'>
        <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/cropped_image_logo.png?alt=media&token=5543b076-01dc-4263-9a3c-5ec16b48d13a" alt="" />
      </div>
      <nav className={`nav__bar ${isNavShowing? 'show__nav': 'hide__nav'}`}>
        <NavLink to='/' ><h4>Home</h4></NavLink>
        <NavLink to='/facilities' ><h4>Facilities</h4></NavLink>
        <NavLink to='/rooms' ><h4>Rooms</h4></NavLink>
        <NavLink to='/contact' ><h4>Contacts</h4></NavLink>
        <NavLink to='/gallery' ><h4>Gallery</h4></NavLink>
        
        {/* <div className='credentials' href="">Login</div>
        <div className='credentials' href="">SingUp</div> */}
        <div>
          <NavProfile />
        </div>
      </nav>
      <div className='toggle__icon' onClick={showDrawer}>
         <DehazeIcon/> 
      </div>
    </div>
  );
}

export default NavBar;
