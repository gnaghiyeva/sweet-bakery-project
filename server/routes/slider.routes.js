const express = require('express');
const slider_router = express.Router();
const CakeSliderController = require('../controllers/slider.contoller')
const upload = require('../helper/upload');

//post Slider
slider_router.post('/',upload.single('image'),CakeSliderController.post)

//get All Slider
slider_router.get('/',CakeSliderController.getAll)

//get Slider by ID
slider_router.get('/:id',CakeSliderController.getById)

//delete Slider
slider_router.delete('/:id',CakeSliderController.delete)

//edit Slider
slider_router.put('/:id',upload.single('image'),CakeSliderController.edit)



module.exports = slider_router