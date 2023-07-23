const mongoose = require('mongoose')
const LogoModel = mongoose.model("Logo", new mongoose.Schema({
    title:String,
    image:String,
}))

module.exports = LogoModel