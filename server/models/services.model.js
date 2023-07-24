const mongoose  = require ('mongoose')

const CakeServices = mongoose.model('CakeServices', new mongoose.Schema({
    image:String,
    title:String,
    description:String
}))

module.exports = CakeServices