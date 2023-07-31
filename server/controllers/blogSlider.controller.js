const CakeBlogSliders = require('../models/blogSlider.model')

const fs = require('fs')
const path = require('path')

const BlogSliderController = {
    post:async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newBlogSlider = new CakeBlogSliders({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
        })

        await newBlogSlider.save()
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const AllBlogSliders = await CakeBlogSliders.find();
        res.status(200).send({
            data: AllBlogSliders,
            message: 'sliders get success'
        })

    },

    getById:async(req,res)=>{
        const id = req.params.id;
        CakeBlogSliders.findById(id).then((slider)=>{
            res.status(200).send({
                data: slider,
                message: 'slider get success'
            })
            console.log("slider found: ", slider);

        }).catch((err) => {
            res.send('data not found')
        })
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deletedBlogSlider = await CakeBlogSliders.findByIdAndDelete(id);
        const idx = deletedBlogSlider.image.indexOf("images/")
        const imageName = deletedBlogSlider.image.substr(idx)
       
        fs.unlinkSync('./'+imageName)
        if (deletedBlogSlider === undefined) {
          res.status(404).send("slider not found");
        } else {
          res.status(203).send({
            data: deletedBlogSlider,
            message: "slider deleted successfully",
          });
        }
      },

      edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;

        let updatedBlogSlider = await CakeBlogSliders.findById(id);
      
        if (!updatedBlogSlider) {
          return res.status(404).send("slider not found");
        }
      
       
        const idx = updatedBlogSlider.image.indexOf("images/");
        const imageName = updatedBlogSlider.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedBlogSlider.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        updatedBlogSlider.title = title;
      
        await updatedBlogSlider.save();
      
        res.status(203).send({
          data: updatedBlogSlider,
          message: "slider updated successfully",
        });
      }

}

module.exports = BlogSliderController