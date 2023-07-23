const express = require('express');
const logo_router = express.Router();
const navLogoController = require('../controllers/navLogo.controller')
const upload = require('../helper/upload');

//get All Slider
logo_router.get('/',navLogoController.getAll)

//get Slider by ID
logo_router.get('/:id',navLogoController.getById)

//post Slider
logo_router.post('/',upload.single('image'),navLogoController.post)

//delete Slider
logo_router.delete('/:id',navLogoController.delete)

//edit Slider
logo_router.put('/:id',upload.single('image'),navLogoController.edit)


module.exports = logo_router