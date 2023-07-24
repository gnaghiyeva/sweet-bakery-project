const express = require('express')
const category_router = express.Router()
const CakeCategoriesController = require('../controllers/categories.controller')

//get All
category_router.get('/', CakeCategoriesController.getAll)

//get By id
category_router.get('/:id', CakeCategoriesController.getbyID)

//delete
category_router.delete("/:id", CakeCategoriesController.delete)
//post
category_router.post("/", CakeCategoriesController.post)

//edit
category_router.put("/:id", CakeCategoriesController.edit)

module.exports = category_router