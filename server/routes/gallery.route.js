const express = require("express");
const galleryrouter = express.Router();
const {
  gallery_community, 
  gallery_facilities, 
  gallery_tour
} = require("../controllers/gallery.controller");

galleryrouter.route("/community").get(gallery_community);
galleryrouter.route("/facilities").get(gallery_facilities);
galleryrouter.route("/tour").get(gallery_tour);


module.exports = galleryrouter;