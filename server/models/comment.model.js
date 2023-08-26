const mongoose = require('mongoose')

const CakeComments = mongoose.model('CakeComments', new mongoose.Schema({
    rating:Number,
    name:String,
    email:String,
    review:String,
    productID:{type:mongoose.Schema.Types.ObjectId,ref:'CakeProducts'}
}))

module.exports = CakeComments