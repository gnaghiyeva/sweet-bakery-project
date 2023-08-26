const CakeComments = require('../models/comment.model')

const CakeCommentsController = {
    post: async (req, res) => {
        const { rating, name, email, review, productID } = req.body
        const newComment = new CakeComments({
            rating: rating,
            name: name,
            email: email,
            review: review,
            productID: productID,
        })
        await newComment.save()
        res.status(201).send("comment created succesfully")
    },
    
    getAll: async(req,res)=>{
        const AllComments = await CakeComments.find();
        res.status(200).send({
            data:AllComments,
            message:'comments get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeComments.find({ productID: id }).then((comment)=>{
            res.status(200).send({
                data:comment,
                message:'comment get succesfully'
            })
        }).catch((err)=>{
            res.send('comment not found')
        })
    },


    delete: async (req, res) => {
        const id = req.params.id;
        const deletedComment = await CakeComments.findByIdAndDelete(id)
        if (deletedComment == undefined) {
            res.status(204).send("comment not found")
        }
        else {
            res.status(200).send({
                data: deletedComment,
                message: 'comment deleted succesfully'
            })
        }
    },
}
module.exports = CakeCommentsController