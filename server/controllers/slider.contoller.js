const CakeSliders = require('../models/sliders.model')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")

const CakeSliderController = {
    post:async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newSlider = new CakeSliders({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
        })

        await newSlider.save()
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const AllSliders = await CakeSliders.find();
        res.status(200).send({
            data: AllSliders,
            message: 'sliders get success'
        })

    },

    getById:async(req,res)=>{
        const id = req.params.id;
        CakeSliders.findById(id).then((slider)=>{
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
        const deletedSlider = await CakeSliders.findByIdAndDelete(id);
        const idx = deletedSlider.image.indexOf("images/")
        const imageName = deletedSlider.image.substr(idx)
       
        fs.unlinkSync('./'+imageName)
        if (deletedSlider === undefined) {
          res.status(404).send("slider not found");
        } else {
          res.status(203).send({
            data: deletedSlider,
            message: "slider deleted successfully",
          });
        }
      },

      edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;

        let updatedSlider = await CakeSliders.findById(id);
      
        if (!updatedSlider) {
          return res.status(404).send("slider not found");
        }
      
       
        const idx = updatedSlider.image.indexOf("images/");
        const imageName = updatedSlider.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedSlider.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        updatedSlider.title = title;
      
        await updatedSlider.save();
      
        res.status(203).send({
          data: updatedSlider,
          message: "slider updated successfully",
        });
      }

}

module.exports = CakeSliderController