const mongoose  = require ('mongoose')

const CakeProducts = mongoose.model('CakeProducts', new mongoose.Schema({
    image:String,
    title:String,
    onSale:Boolean,
    price:Number,
    priceDiscount:Number,

}))

module.exports = CakeProducts