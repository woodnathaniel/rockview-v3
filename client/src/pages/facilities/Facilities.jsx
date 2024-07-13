import { useRef } from 'react';
import { Header } from '../../components/headerNav/Header';
import '../facilities/facilities.css'
import Footer from '../../components/footer/Footer';


const Facilities = () => {



  return (
    <div>
      <section className="facilities__header">
        <Header imgUrl='https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/facilities%2F1%2520International%2520Poolside%2520Bars%201.png?alt=media&token=92924686-a324-4fad-b18c-cd1189ec8e44'/>
      </section>

{/* Facilities header text section */}
      <section className="facilities__header-text">
        <h1>FACILITIES</h1>
        <p>
          We want your stay at our lush hotel to be truly unforgettable. That is why we give special attention to all of your needs so
          <br />that we can ensure an experience quite uniquw. Rockview offers the perfect setting with stunning views for leisure
          <br />and Our facilities will help you enjoy the best of all.
        </p>



                                           
      </section>

{/* Facilities header text section */}
      <section className='facilities__pic-section'>
        <div className='facility__pic-conference  facility__pic-responsive'>
        </div>

        <div className='facility__pic-restaurant  facility__pic-responsive'>
        </div>

        <div className='facility__pic-miniMart  facility__pic-responsive'>
        </div>

        <div className='facility__pic-indoorGames  facility__pic-responsive'>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Facilities;
