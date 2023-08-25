const mongoose = require('mongoose')

const CakeComments = mongoose.model('CakeComments', new mongoose.Schema({
    rating:Number,
    name:String,
    email:String,
    review:String
}))

module.exports = CakeComments