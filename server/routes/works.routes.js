const express = require('express');
const work_router = express.Router();
const CakeWorkController = require('../controllers/works.controller')
const upload = require('../helper/upload');



//post work
work_router.post('/',upload.single('image'),CakeWorkController.post)

//get All works
work_router.get('/',CakeWorkController.getAll)

//get work by ID
work_router.get('/:id',CakeWorkController.getById)

//delete work
work_router.delete('/:id',CakeWorkController.delete)

//edit work
work_router.put('/:id',upload.single('image'),CakeWorkController.edit)


module.exports = work_router