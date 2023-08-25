const express = require('express');
const comments_router = express.Router();
const CakeCommentsController = require('../controllers/comments.controller')


//post Comment
comments_router.post('/',CakeCommentsController.post)

//get All comments
comments_router.get('/', CakeCommentsController.getAll)

//delete Service
comments_router.delete('/:id',CakeCommentsController.delete)


module.exports = comments_router