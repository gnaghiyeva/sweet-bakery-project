const CakeServices = require('../models/services.model')

const fs = require('fs')
const path = require('path')

const CakeServicesController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newService = new CakeServices({
            title:req.body.title,
            image: url + '/images/'+req.file.filename,
            description:req.body.description
        })
        await newService.save()
        res.status(201).send('service created');
    },

    getAll: async(req,res)=>{
        const AllServices = await CakeServices.find();
        res.status(200).send({
            data:AllServices,
            message:'services get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeServices.findById(id).then((service)=>{
            res.status(200).send({
                data:service,
                message:'service get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedService = await CakeServices.findByIdAndDelete(id);
        const idx = deletedService.image.indexOf("images/")
        const imageName = deletedService.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedService === undefined){
            res.status(404).send('service not found');
        }
        else{
            res.status(203).send({
                data:deletedService,
                message:'service deleted succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;

        let updatedService = await CakeServices.findById(id);

        if(!updatedService){
            return res.status(404).send("slider not found")
        }

        const idx = updatedService.image.indexOf("images/");
        const imageName = updatedService.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedService.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedService.title = title;
          updatedService.description = description;


          await updatedService.save();

          res.status(203).send({
            data: updatedService,
            message: "service updated successfully",
          });

    }
}

module.exports = CakeServicesController