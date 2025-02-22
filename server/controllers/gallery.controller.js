const  {galleryFacilities, galleryTour, galleryCommunity }  = require("../db.model/gallery.model")


//Retrieve Rooms available from DB API.
const gallery_community = async (req, res) =>{
  console.log('first hit gallery_community');
  try{
    const getroomsInfo = await galleryCommunity.find()
    res.status(200).json({getroomsInfo})
    console.log('gallery_community api hitted ');
    console.log('get gallery_community data ', getroomsInfo);
  }catch(error){
    res.status(404).json({message: error})
    console.log('get gallery_community data ', error);
  }
}

const gallery_facilities = async (req, res) =>{
  console.log('first hit gallery_facilities');
  try{
    const getroomsInfo = await galleryFacilities.find()
    res.status(200).json({getroomsInfo})
    console.log('gallery_facilities api hitted ');
    console.log('get gallery_facilities data ', getroomsInfo);
  }catch(error){
    res.status(404).json({message: error})
    console.log('get gallery_facilities data ', error);
  }
}

const gallery_tour = async (req, res) =>{
  console.log('first hit gallery_tour');
  try{
    const getroomsInfo = await galleryTour.find()
    res.status(200).json({getroomsInfo})
    console.log('gallery_tour api hitted ');
    console.log('get gallery_tour data ', getroomsInfo);
  }catch(error){
    res.status(404).json({message: error})
    console.log('get gallery_tour data ', error);
  }
}

module.exports = { gallery_community, gallery_facilities, gallery_tour };