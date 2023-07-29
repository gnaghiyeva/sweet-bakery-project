const CakeProgress = require('../models/progress.model')


const CakeProgressController = {
    post: async (req, res) => {
        const newProgress = new CakeProgress({
            progressName: req.body.progressName,
            progressCount:req.body.progressCount,
        });
        await newProgress.save();
        res.status(201).send("created");
    },

    getAll: async (req, res) => {
        const AllProgress = await CakeProgress.find();
        res.status(200).send({
            data: AllProgress,
            message: 'progress get succesfully'
        })
    },

    
    getById: async(req,res)=>{
        const id = req.params.id;
        CakeProgress.findById(id).then((progress)=>{
            res.status(200).send({
                data:progress,
                message:'progress get succesfully'
            })
        }).catch((err)=>{
            res.send('data not found')
        })
    },

    edit: async(req,res)=>{
        const id = req.params.id;
        const progressName = req.body.progressName
        const progressCount = req.body.progressCount
       
        const updatedProgress = await CakeProgress.findByIdAndUpdate(id,{progressName:progressName, progressCount:progressCount})
        if(updatedProgress==undefined){
          res.status(204).send('progress not found')
        }
        else{
          res.status(200).send('progress edited succesfuly')
        }
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const deletedProgress = await CakeProgress.findByIdAndDelete(id)
        if (deletedProgress == undefined) {
            res.status(204).send("data not found")
        }
        else {
            res.status(200).send({
                data: deletedProgress,
                message: 'data deleted succesfully'
            })
        }
    },
}

module.exports = CakeProgressController