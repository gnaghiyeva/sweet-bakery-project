const express = require('express');
const comments_router = express.Router();
const CakeCommentsController = require('../controllers/comments.controller')


//post Comment
comments_router.post('/',CakeCommentsController.post)

//get All comments
comments_router.get('/', CakeCommentsController.getAll)

//get Comment by ID
comments_router.get('/:id',CakeCommentsController.getById)


//delete comment
comments_router.delete('/:id',CakeCommentsController.delete)

//edit comment
comments_router.put('/:id',CakeCommentsController.edit)


module.exports = comments_router