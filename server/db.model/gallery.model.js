
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
      'https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/IMG_5745.JPG?alt=media&token=562b5011-d2f3-4bfb-9b38-5cc1dfceeeae'
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
      required: true,
      default: [
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/039b0dc171d8011141_croc.jpg?alt=media&token=f2a0f27d-2214-430f-9976-4580b5e0fdb7",
        " https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/cro.jpg?alt=media&token=e49e90fb-ae49-4941-93ed-299bc2f4069d",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/caption.jpg?alt=media&token=83fac718-ca70-409a-ae24-8ba9543fa8f3",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/landschaft-uber-goldanyiir.jpg?alt=media&token=4a744b42-5d22-45ca-a3a5-608e4e32e01c",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/paga-crocodiles-46.jpg?alt=media&token=31032bf2-2c24-4ef8-86e4-c43c65d36f61",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tongo-whistling-rocks.jpg?alt=media&token=2a59d155-af02-439d-b34c-607de53e88fd",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/villaggio.jpg?alt=media&token=4ea87da3-1790-4c91-89e2-53c2e83fca99",
        "  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tourist.jpg?alt=media&token=fbd19fd5-8c6d-42b0-899f-83aa2e646631"
        ]
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

[
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/039b0dc171d8011141_croc.jpg?alt=media&token=f2a0f27d-2214-430f-9976-4580b5e0fdb7","  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/cro.jpg?alt=media&token=e49e90fb-ae49-4941-93ed-299bc2f4069d",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/caption.jpg?alt=media&token=83fac718-ca70-409a-ae24-8ba9543fa8f3",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/landschaft-uber-goldanyiir.jpg?alt=media&token=4a744b42-5d22-45ca-a3a5-608e4e32e01c",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/paga-crocodiles-46.jpg?alt=media&token=31032bf2-2c24-4ef8-86e4-c43c65d36f61",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tongo-whistling-rocks.jpg?alt=media&token=2a59d155-af02-439d-b34c-607de53e88fd",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/villaggio.jpg?alt=media&token=4ea87da3-1790-4c91-89e2-53c2e83fca99",
"  https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/tourist.jpg?alt=media&token=fbd19fd5-8c6d-42b0-899f-83aa2e646631"
]

[
"https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/44023306_1781710075267390_515539566082392064_n.jpg?alt=media&token=92989a31-b42d-41a7-81eb-6fdc67ac2e79",
"https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/44052541_1781710098600721_5230673891923329024_n.jpg?alt=media&token=d4603f4e-96ee-4d47-ae96-d1a42477aac0",
"https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/Damba-Festival.webp?alt=media&token=249cebc7-d4c8-489f-8eac-ce570d041689",
"https://firebasestorage.googleapis.com/v0/b/todofirebase-df58c.appspot.com/o/Social-Basket-Bags-.jpg?alt=media&token=2f7219bf-91c9-4416-8c02-0754f95dde7b"
]
