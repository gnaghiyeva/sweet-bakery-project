const mongoose = require('mongoose')

const CakeSliders = mongoose.model('CakeSliders',new mongoose.Schema({
    title:String,
    image:String,
}))

module.exports = CakeSliders