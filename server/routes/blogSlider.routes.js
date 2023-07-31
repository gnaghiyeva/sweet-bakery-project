const express = require('express');
const blog_slider_router = express.Router();
const BlogSliderController = require('../controllers/blogSlider.controller')
const upload = require('../helper/upload');

//post Slider
blog_slider_router.post('/',upload.single('image'),BlogSliderController.post)

//get All Slider
blog_slider_router.get('/',BlogSliderController.getAll)

//get Slider by ID
blog_slider_router.get('/:id',BlogSliderController.getById)

//delete Slider
blog_slider_router.delete('/:id',BlogSliderController.delete)

//edit Slider
blog_slider_router.put('/:id',upload.single('image'),BlogSliderController.edit)



module.exports = blog_slider_router