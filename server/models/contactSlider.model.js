const mongoose = require ('mongoose')

const ContactSliders = mongoose.model('ContactSliders',new mongoose.Schema({
    title:String,
    image:String,
}))

module.exports = ContactSliders