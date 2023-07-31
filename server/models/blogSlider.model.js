const mongoose = require ('mongoose')

const CakeBlogSliders = mongoose.model('CakeBlogSliders',new mongoose.Schema({
    title:String,
    image:String,
}))

module.exports = CakeBlogSliders