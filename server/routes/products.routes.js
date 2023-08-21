const express = require('express');
const product_router = express.Router();
const CakeProductsController = require('../controllers/products.controller')
const upload = require('../helper/upload');

//post Service
product_router.post('/',upload.single('image'),CakeProductsController.post)

//get All Service
product_router.get('/',CakeProductsController.getAll)

//get Service by ID
product_router.get('/:id',CakeProductsController.getById)

//delete Service
product_router.delete('/:id',CakeProductsController.delete)

//edit Service
product_router.put('/:id',upload.single('image'),CakeProductsController.edit)


module.exports = product_router