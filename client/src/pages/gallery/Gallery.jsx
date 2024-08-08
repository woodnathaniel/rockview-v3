import { useEffect, useState } from 'react';
import './gallery.css'
import { Header } from '../../components/headerNav/Header';
import NavBar from '../../components/navbar/NavBar';
import Masonry from 'react-masonry-css';




const Gallery = () => {

  const [facilities, setFacilities] = useState([])
  const [tour, setTour] = useState([])
  const [community, setCommunity] = useState([])

  const width = ['img-wrapper', 'img-wrapper-1', 'img-wrapper-2', 'img-wrapper-3'];


  const galleryFacilities = [
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5705.JPG?alt=media&token=cc370e9a-e2a1-45ce-92c6-8d83e31e9225',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6196.JPG?alt=media&token=50f28aa4-b0bd-4088-8836-dbb679306283',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5704.JPG?alt=media&token=4830650a-e4a3-4841-b86f-85f35085ee9e',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6328.JPG?alt=media&token=f6be3ea3-b723-4526-8ae9-ee887be60df4',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6206.JPG?alt=media&token=e01e96ea-93b9-42ef-98d0-a539885d7464',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5709.JPG?alt=media&token=84c8657b-fd56-400a-9c3f-be2658bc8e04',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6214.JPG?alt=media&token=6ad6e0b3-6681-4cc3-ba21-772ebcadbbb3',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6211.JPG?alt=media&token=2217440e-2d1e-438c-98a3-7872a253f5e8',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6199.JPG?alt=media&token=02fb76df-ab54-428b-977e-d01d46b189bc',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5718.JPG?alt=media&token=db60a23b-36a2-46f0-a951-dab8d1338a73',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6214.JPG?alt=media&token=6ad6e0b3-6681-4cc3-ba21-772ebcadbbb3',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_6202.JPG?alt=media&token=7b63b540-2bfc-469e-a834-6e12ba12f2c1',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5728.JPG?alt=media&token=ee90ebcb-195a-4cd8-bda3-4b9f5e421d49',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5745.JPG?alt=media&token=562b5011-d2f3-4bfb-9b38-5cc1dfceeeae',
    'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5780.JPG?alt=media&token=2f534354-cb6d-46ef-ac02-908ad24a1c97',
  ]

  const galleryTour = [
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/039b0dc171d8011141_croc.jpg?alt=media&token=f2a0f27d-2214-430f-9976-4580b5e0fdb7",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/cro.jpg?alt=media&token=e49e90fb-ae49-4941-93ed-299bc2f4069d",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/caption.jpg?alt=media&token=83fac718-ca70-409a-ae24-8ba9543fa8f3",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/landschaft-uber-goldanyiir.jpg?alt=media&token=4a744b42-5d22-45ca-a3a5-608e4e32e01c",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/img_4929.jpg?alt=media&token=4c3098c2-159d-40ae-9980-1a1215d17e12",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/paga-crocodiles-46.jpg?alt=media&token=31032bf2-2c24-4ef8-86e4-c43c65d36f61",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tongo-whistling-rocks.jpg?alt=media&token=2a59d155-af02-439d-b34c-607de53e88fd",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/villaggio.jpg?alt=media&token=4ea87da3-1790-4c91-89e2-53c2e83fca99",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tourist.jpg?alt=media&token=fbd19fd5-8c6d-42b0-899f-83aa2e646631",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/4171_Naa-gbewaa-shrine.jpg?alt=media&token=79a9449e-f147-4df5-bd32-20519f0c3e3f",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/img_4953.jpg?alt=media&token=9ef6c858-7d92-481d-a5c4-0b5c91610901",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/img_4955.jpg?alt=media&token=c5cb9e1b-6712-4ece-bc6a-d732dfefbfbc",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/images.jpg?alt=media&token=84b6eac3-fd6f-46ef-8f15-1b0964f60ed4",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/8230621e52984c0dae4cb627a8063fc0.jpg?alt=media&token=fcf13324-e9f2-4322-aa3a-3b7350572f7a",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/caption.jpg?alt=media&token=83fac718-ca70-409a-ae24-8ba9543fa8f3",
      "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/img_4955.webp?alt=media&token=ca16fcc6-f8e4-4ca2-af01-08a31f687701"
    ]


      const galleryCommunity = [
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/48383711_2630051160353238_537302564803182592_n.jpg?alt=media&token=00466e28-b993-49ae-bcfc-fb5fb21f897e",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/download.jpeg?alt=media&token=61204056-172f-4c4c-82a9-30887ee2005e",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/Social-Basket-Bags-.jpg?alt=media&token=2f7219bf-91c9-4416-8c02-0754f95dde7b",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/images.jpg?alt=media&token=84b6eac3-fd6f-46ef-8f15-1b0964f60ed4",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/Fqera6mX0AE1mTh.jpeg?alt=media&token=b30866b8-3184-4868-a2ff-68569cab259f",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/8230621e52984c0dae4cb627a8063fc0.jpg?alt=media&token=fcf13324-e9f2-4322-aa3a-3b7350572f7a",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/basketseller-upper-east-region.jpg?alt=media&token=4bc0ce08-f84d-44db-ace0-52d38edddde2",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/FqfYPG7XgAIXmWB.jpeg?alt=media&token=3506fe61-a4dd-4a95-bada-103803155ce8",
        "https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/img_4755.webp?alt=media&token=5f6ea3de-0055-4af7-9d16-dde49cf81576"
      ]




  return (
    <div >
      <NavBar/>
      <header className='fac_main_header_container'>
        <div className='.fac_text_header'>
          <h3>Rockview Hotel Gallery</h3>
          <h5>A photo gallery featuring the hotel and its surroundings</h5>
        </div>
      </header>
      
      <header className='facility_gallery_header'>
        <h4>HOTEL  GALLERY  TOUR</h4>
      </header>

      <div style={{margin: '0px 40px 0px 30px'}}>
      <section className='facility_gallery_section'>
      <Masonry
                 breakpointCols={{
                  default: 4, // Default number of columns
                  1100: 3,    // 3 columns on screens 1100px wide and up
                  700: 2,     // 2 columns on screens 700px wide and up
                  500: 2      // 1 column on screens 500px wide and up
              }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
          {
            galleryFacilities.map((each, index) =>{
              return(
                <div key={index} className='masonry-item'>
                  <img src={each} alt={`Placeholder ${index}`}/>
                </div>
              )
              
            })
          }
       </Masonry>
        
      </section>
      </div>

 
      <header className='facility_gallery_header'>
        <h4>TOURISM SITES IN THE COMMUNITIES</h4>
      </header>
    <div style={{margin: '0px 40px 0px 30px'}}>
      <section className='facility_gallery_section'>
      <Masonry
                 breakpointCols={{
                  default: 4, // Default number of columns
                  1100: 3,    // 3 columns on screens 1100px wide and up
                  700: 2,     // 2 columns on screens 700px wide and up
                  500: 2      // 1 column on screens 500px wide and up
              }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
          {
            galleryTour.map((each, index) =>{
              return(
                <div key={index} className='masonry-item'>
                  <img src={each} alt={`Placeholder ${index}`}/>
                </div>
              )
              
            })
          }
       </Masonry>
        
      </section>
    </div>

      <header className='facility_gallery_header'>
        <h4>THE COMMUNITY AND IT'S CULTURAL HERITAGES</h4>
      </header>
    <div style={{margin: '0px 40px 0px 30px'}}>
      <section className='facility_gallery_section'>
      <Masonry
                 breakpointCols={{
                  default: 4, // Default number of columns
                  1100: 3,    // 3 columns on screens 1100px wide and up
                  700: 2,     // 2 columns on screens 700px wide and up
                  500: 2      // 1 column on screens 500px wide and up
              }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
          {
            galleryCommunity.map((each, index) =>{
              return(
                <div key={index} className='masonry-item'>
                  <img src={each} alt={`Placeholder ${index}`}/>
                </div>
              )
              
            })
          }
       </Masonry>
        
      </section>
    </div> 
    </div>
  );
}

export default Gallery;
