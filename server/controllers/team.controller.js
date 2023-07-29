const BakeryTeam = require ('../models/team.model')

const fs = require('fs')
const path = require('path')

const BakeryTeamController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newPerson = new BakeryTeam({
            image: url + '/images/'+req.file.filename,
            fullname:req.body.fullname,
            description:req.body.description,
            // socialone:req.body.socialone,
            // socialtwo:req.body.socialtwo,
            // socialthree:req.body.socialthree,
            // socialfour:req.body.socialfour,
        })
        await newPerson.save()
        res.status(201).send('person created');
    },


    getAll: async(req,res)=>{
        const AllPeople = await BakeryTeam.find();
        res.status(200).send({
            data:AllPeople,
            message:'people get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        BakeryTeam.findById(id).then((person)=>{
            res.status(200).send({
                data:person,
                message:'person get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedPerson = await BakeryTeam.findByIdAndDelete(id);
        const idx = deletedPerson.image.indexOf("images/")
        const imageName = deletedPerson.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedPerson === undefined){
            res.status(404).send('person not found');
        }
        else{
            res.status(203).send({
                data:deletedPerson,
                message:'person succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const fullname = req.body.fullname;
        const description = req.body.description;
        // const socialone = req.body.socialone;
        // const socialtwo = req.body.socialtwo;
        // const socialthree = req.body.socialthree;
        // const socialfour = req.body.socialfour;


        let updatedPerson = await BakeryTeam.findById(id);

        if(!updatedPerson){
            return res.status(404).send("person not found")
        }

        const idx = updatedPerson.image.indexOf("images/");
        const imageName = updatedPerson.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedPerson.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedPerson.fullname = fullname;
          updatedPerson.description = description;
        //   updatedPerson.socialone = socialone;
        //   updatedPerson.socialtwo = socialtwo;
        //   updatedPerson.socialthree = socialthree;
        //   updatedPerson.socialfour = socialfour;


          await updatedPerson.save();

          res.status(203).send({
            data: updatedPerson,
            message: "person updated successfully",
          });

    }
}

module.exports = BakeryTeamController