const express = require('express');
const product_slider_router = express.Router();
const ProductSliderController = require('../controllers/productSlider.controller')
const upload = require('../helper/upload');

//post Slider
product_slider_router.post('/',upload.single('image'),ProductSliderController.post)

//get All Slider
product_slider_router.get('/',ProductSliderController.getAll)

//get Slider by ID
product_slider_router.get('/:id',ProductSliderController.getById)

//delete Slider
product_slider_router.delete('/:id',ProductSliderController.delete)

//edit Slider
product_slider_router.put('/:id',upload.single('image'),ProductSliderController.edit)



module.exports = product_slider_router