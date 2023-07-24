const express = require('express');
const service_router = express.Router();
const CakeServiceController = require('../controllers/services.controller')
const upload = require('../helper/upload');

//post Service
service_router.post('/',upload.single('image'),CakeServiceController.post)

//get All Service
service_router.get('/',CakeServiceController.getAll)

//get Service by ID
service_router.get('/:id',CakeServiceController.getById)

//delete Service
service_router.delete('/:id',CakeServiceController.delete)

//edit Service
service_router.put('/:id',upload.single('image'),CakeServiceController.edit)


module.exports = service_router