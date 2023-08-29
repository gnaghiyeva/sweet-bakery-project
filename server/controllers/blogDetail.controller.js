const CakeBlogDetail = require('../models/blogDetail.model')

const fs = require('fs')
const path = require('path')

const CakeBlogDetailController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newBlogDetail = new CakeBlogDetail({
            blogID: req.body.blogID,
            image: url + '/detailimages/'+req.file.filename,
            description:req.body.description,
            menuTitle:req.body.menuTitle,
            menuDesc:req.body.menuDesc,
            guestTitle:req.body.guestTitle,
            guestDesc:req.body.guestDesc,
        })
        await newBlogDetail.save()
        res.status(201).send('detail created');

    },

    getAll: async(req,res)=>{
        const AllBlogDetails = await CakeBlogDetail.find();
        res.status(200).send({
            data:AllBlogDetails,
            message:'blogs get succesfully'
        })
    },

    // getById: async(req,res)=>{
    //     const id = req.params.id;
    //     CakeBlogDetail.find({blogID:id}).then((blog)=>{
    //         res.status(200).send({
    //             data:blog,
    //             message:'blog get succesfully'
    //         })
    //     }).catch((err)=>{
    //         res.send('data not found')
    //     })
    // },

    getById: async (req, res) => {
        const id = req.params.id;
        const UpcomingDetail = await CakeBlogDetail.find();
        if(UpcomingDetail==undefined){
            res.status(404).send("detail not found!");
          }
          else{
            res.status(200).send(UpcomingDetail.filter((detail)=>detail.blogID==id))
          }
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedBlog = await CakeBlogDetail.findByIdAndDelete(id);
        const idx = deletedBlog.image.indexOf("detailimages/")
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
        const description = req.body.description;
        const menuTitle = req.body.menuTitle;
        const menuDesc = req.body.menuDesc;
        const guestTitle = req.body.guestTitle;
        const guestDesc = req.body.guestDesc;

        let updatedBlog = await CakeBlogDetail.findById(id);

        if(!updatedBlog){
            return res.status(404).send("blog not found")
        }

        const idx = updatedBlog.image.indexOf("detailimages/");
        const imageName = updatedBlog.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedBlog.image = updatedUrl + '/detailimages/' + req.file.filename;
          }

          updatedBlog.description = description;
          updatedBlog.menuTitle = menuTitle;
          updatedBlog.menuDesc = menuDesc;
          updatedBlog.guestTitle = guestTitle;
          updatedBlog.guestDesc = guestDesc;


          await updatedBlog.save();

          res.status(203).send({
            data: updatedBlog,
            message: "blog updated successfully",
          });

    }

}

module.exports = CakeBlogDetailController