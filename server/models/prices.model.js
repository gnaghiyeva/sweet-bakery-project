const mongoose  = require ('mongoose')

const CakePrices = mongoose.model('CakePrices', new mongoose.Schema({
    image:String,
    price: Number,
    name:String,
    description:String,
    color:String,
}))

module.exports = CakePrices