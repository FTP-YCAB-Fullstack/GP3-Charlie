const {Class,User,Student} = require("../models")

const ClassController = {
    getAll : async (req,res,next) => {
        try {
            const currentUser = req.currentUser
            console.log(currentUser.role)
            if(currentUser.role === "admin"){
                let data = await Class.findAll({include:[Student,User]})
                if(!data){
                    return next({code:404,message:"Tidak ada kelas"})
                }
                res.status(200).json({
                    message : "OK",
                    class : data,
                    currentUser
                })
            }

            if(currentUser.role === "teacher"){
                let data = await Class.findAll({where : {
                    id : req.currentUser.toJSON().Class.id
                },include:[Student,User]})

                res.status(200).json({
                    message : "OK",
                    class : data,
                    currentUser
                })
                console.log(req.currentUser.toJSON())
            }
            

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
            next({code : 500,message:error.message})
        }
    },
}

module.exports = ClassController