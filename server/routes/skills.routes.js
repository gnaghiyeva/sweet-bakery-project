const express = require('express');
const skill_router = express.Router();
const CakeSkillsController = require('../controllers/skills.controller')
const upload = require('../helper/upload');

skill_router.post('/',upload.single('image'),CakeSkillsController.post)

skill_router.get('/',CakeSkillsController.getAll)

skill_router.get('/:id',CakeSkillsController.getById)

skill_router.delete('/:id',CakeSkillsController.delete)

skill_router.put('/:id',upload.single('image'),CakeSkillsController.edit)


module.exports = skill_router