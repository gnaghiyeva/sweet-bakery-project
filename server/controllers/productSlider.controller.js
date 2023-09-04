const CakeProductSliders = require('../models/productSlider.model')

const fs = require('fs')
const path = require('path')

const ProductSliderController = {
  post: async (req, res) => {
    const url = req.protocol + '://' + req.get('host');

    const newProductSlider = new CakeProductSliders({
      title: req.body.title,
      image: url + '/images/' + req.file.filename,
    })

    await newProductSlider.save()
    res.status(201).send("created");
  },

  getAll: async (req, res) => {
    const AllProductSliders = await CakeProductSliders.find();
    res.status(200).send({
      data: AllProductSliders,
      message: 'sliders get success'
    })

  },

  getById: async (req, res) => {
    const id = req.params.id;
    CakeProductSliders.findById(id).then((slider) => {
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
    const deletedSlider = await CakeProductSliders.findByIdAndDelete(id);
    const idx = deletedSlider.image.indexOf("images/")
    const imageName = deletedSlider.image.substr(idx)

    fs.unlinkSync('./' + imageName)
    if (deletedSlider === undefined) {
      res.status(404).send("logo not found");
    } else {
      res.status(203).send({
        data: deletedSlider,
        message: "logo deleted successfully",
      });
    }
  },

  edit: async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    let updatedProductSlider = await CakeProductSliders.findById(id);

    if (!updatedProductSlider) {
      return res.status(404).send("slider not found");
    }


    const idx = updatedProductSlider.image.indexOf("images/");
    const imageName = updatedProductSlider.image.substr(idx);

    if (req.file) {

      fs.unlinkSync('./' + imageName);

      const updatedUrl = req.protocol + '://' + req.get('host');
      updatedProductSlider.image = updatedUrl + '/images/' + req.file.filename;
    }

    updatedProductSlider.title = title;

    await updatedProductSlider.save();

    res.status(203).send({
      data: updatedProductSlider,
      message: "slider updated successfully",
    });
  }

}

module.exports = ProductSliderController