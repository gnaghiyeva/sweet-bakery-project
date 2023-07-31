const express = require('express');
const blog_router = express.Router();
const CakeBlogsController = require('../controllers/blog.controller')
const upload = require('../helper/upload');

blog_router.post('/',upload.single('image'),CakeBlogsController.post)

blog_router.get('/',CakeBlogsController.getAll)

blog_router.get('/:id',CakeBlogsController.getById)

blog_router.delete('/:id',CakeBlogsController.delete)

blog_router.put('/:id',upload.single('image'),CakeBlogsController.edit)


module.exports = blog_router