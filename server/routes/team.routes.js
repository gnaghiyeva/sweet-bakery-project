const express = require('express');
const team_router = express.Router();
const BakeryTeamController = require('../controllers/team.controller')
const upload = require('../helper/upload');


team_router.post('/',upload.single('image'),BakeryTeamController.post)


team_router.get('/',BakeryTeamController.getAll)


team_router.get('/:id',BakeryTeamController.getById)


team_router.delete('/:id',BakeryTeamController.delete)


team_router.put('/:id',upload.single('image'),BakeryTeamController.edit)


module.exports = team_router