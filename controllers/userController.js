const {User} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    }
}

module.exports = userController