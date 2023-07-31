const CakeBlogs = require ('../models/blog.model')

const fs = require('fs')
const path = require('path')

const CakeBlogsController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newBlog = new CakeBlogs({
            image: url + '/images/'+req.file.filename,
            releaseDate:req.body.releaseDate,
            title:req.body.title,
            description:req.body.description,
            color:req.body.color
        })
        await newBlog.save()
        res.status(201).send('blog created');

    },

    getAll: async(req,res)=>{
        const AllBlogs = await CakeBlogs.find();
        res.status(200).send({
            data:AllBlogs,
            message:'blogs get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeBlogs.findById(id).then((blog)=>{
            res.status(200).send({
                data:blog,
                message:'blog get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedBlog = await CakeBlogs.findByIdAndDelete(id);
        const idx = deletedBlog.image.indexOf("images/")
        const imageName = deletedBlog.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedBlog === undefined){
            res.status(404).send('blog not found');
        }
        else{
            res.status(203).send({
                data:deletedBlog,
                message:'blog deleted succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const releaseDate = req.body.releaseDate;
        const title = req.body.title;
        const description = req.body.description;
        const color = req.body.color;

        let updatedBlog = await CakeBlogs.findById(id);

        if(!updatedBlog){
            return res.status(404).send("blog not found")
        }

        const idx = updatedBlog.image.indexOf("images/");
        const imageName = updatedBlog.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedBlog.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedBlog.releaseDate = releaseDate;
          updatedBlog.title = title;
          updatedBlog.description = description;
          updatedBlog.color = color;


          await updatedBlog.save();

          res.status(203).send({
            data: updatedBlog,
            message: "blog updated successfully",
          });

    }



}

module.exports = CakeBlogsController