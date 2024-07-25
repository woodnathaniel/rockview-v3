import { useRef } from 'react';
import { Header } from '../../components/headerNav/Header';
import '../facilities/facilities.css'
import Footer from '../../components/footer/Footer';


const Facilities = () => {



  return (
    <div>
      <section className="facilities__header">
        <Header imgUrl='https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6275.JPG?alt=media&token=d83f114a-69d4-459b-a1bf-ffb5819f872b'/>
      </section>

{/* Facilities header text section */}
      <section className="facilities__header-text">
        <h1>FACILITIES</h1>
        <p>
          We want your stay at our lush hotel to be truly unforgettable. That is why we give special attention to all of your needs so
          <br />that we can ensure an experience quite unique. Rockview offers the perfect setting with stunning views for leisure
          <br />and Our facilities will help you enjoy the best of all.
        </p>



                                           
      </section>

{/* Facilities header text section */}
      <section className='facilities__pic-section'>
        

        <div className='facility__pic-miniMart  facility__pic-responsive'>
        </div>

        <div className='facility__pic-conference  facility__pic-responsive'>
        </div>
        
        <div className='facility__pic-indoorGames  facility__pic-responsive'>
        </div>

        <div className='facility__pic-restaurant  facility__pic-responsive'>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Facilities;
