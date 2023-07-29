const CakePrices = require ('../models/prices.model')

const fs = require('fs')
const path = require('path')

const CakePricesController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newPrice = new CakePrices({
            image: url + '/images/'+req.file.filename,
            price:req.body.price,
            name:req.body.name,
            price:req.body.price,
            description:req.body.description,
            color:req.body.color,
        })
        await newPrice.save()
        res.status(201).send('price created');
    },

    getAll: async(req,res)=>{
        const AllPrices = await CakePrices.find();
        res.status(200).send({
            data:AllPrices,
            message:'prices get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakePrices.findById(id).then((price)=>{
            res.status(200).send({
                data:price,
                message:'price get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedPrice = await CakePrices.findByIdAndDelete(id);
        const idx = deletedPrice.image.indexOf("images/")
        const imageName = deletedPrice.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedPrice === undefined){
            res.status(404).send('price not found');
        }
        else{
            res.status(203).send({
                data:deletedPrice,
                message:'price succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;
        const color = req.body.color;

        let updatedPrice = await CakePrices.findById(id);

        if(!updatedPrice){
            return res.status(404).send("slider not found")
        }

        const idx = updatedPrice.image.indexOf("images/");
        const imageName = updatedPrice.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedPrice.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedPrice.name = name;
          updatedPrice.description = description;
          updatedPrice.price = price;
          updatedPrice.color = color;


          await updatedPrice.save();

          res.status(203).send({
            data: updatedPrice,
            message: "price updated successfully",
          });

    }

}


module.exports = CakePricesController