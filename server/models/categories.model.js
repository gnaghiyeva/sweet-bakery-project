const mongoose  = require ('mongoose')

const CakeCategories = mongoose.model('CakeCategories', new mongoose.Schema({
    count:Number,
    name:String
}))

module.exports = CakeCategories