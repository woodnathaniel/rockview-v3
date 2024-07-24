
const  mongoose = require('mongoose');

const galleryFacilitiesSchema = mongoose.Schema(
  { 
    title:{
     type: String,
      required: true,
      default: 'Hotel Tour'
    },

    picsUrls :{
      type: Array,
      required: true,
      default: [
        'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5705.JPG?alt=media&token=cc370e9a-e2a1-45ce-92c6-8d83e31e9225',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5721.JPG?alt=media&token=414c3054-20e5-4344-b342-b929a7c69f38',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5703.JPG?alt=media&token=24144ae2-8c61-4eb1-83ec-f80630380a69',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5704.JPG?alt=media&token=4830650a-e4a3-4841-b86f-85f35085ee9e',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5705.JPG?alt=media&token=e744cdd1-f678-4e85-8b15-3b617bc6f1b7',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5709.JPG?alt=media&token=84c8657b-fd56-400a-9c3f-be2658bc8e04',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5716.JPG?alt=media&token=1ce7bf64-1244-49da-89bf-1895a26e971f',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5718.JPG?alt=media&token=db60a23b-36a2-46f0-a951-dab8d1338a73',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5719.JPG?alt=media&token=d09a68c6-cd3d-4ed2-95a8-122530cf7ff9',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5722.JPG?alt=media&token=6ccb8588-66ec-4f8e-ba23-300dd5774db9',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5726.JPG?alt=media&token=354425de-9212-462c-b7cb-2411f152058a',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5728.JPG?alt=media&token=ee90ebcb-195a-4cd8-bda3-4b9f5e421d49',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5745.JPG?alt=media&token=562b5011-d2f3-4bfb-9b38-5cc1dfceeeae',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5780.JPG?alt=media&token=2f534354-cb6d-46ef-ac02-908ad24a1c97',
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5745.JPG?alt=media&token=562b5011-d2f3-4bfb-9b38-5cc1dfceeeae',
      ]
      
    },


  
  },
 { timestamps: true,}

)

const galleryTourSchema = mongoose.Schema(
  { 
    title:{
     type: String,
      required: true,
      default: 'Tourism Sites In And Around The Community'
    },

    picsUrls :{
      type: Array,
      required: true
    },


  
  },
 { timestamps: true,}

)

const galleryComSchema = mongoose.Schema(
  { 
    title:{
     type: String,
      required: true,
      default: `The Communities and It's Cultures`
    },

    picsUrls :{
      type: Array,
      required: true
    },


  
  },
 { timestamps: true,}

)




const galleryFacilities = mongoose.model('gallery_facilities', galleryFacilitiesSchema)
const galleryTour = mongoose.model('gallery_tour', galleryTourSchema)
const galleryCommunity = mongoose.model('gallery_community', galleryComSchema)


module.exports = { galleryFacilities, galleryTour, galleryCommunity } 