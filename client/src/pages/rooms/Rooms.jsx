import { useState } from 'react';
import { Header } from '../../components/headerNav/Header';
import '../rooms/rooms.css'
import { Carousel } from 'antd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Footer from '../../components/footer/Footer';

import { Modal } from 'antd';


const Rooms = () => {

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const formattedAmountExecutive = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD' // GHS is the currency code for Cedis
  }).format(20);

  const formattedAmountStandard = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD' // GHS is the currency code for Cedis
  }).format(15);

  const showModal1 = () => {
    setOpen1(true);
  };
  const showModal2 = () => {
    setOpen2(true);
  };

  const handleOk1 = () => {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
      setOpen1(false);
    }, 3000);
  };
  const handleOk2 = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      setOpen1(false);
    }, 3000);
  };

  const handleCancel1 = () => {
    setOpen1(false);
  };
  const handleCancel2 = () => {
    setOpen2(false);
  };




  return (
    <div className={`${open1 || open2 ? 'viewDetailsFilter' : ''}`} style={{ display: 'grid', placeItems: 'center',position: 'relative'}}>
      <section className="room__header">
        <Header  imgUrl= 'https://firebasestorage.googleapis.com/v0/b/rockviewhotel-752a8.appspot.com/o/rooms%2Funsplash%201.png?alt=media&token=9b094d70-961d-4b99-89a2-56ec2aa0773d'/>
      </section>

      {/*--------------- room text -------------------*/}
      <section className="room__header-text">
        <h1>ROOMS AND RATES</h1>
        <p>
        Each of our rooms is furnished with all the facilities ( Standard double beds, King Size beds, Air-condition,
        <br /> Fan, modern light, study desk and visitor chair, mini fridge, Satellite TV, Washroom and room services)
        <br /> to make you feel home away from home
        </p>
      </section>

      {/* ----------------- room types pics ------------------- */}
      <section className="room__type-picContainer">
          <div className='first__section'>
            <div className='room__type-pic'>
            <Carousel className='antd-room-carousel' autoplay arrows infinite={true}>
              <div>
               <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5742.JPG?alt=media&token=0198fd16-04b8-4629-ac84-d42a4fc688b6" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5745.JPG?alt=media&token=562b5011-d2f3-4bfb-9b38-5cc1dfceeeae" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5749.JPG?alt=media&token=c190c24a-1470-4898-b360-89d9b055799a" alt="pictures of rooms" />
              </div>
            </Carousel>
            </div>

{/* ----------- room type name container --------------- */}
            <div className='room__type-name'>
              <h1>EXECUTIVE SUITE</h1>
            </div>

{/* ----------- room type name container --------------- */}
             <div className='room__type-datails'>
                <div className='icons' onClick={showModal1}> <AddCircleIcon/> <h4>VIEW ROOM DETAILS</h4></div>
                <div>  <h4> {formattedAmountExecutive}  Avg/night</h4></div>
            </div>
          </div>


        <div className='first__section'>
        
            <div className='room__type-pic'>
            <Carousel className='antd-room-carousel' autoplay arrows infinite={true}>
              <div>
               <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5746.JPG?alt=media&token=10025961-c098-4512-bfb5-12aee2c0b45a" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5749.JPG?alt=media&token=c190c24a-1470-4898-b360-89d9b055799a" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5753.JPG?alt=media&token=682b02fa-caf2-4783-b8da-c39a1fed59eb" />
              </div>
            </Carousel>
            </div>


{/* ----------- room type name container --------------- */}
            <div className='room__type-name'>
              <h1>STANDARD SUITE</h1>
            </div>

{/* ----------- room type name container --------------- */}
             <div className='room__type-datails'>
                <div className='icons' onClick={showModal2}> <AddCircleIcon /> <h4>VIEW ROOM DETAILS</h4></div>
                <div>  <h4> {formattedAmountStandard}  Avg/night</h4></div>
            </div>
          </div>      
    </section>


      <Modal
        open={open1}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}>Executive Room Details</h2>}
        onOk={handleOk1}
        onCancel={handleCancel1}
        centered
      >

        <> 
        <ul>
          <li><h3>Spacious bed rooms with King Size Beds</h3></li>
          <li><h3>Fully Air-condition Rooms</h3></li>
          <li><h3>Mini Fridges</h3></li>
          <li><h3>Satellite &amp; Multi-TV system</h3></li>
          <li><h3>Solar electricity Back-up system</h3></li>
        </ul>
          
          
          
          
        </>

      </Modal>

      <Modal
        open={open2}
        title={<h2 style={{color:'rgb(163, 5, 5)'}}>Standard Room Details</h2>}
        onOk={handleOk2}
        onCancel={handleCancel2}
        centered
      >

        <>  
        <ul>
          <li><h3>Spacious bed rooms with Standard Double Size Beds</h3></li>
          <li><h3>Fully Air-conditioned Rooms and Ceiling Fan</h3></li>
          <li><h3>Mini Fridges</h3></li>
          <li><h3>Satellite &amp; Multi-TV system</h3></li>
          <li><h3>Solar electricity Back-up system</h3></li>
        </ul>
        </>

      </Modal>

      
   



    <Footer />

    </div>
  );
}

export default Rooms;
