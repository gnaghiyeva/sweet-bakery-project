const mongoose = require ('mongoose')

const CakeWorks = mongoose.model('CakeWorks', new mongoose.Schema({
    image:String,
    title:String,
    description:String
}))

module.exports = CakeWorks