import {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
const NavBar = () => {

  const [isNavShowing, setIsNavShowing] = useState(true)

  return (
    <div className= 'main__container'>
      <nav className={`nav__bar ${isNavShowing? 'show__nav': 'hide__nav'}`}>
        <NavLink to='/' >Home</NavLink>
        <NavLink to='/facilities' >Facilities</NavLink>
        <NavLink to='/rooms' >Rooms</NavLink>
        <NavLink to='/contact' >Contacts</NavLink>
        
        {/* <div className='credentials' href="">Login</div>
        <div className='credentials' href="">SingUp</div> */}
        
      </nav>
      <div className='toggle__icon' onClick={()=> setIsNavShowing(!isNavShowing)}>
        {!isNavShowing? <DehazeIcon/> : <CloseIcon/>}
      </div>
    </div>
  );
}

export default NavBar;
