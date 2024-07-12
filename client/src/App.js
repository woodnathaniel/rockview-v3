import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Facilities from './pages/facilities/Facilities';
import Rooms from './pages/rooms/Rooms';
import Contact from './pages/contact/Contact';
import Footer from './components/footer/Footer';
import BookingScreen from './pages/bookingScreen/BookingScreen';
import Booking from './pages/booking/Booking';
import LogIn from './pages/login/LogIn';
import Register from './pages/register/Register';
import AdminPanel from './pages/adminpanel/AdminPanel';
import {UsersBookingsCard} from './components/admincards/Admincards.jsx'





function App() {
  return (
    <div style={{ width:'100vw', 
                  // display: 'grid',
                  // placeItems: 'center', 
                  position:'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/facilities' element={<Facilities/>}/>
        <Route exact path='/rooms' element={<Rooms/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/booking' element={<BookingScreen/>}/>
        <Route exact path="/booking/:roomID" element={<Booking />} />
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/adminpanel" element={<AdminPanel />} />
        <Route exact path="/adminpcards" element={<UsersBookingsCard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
