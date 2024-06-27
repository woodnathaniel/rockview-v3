import React from 'react';
import { Header } from '../../components/headerNav/Header';
import '../rooms/rooms.css'
import { Carousel } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Rooms = () => {

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const formattedAmountExecutive = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS' // GHS is the currency code for Cedis
  }).format(2000);

  const formattedAmountStandard = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS' // GHS is the currency code for Cedis
  }).format(1500);





  return (
    <div style={{ display: 'grid', placeItems: 'center',position: 'relative'}}>
      <section className="room__header">
        <Header  imgUrl= 'https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2Funsplash%201.png?alt=media&token=9b094d70-961d-4b99-89a2-56ec2aa0773d'/>
      </section>

      {/*--------------- room text -------------------*/}
      <section className="room__header-text">
        <h1>ROOMS AND RATES</h1>
        <p>
        Each of our bright, light-flooded rooms come with everything you could possibly need for a comfortable stay. And yes,
        <br /> comfort isn’t our only objective, we also value good design, sleek contemporary furnishing complemented 
        <br />by the rich tones of nature’s palette as visible from our rooms’ sea-view windows and terraces.
        </p>
      </section>

      {/* ----------------- room types pics ------------------- */}
      <section className="room__type-picContainer">
          <div className='first__section'>
            <div className='room__type-pic'>
            <Carousel className='antd-room-carousel' autoplay arrows infinite={true}>
              <div>
               <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5742.JPG?alt=media&token=64d98fa2-f42a-42a9-80e6-a868b1ae58e8" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5749.JPG?alt=media&token=10cf03df-6bd4-401a-a831-de44e914eb1e" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5746.JPG?alt=media&token=ad73413a-432c-40f8-88b9-c09999819b92" alt="pictures of rooms" />
              </div>
            </Carousel>
            </div>

{/* ----------- room type name container --------------- */}
            <div className='room__type-name'>
              <h1>EXECUTIVE SUITE</h1>
            </div>

{/* ----------- room type name container --------------- */}
             <div className='room__type-datails'>
                <div> <AddCircleIcon/> <h4>VIEW ROOM DETAILS</h4></div>
                <div>  <h4> {formattedAmountExecutive}  Avg/night</h4></div>
            </div>
          </div>


        <div className='first__section'>
        
            <div className='room__type-pic'>
            <Carousel className='antd-room-carousel' autoplay arrows infinite={true}>
              <div>
               <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5742.JPG?alt=media&token=64d98fa2-f42a-42a9-80e6-a868b1ae58e8" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5749.JPG?alt=media&token=10cf03df-6bd4-401a-a831-de44e914eb1e" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2FIMG_5746.JPG?alt=media&token=ad73413a-432c-40f8-88b9-c09999819b92" alt="pictures of rooms" />
              </div>
            </Carousel>
            </div>


{/* ----------- room type name container --------------- */}
            <div className='room__type-name'>
              <h1>STANDARD SUITE</h1>
            </div>

{/* ----------- room type name container --------------- */}
             <div className='room__type-datails'>
                <div> <AddCircleIcon/> <h4>VIEW ROOM DETAILS</h4></div>
                <div>  <h4> {formattedAmountStandard}  Avg/night</h4></div>
            </div>
          </div>      
    </section>

    </div>
  );
}

export default Rooms;
