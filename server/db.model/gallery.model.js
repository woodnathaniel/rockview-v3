
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
      required: true
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