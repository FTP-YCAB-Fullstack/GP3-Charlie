const {Class,User,Student} = require("../models")

const ClassController = {
    getAll : async (req,res,next) => {
        try {
            let data = await Class.findAll({include:[Student,User]})
            res.status(200).json({
                message : "OK",
                class : data
            })

        } catch (error) {
            console.log(error)
        }
    },

    Create : async (req,res,next) => {
        try {
            let {name,Teacher} = req.body;
            let payload = {
                name : name,
                Teacher : Teacher
            }

            let newClass = await Class.create(payload)

            res.status(201).json({
                message : "class created",
                class_data : newClass
            })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ClassController