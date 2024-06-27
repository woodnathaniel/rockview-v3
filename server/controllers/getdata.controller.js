const { message } = require("statuses");
const roomModel = require("../db.model/rooms.model")


//Retrieve Rooms available from DB API.
const getData = async (req, res) =>{
  try{
    const getroomsInfo = await roomModel.find()
    res.status(200).json({getroomsInfo})
    console.log('room api hitted');
    console.log('get rooms data ', getroomsInfo);
  }catch(error){
    req.status(404).json({message: error})
    console.log('get rooms data ', error);
  }
}


//Retrieve room by roomID API.
const getRoomById = async(req, res)=>{

 const {id} = req.body
 
 console.log(req.body);
  try {
    const getRoomById = await roomModel.findOne({_id: id})
    res.status(200).json(getRoomById)
  } catch (error) {
    console.log(error);
    res.status(404).json({message: error})
  }
}


//Updating Room availability status API. 
const updateAvailability = async(req, res)=>{
  const { id } = req.body

  try {
    console.log('available update successful api');
    const status = await roomModel.findByIdAndUpdate({_id: id}, {available: false})
    res.status(200).json({message: 'successful update'})
   
    console.log(status);
  } catch (error) {
    res.status(404).json(error)
    console.log(error);
    console.log('available update failed api');
  }
}


module.exports = {getData, getRoomById, updateAvailability};