const mongoose  = require ('mongoose')

const ContactData = mongoose.model('ContactData', new mongoose.Schema({
    title:String,
    desc:String,
    address:String,
    city:String,
    phone:String,
    email:String,
    timein:String,
    timeout:String,
    location:String,
    meridiem:{
        type:String,
        enum: ['am', 'pm'],
    }
}))

module.exports = ContactData