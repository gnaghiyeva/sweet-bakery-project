const ContactData = require('../models/contact.model')


const ContactDataController = {
    post: async (req, res) => {
        const { title, desc, address, city, phone, email, timein, timeout, location, meridiem } = req.body
        const newData = new ContactData({
            title: title,
            desc: desc,
            address: address,
            city: city,
            phone: phone,
            email: email,
            timein: timein,
            timeout: timeout,
            location: location,
            meridiem: meridiem
        })
        await newData.save()
        res.status(201).send("data created succesfully")
    },
    
    getAll: async(req,res)=>{
        const AllDatas = await ContactData.find();
        res.status(200).send({
            data:AllDatas,
            message:'datas get succesfully'
        })
    },

    getById: async(req,res)=>{
        const id = req.params.id;
        ContactData.findById(id).then((datas)=>{
            res.status(200).send({
                data:datas,
                message:'data get succesfully'
            })
        }).catch((err)=>{
            res.send('comment not found')
        })
    },


    delete: async (req, res) => {
        const id = req.params.id;
        const deletedData = await ContactData.findByIdAndDelete(id)
        if (deletedData == undefined) {
            res.status(204).send("comment not found")
        }
        else {
            res.status(200).send({
                data: deletedData,
                message: 'comment deleted succesfully'
            })
        }
    },

    edit: async(req,res)=>{
        const id = req.params.id;
        const {title, desc, address, city, phone, email, timein, timeout, location, meridiem} = req.body
        const existedData = await ContactData.findByIdAndUpdate(id,{title:title, desc:desc, address:address, city:city, phone:phone, email:email, timein:timein, timeout:timeout, location:location, meridiem: meridiem })
        if(existedData==undefined){
          res.status(204).send('data not found')
        }
        else{
          res.status(200).send('data edited succesfuly')
        }
    }
}
module.exports = ContactDataController