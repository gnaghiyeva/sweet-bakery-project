const express = require('express');
const prices_router = express.Router();
const CakePricesController = require('../controllers/prices.controller')
const upload = require('../helper/upload');

//post Service
prices_router.post('/',upload.single('image'),CakePricesController.post)

//get All Service
prices_router.get('/',CakePricesController.getAll)

//get Service by ID
prices_router.get('/:id',CakePricesController.getById)

//delete Service
prices_router.delete('/:id',CakePricesController.delete)

//edit Service
prices_router.put('/:id',upload.single('image'),CakePricesController.edit)


module.exports = prices_router