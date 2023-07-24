const CakeCategories = require('../models/categories.model')

const CakeCategoriesController = {
    post: async (req, res) => {
        const newCategory = new CakeCategories({
            name: req.body.name,
            count: req.body.count
            
        })
        await newCategory.save()
        res.status(201).send("category created succesfully")
    },

    getAll: async (req, res) => {
        const { name } = req.query
        const allCategories = await CakeCategories.find();
        if (name === undefined) {
            res.status(200).send({
                data: allCategories,
                message: "categories get success!"
            })
        }
        else {
            res.status(200).send({
                data: allCategories.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
                message: "categories get success!"
            })
        }
    },

    getbyID: async (req, res) => {
        const id = req.params.id
        CakeCategories.findById(id).then((category) => {
            res.status(200).send({
                data: category,
                message: 'category get  success'
            })

        }).catch((err) => {
            res.send('category not found')
        })
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deletedCategory = await CakeCategories.findByIdAndDelete(id)
        if (deletedCategory == undefined) {
            res.status(204).send("category not found")
        }
        else {
            res.status(200).send({
                data: deletedCategory,
                message: 'category deleted succesfully'
            })
        }
    },
    edit: async(req,res)=>{
        const id = req.params.id;
        const {name} = req.body
        const {count} = req.body
        const existedCategory = await CakeCategories.findByIdAndUpdate(id,{name:name, count:count})
        if(existedCategory==undefined){
          res.status(204).send('category not found')
        }
        else{
          res.status(200).send('category edited succesfuly')
        }
    }

}

module.exports = CakeCategoriesController