const mongoose  = require ('mongoose')

const BakeryTeam = mongoose.model('BakeryTeam', new mongoose.Schema({
    image:String,
    fullname:String,
    description:String,
    socialone:String,
    socialtwo:String,
    socialthree:String,
    socialfour:String

}))
module.exports = BakeryTeam