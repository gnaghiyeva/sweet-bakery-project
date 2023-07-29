const mongoose = require ('mongoose')

const CakeSkills = mongoose.model('CakeSkills', new mongoose.Schema({
    image:String,
    title:String,
    description:String,
}))

module.exports = CakeSkills