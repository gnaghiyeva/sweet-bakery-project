const CakeWorks = require('../models/works.model')

const fs = require('fs')
const path = require('path')

const CakeWorksController = {
    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');

        const newWork = new CakeWorks({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
            description: req.body.description
        })
        await newWork.save()
        res.status(201).send('work created');
    },

    getAll: async (req, res) => {
        const AllWorks = await CakeWorks.find();
        res.status(200).send({
            data: AllWorks,
            message: 'works get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeWorks.findById(id).then((work)=>{
            res.status(200).send({
                data:work,
                message:'work get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedWork = await CakeWorks.findByIdAndDelete(id);
        const idx = deletedWork.image.indexOf("images/")
        const imageName = deletedWork.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedWork === undefined){
            res.status(404).send('work not found');
        }
        else{
            res.status(203).send({
                data:deletedWork,
                message:'work deleted succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;

        let updatedWork = await CakeWorks.findById(id);

        if(!updatedWork){
            return res.status(404).send("slider not found")
        }

        const idx = updatedWork.image.indexOf("images/");
        const imageName = updatedWork.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedWork.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedWork.title = title;
          updatedWork.description = description;


          await updatedWork.save();

          res.status(203).send({
            data: updatedWork,
            message: "work updated successfully",
          });

    }


}

module.exports = CakeWorksController