const CakeSkills = require('../models/skills.model')

const fs = require('fs')
const path = require('path')

const CakeSkillsController = {
    post: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');

        const newSkill = new CakeSkills({
            title: req.body.title,
            image: url + '/images/' + req.file.filename,
            description: req.body.description,
            
        })
        await newSkill.save()
        res.status(201).send('skill created');
    },

    getAll: async (req, res) => {
        const AllSkills = await CakeSkills.find();
        res.status(200).send({
            data: AllSkills,
            message: 'skills get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeSkills.findById(id).then((skill)=>{
            res.status(200).send({
                data:skill,
                message:'skill get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedSkill = await CakeSkills.findByIdAndDelete(id);
        const idx = deletedSkill.image.indexOf("images/")
        const imageName = deletedSkill.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedSkill === undefined){
            res.status(404).send('skill not found');
        }
        else{
            res.status(203).send({
                data:deletedSkill,
                message:'skill deleted succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        const description = req.body.description;
       
        let updatedSkill = await CakeSkills.findById(id);

        if(!updatedSkill){
            return res.status(404).send("skill not found")
        }

        const idx = updatedSkill.image.indexOf("images/");
        const imageName = updatedSkill.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedSkill.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedSkill.title = title;
          updatedSkill.description = description;
         
          await updatedSkill.save();

          res.status(203).send({
            data: updatedSkill,
            message: "skill updated successfully",
          });

    }


}

module.exports = CakeSkillsController