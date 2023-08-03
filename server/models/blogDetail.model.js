const mongoose  = require ('mongoose')

const CakeBlogDetail = mongoose.model('CakeBlogDetail', new mongoose.Schema({
    image:String,
    description:String,
    menuTitle:String,
    menuDesc:String,
    guestTitle:String,
    guestDesc:String,
    blogID:{type:mongoose.Schema.Types.ObjectId,ref:'CakeBlogs'}
}))

module.exports = CakeBlogDetail