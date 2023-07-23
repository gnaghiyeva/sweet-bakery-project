const LogoModel = require('../models/navLogo.model')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")

const LogoModelController = {
    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');

        const newLogo = new LogoModel({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
        })
        await newLogo.save();
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const Logo = await LogoModel.find();
        res.status(200).send({
            data: Logo,
            message: 'logo image get success'
        })

    },

    getById:async(req,res)=>{
        const id = req.params.id;
        LogoModel.findById(id).then((logo)=>{
            res.status(200).send({
                data: logo,
                message: 'logo image get success'
            })
            console.log("Logo found: ", logo);

        }).catch((err) => {
            res.send('data not found')
        })
    },


    delete: async (req, res) => {
        const id = req.params.id;
        const deletedLogo = await LogoModel.findByIdAndDelete(id);
        const idx = deletedLogo.image.indexOf("images/")
        const imageName = deletedLogo.image.substr(idx)
       
        fs.unlinkSync('./'+imageName)
        if (deletedLogo === undefined) {
          res.status(404).send("logo not found");
        } else {
          res.status(203).send({
            data: deletedLogo,
            message: "logo deleted successfully",
          });
        }
      },


      edit: async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;
          
      
        let updatedLogo = await LogoModel.findById(id);
      
        if (!updatedLogo) {
          return res.status(404).send("logo not found");
        }
      
       
        const idx = updatedLogo.image.indexOf("images/");
        const imageName = updatedLogo.image.substr(idx);
      
        if (req.file) {
         
          fs.unlinkSync('./' + imageName);
      
          const updatedUrl = req.protocol + '://' + req.get('host');
          updatedLogo.image = updatedUrl + '/images/' + req.file.filename;
        }
      
        updatedLogo.title = title;
      
        await updatedLogo.save();
      
        res.status(203).send({
          data: updatedLogo,
          message: "logo updated successfully",
        });
      }
    

}

module.exports = LogoModelController