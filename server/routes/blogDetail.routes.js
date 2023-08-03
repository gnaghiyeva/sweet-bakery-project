const express = require('express');
const blog_detail_router = express.Router();
const CakeBlogDetailController = require('../controllers/blogDetail.controller')
const upload = require('../helper/detailupload');


blog_detail_router.post('/',upload.single('image'),CakeBlogDetailController.post)


blog_detail_router.get('/',CakeBlogDetailController.getAll)


blog_detail_router.get('/:id',CakeBlogDetailController.getById)


blog_detail_router.delete('/:id',CakeBlogDetailController.delete)


blog_detail_router.put('/:id',upload.single('image'),CakeBlogDetailController.edit)


module.exports = blog_detail_router