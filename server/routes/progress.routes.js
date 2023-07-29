const express = require('express');
const progress_router = express.Router();
const CakeProgressController = require('../controllers/progress.controller')
const upload = require('../helper/upload');

progress_router.post('/',upload.single('image'),CakeProgressController.post)

progress_router.get('/',CakeProgressController.getAll)

progress_router.get('/:id',CakeProgressController.getById)

progress_router.delete('/:id',CakeProgressController.delete)

progress_router.put('/:id',upload.single('image'),CakeProgressController.edit)


module.exports = progress_router