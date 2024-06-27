import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Facilities from './pages/facilities/Facilities';
import Rooms from './pages/rooms/Rooms';
import Contact from './pages/Contact';
import Footer from './components/footer/Footer';
import BookingScreen from './pages/bookingScreen/BookingScreen';



function App() {
  return (
    <div style={{width:'100vw', display: 'grid', placeItems: 'center'}}>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/facilities' element={<Facilities/>}/>
        <Route exact path='/rooms' element={<Rooms/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/booking' element={<BookingScreen/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
