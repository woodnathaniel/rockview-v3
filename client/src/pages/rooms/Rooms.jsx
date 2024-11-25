import React, { useEffect, useRef, useState } from 'react';
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



  const roomsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5, 1],
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, observerOptions);

    const { current: serviceElement } = roomsRef;
    if (serviceElement) {
      observer.observe(serviceElement);
    }

    return () => {
      if (serviceElement) {
        observer.unobserve(serviceElement);
      }
    };
  }, []);


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
        <Header  imgUrl= 'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6240.JPG?alt=media&token=31e636d5-e78a-4462-bbf4-77a95ba7d51d'/>
      </section>

      {/*--------------- room text -------------------*/}
      <section className="room__header-text rooms__animation" ref={roomsRef}>
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
               <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6321.JPG?alt=media&token=e71d064b-9d52-43de-857b-f3e5acc0fdc6" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6331.JPG?alt=media&token=79d3ea5b-3b7b-4576-948d-a12e7e652af5" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/excutive_pic_update.jpg?alt=media&token=eaa70fd1-8a39-440b-b91d-52a90322d98b" alt="pictures of rooms" />
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
               <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/standard_2.jpg?alt=media&token=75fffb6f-5b03-4420-9983-278d8fa92146" alt="pictures of rooms" />
              </div>
              <div>
                <img src="https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/standard_4.jpg?alt=media&token=b8450489-ff86-4c9a-ab75-e66e3828ea45" alt="pictures of rooms" />
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
