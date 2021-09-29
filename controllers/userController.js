const {User} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userController = {
    getAll : async (req,res,next) => {
        try {
            let data = await User.findAll()

            res.status(200).json({
                users : data
            })
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    Register : async (req,res,next) => {
        try {
            const {name,email,password} = req.body

            const isExist = await User.findOne({
                where : {email : email}
            })
            
            if(isExist){
                next({code:500,message:"email sudah terdaftar"})
            }

            const hashed = bcrypt.hashSync(password)
            let data = {
                name:name,
                email:email,
                password:hashed,
                role:"teacher"
            }
            const newUser = await User.create(data)

            res.status(201).json({
                message : "user created",
                teacher : newUser
            })
        } catch (error) {
            next({code:500,message:error.message})
        }
    }
}

module.exports = userController