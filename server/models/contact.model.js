const mongoose  = require ('mongoose')

const ContactData = mongoose.model('ContactData', new mongoose.Schema({
    title:String,
    desc:String,
    address:String,
    city:String,
    phone:String,
    email:String,
    timein: {
        type: String,
        default: function () {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            return date.toISOString().split('T')[1].substring(0, 5); 
        }
    },
    timeout: {
        type: String,
        default: function () {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            return date.toISOString().split('T')[1].substring(0, 5); 
        }
    }, 
    location:String,
    meridiem:{
        type:String,
        enum: ['am', 'pm'],
    }
}))

module.exports = ContactData