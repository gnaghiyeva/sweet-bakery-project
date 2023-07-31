const mongoose  = require ('mongoose')

const CakeBlogs = mongoose.model('CakeBlogs', new mongoose.Schema({
    image:String,
    releaseDate: {
        type: String,
        default: function () {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            return date.toISOString().split('T')[0]; 
        }
    },
    title:String,
    description:String,
    color:String,
}))

module.exports = CakeBlogs