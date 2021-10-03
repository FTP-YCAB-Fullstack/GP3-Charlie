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

                if(!data){
                    return next({code:404,message:"Tidak ada kelas yang terdaftar"})
                }

                res.status(200).json({
                    message : "OK",
                    class : data,
                    currentUser
                })
                // console.log(req.currentUser.toJSON())
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

    Delete : async (req,res,next) => {
        try {
            const {id} = req.params
            let kelas = await Class.destroy({
                where : {
                    id : id
                }
            })

            if(!kelas){
                return next({code:404,message:"Kelas tidak ditemukan"})
            }

            res.status(200).json({
                status : "Class Deleted"
            })

        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    Update : async (req,res,next) => {
        try {
            const {id} = req.params

            let find = await Class.findOne({where : {id:id}})

            if(!find){
                return next({code:404,message:"Tidak ada kelas yang terdaftar"})
            }

            // console.log(find)

            let {name,Teacher} = req.body;
            let payload = {
                name : name,
                Teacher : Teacher
            }

            let update = await Class.update(payload,{
                where : {
                    id : id
                }
            })

            res.status(200).json({
                status : "Class Updated",
                payload
            })

        } catch (error) {
            next({code:500,message:error.message})
        }
    }
}

module.exports = ClassController