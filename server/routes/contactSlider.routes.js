const express = require('express');
const contact_slider_router = express.Router();
const ContactSliderController = require('../controllers/contactSlider.controller')
const upload = require('../helper/upload');

//post Slider
contact_slider_router.post('/',upload.single('image'),ContactSliderController.post)

//get All Slider
contact_slider_router.get('/',ContactSliderController.getAll)

//get Slider by ID
contact_slider_router.get('/:id',ContactSliderController.getById)


//edit Slider
contact_slider_router.put('/:id',upload.single('image'),ContactSliderController.edit)



module.exports = contact_slider_router