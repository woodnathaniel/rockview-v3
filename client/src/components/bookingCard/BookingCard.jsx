import{ useState, useEffect } from 'react'
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';

const { Meta } = Card;



export const BookingCard = ({data}) => {

  const [imageurls, setImageurls] = useState([]);

  useEffect(() => {
    if (data?.imageurls) {
      setImageurls(data.imageurls);
    }
  }, [data]);

  const formattedAmountExecutive = new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS' // GHS is the currency code for Cedis
  }).format(data?.rentperday);

  const [show, setShow] = useState(false);
  const [bookNow, setBookNow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

  const BookingScreen = useNavigate()
  const handleClick = () => {
    // Navigate to the desired route on button click
    BookingScreen(`/booking/${data._id}`,  { state: {data: data} });
  };


  return (
    <div>
      <Card
        style={{
          width: 650,
        }}
        cover={
            <div>
              <Carousel className='antd-room-carousel'  arrows infinite={true} draggable={true} >
               
                  {
                    
                    imageurls.map((url) =>{
                     return <div>
                        <img src={url} alt="pictures of rooms" />
                      </div>
                      
                    })
                  }
                  
           
                {/* <div>
                  <img src={data?.imageurls[1]} alt="pictures of rooms" />
                </div>
                <div>
                  <img src={data?.imageurls[2]} alt="pictures of rooms" />
                </div> */}
              </Carousel>

            {/* <img
              alt="example"
              src={imgurl}
            /> */}
          </div>
          
        }
        actions={[
          <div ><h4>Room Name</h4> <p>{data?.roomname}</p></div>,
          <h3>Max count: {data?.maxcount}</h3>,
          <button className='bkcard__btn__booknow' onClick={handleClick}> Book Now</button>,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={data?.roomtype}
          description={formattedAmountExecutive}
          
        />
      </Card>
    </div>
  )
}
