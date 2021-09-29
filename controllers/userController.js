const {User} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

let userController = {
    getAll : async (req,res) => {
        try {
            let data = await User.findAll()

            res.status(200).json({
                users : data
            })
        } catch (error) {
            console.log(error)
        }
    },

    Register : async (req,res) => {
        try {
            const {name,email,password,role} = req.body
            
            const hashed = bcrypt.hashSync(password)

            let data = {
                name:name,
                email:email,
                password:hashed,
                role:role
            }
            const newUser = await User.create(data)

            res.status(201).json({
                message : "user created",
                teacher : newUser
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = userController