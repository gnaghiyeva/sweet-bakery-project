const express = require('express');
const admin_router = express.Router()
const adminController = require('../controllers/admin.controller')
const upload = require('../helper/upload');

admin_router.get('/users',adminController.getAllUsers)

admin_router.post('/register', upload.single('image'), adminController.postRegister)

admin_router.post('/login', adminController.postLogin)

// admin_router.post('/admin/login', adminController.AdminPostLogin)

module.exports = admin_router