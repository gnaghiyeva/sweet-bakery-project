const express = require('express');
const contact_router = express.Router();
const ContactDataController = require('../controllers/ContactData.controller')


//post data
contact_router.post('/',ContactDataController.post)

//get All datas
contact_router.get('/',ContactDataController.getAll)

//get data by ID
contact_router.get('/:id',ContactDataController.getById)

//delete data
contact_router.delete('/:id',ContactDataController.delete)

//edit data
contact_router.put('/:id',ContactDataController.edit)


module.exports = contact_router