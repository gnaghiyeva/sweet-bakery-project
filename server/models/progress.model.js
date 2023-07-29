const mongoose = require ('mongoose')

const CakeProgress = mongoose.model('CakeProgress', new mongoose.Schema({
    progressName:String,
    progressCount:Number
}))

module.exports = CakeProgress