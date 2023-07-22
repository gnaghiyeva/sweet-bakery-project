const Admin = require('../models/admin.model')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const fs = require('fs')
const path = require('path')
const imagesDIR = path.join(__dirname, "..")
const upload = require('../helper/upload');


const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json({ message: 'you need token to get data!' })
    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'authentication failed' });
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

const usersController = {
    postRegister: async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const {image,username, email, password } = req.body

        const existedUsername = await Admin.findOne({ username: username });
        const existedMail = await Admin.findOne({ email: email })

        if (existedUsername) {
            res.json({ message: 'username already existed' })
            return
        }
        if (existedMail) {
            res.json({ message: 'email already used' })
            return
        }

        const salt = await bcrypt.genSalt(10)//500ms
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new Admin({
            username: username,
            email: email,
            password: hashedPassword,
            image:image,
            isAdmin: false,
        })

        await newUser.save()
        res.json({ message: 'user sign up succesfully' })
    },

    postLogin: async (req,res)=>{
        console.log('back: ',req.body);
        const {username, password} = req.body
        const existedUsername = await Admin.findOne({username:username});
    
        if(!existedUsername){
            res.json({auth:false, message:'username not found'});
            return
        }
        else{
            const isValid = await bcrypt.compare(password, existedUsername.password)
            const id = existedUsername._id
            //username password
            //access token - KWT
            //refresh token
            const token = jwt.sign({id:id}, process.env.SECRET_KEY, {
                expiresIn:'7d'
            })
            if(!isValid){
                res.json({auth:false, message:'password is incorrect'})
            }
            else{
                res.json({auth:true,token:token, user:{
                
                        id:existedUsername._id,
                        username:existedUsername.username,
                        email:existedUsername.email,
                        isAdmin:existedUsername.isAdmin,
                        image:existedUsername.image
                    
                }, message:'signed in succesfully'})
            }
        } 
    },





    UserPostLogin: async (req, res) => {
        const { username, password } = req.body
        const existedUsername = await Admin.findOne({ username: username });

        if (!existedUsername) {
            res.json({ auth: false, message: 'username not found' });
            return
        }
        else {
            if (existedUsername.isAdmin == false) {
                const isValid = await bcrypt.compare(password, existedUsername.password)
                const id = existedUsername._id
                const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
                    expiresIn: '7d'
                })
                if (!isValid) {
                    res.json({ auth: false, message: 'password is incorrect' })
                }
                else {
                    res.json({
                        auth: true, token: token, user: {
                            id: existedUsername._id,
                            username: existedUsername.username,
                            email: existedUsername.email,
                            isAdmin: existedUsername.isAdmin,
                        }, message: 'signed in succesfully'
                    })
                }
            }
        }
    },

    getAllUsers: async (req, res) => {
        const users = await Admin.find()
        res.json({ users: users })
    }

}

module.exports = usersController
