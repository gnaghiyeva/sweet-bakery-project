const ContactSliders = require('../models/contactSlider.model')

const fs = require('fs')
const path = require('path')

const ContactSliderController = {
    post:async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newContactSlider = new ContactSliders({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
        })

        await newContactSlider.save()
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const AllContactSliders = await ContactSliders.find();
        res.status(200).send({
            data: AllContactSliders,
            message: 'sliders get success'
        })

    },

    getById:async(req,res)=>{
        const id = req.params.id;
        ContactSliders.findById(id).then((slider)=>{
            res.status(200).send({
                data: slider,
                message: 'slider get success'
            })
            console.log("slider found: ", slider);

        }).catch((err) => {
            res.send('data not found')
        })
    },

      edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;

        let updatedContactSlider = await ContactSliders.findById(id);
      
        if (!updatedContactSlider) {
          return res.status(404).send("slider not found");
        }
      
       
        const idx = updatedContactSlider.image.indexOf("images/");
        const imageName = updatedContactSlider.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedContactSlider.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        updatedContactSlider.title = title;
      
        await updatedContactSlider.save();
      
        res.status(203).send({
          data: updatedContactSlider,
          message: "slider updated successfully",
        });
      }

}

module.exports = ContactSliderController