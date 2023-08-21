const CakeProducts = require('../models/products.model')

const fs = require('fs')
const path = require('path')

const CakeProductsController = {
    post: async(req,res)=>{
        const url = req.protocol + '://' + req.get('host');

        const newProduct = new CakeProducts({
            title:req.body.title,
            image: url + '/images/'+req.file.filename,
            onSale:req.body.onSale,
            price:req.body.price,
            priceDiscount:req.body.priceDiscount,

        })
        await newProduct.save()
        res.status(201).send('product created');
    },

    getAll: async(req,res)=>{
        const AllProducts = await CakeProducts.find();
        res.status(200).send({
            data:AllProducts,
            message:'products get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        CakeProducts.findById(id).then((product)=>{
            res.status(200).send({
                data:product,
                message:'product get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    delete: async(req,res)=>{
        const id = req.params.id;
        const deletedProduct = await CakeProducts.findByIdAndDelete(id);
        const idx = deletedProduct.image.indexOf("images/")
        const imageName = deletedProduct.image.substr(idx)
        
        fs.unlinkSync('./'+imageName)
        if(deletedProduct === undefined){
            res.status(404).send('product not found');
        }
        else{
            res.status(203).send({
                data:deletedProduct,
                message:'product deleted succesfully'
            })
        }
    },

    edit: async (req,res)=>{
        const id = req.params.id;
        const title = req.body.title;
        const onSale = req.body.onSale;
        const price = req.body.price;
        const priceDiscount = req.body.priceDiscount;

        let updatedProduct = await CakeProducts.findById(id);

        if(!updatedProduct){
            return res.status(404).send("slider not found")
        }

        const idx = updatedProduct.image.indexOf("images/");
        const imageName = updatedProduct.image.substr(idx);
      
        if (req.file) {
         
            fs.unlinkSync('./' + imageName);
        
            const updatedUrl = req.protocol + '://' + req.get('host');
            updatedProduct.image = updatedUrl + '/images/' + req.file.filename;
          }

          updatedProduct.title = title;
          updatedProduct.onSale = onSale;
          updatedProduct.price = price;
          updatedProduct.priceDiscount = priceDiscount;


          await updatedProduct.save();

          res.status(203).send({
            data: updatedProduct,
            message: "product updated successfully",
          });

    }



}

module.exports = CakeProductsController