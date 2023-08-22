const mongoose = require ('mongoose')

const CakeProductSliders = mongoose.model('CakeProductSliders',new mongoose.Schema({
    title:String,
    image:String,
}))

module.exports = CakeProductSliders