const {User,Class} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userController = {
    getAll : async (req,res,next) => {
        try {
            const currentUser = req.currentUser
            if(currentUser.role === "admin"){
                let data = await User.findAll({attributes : ["id","name","email","role"],include:{
                    model: Class,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                        },
                    }})
                res.status(200).json({
                    users : data,
                    currentUser : currentUser // mengetahui siapa yang sedang login dari authentication
                })
            }

            if (currentUser.role === "teacher"){
                try {
                    let data = await User.findOne({
                        where : {
                            id : currentUser.Class.dataValues.Teacher
                        },
                        include : Class
                    })
                    res.status(200).json({
                        users : data,
                        currentUser : currentUser // mengetahui siapa yang sedang login dari authentication
                    })
                } catch (error) {
                    next({code : 404,message:"Guru tidak terdaftar di kelas manapun"})
                }
                // if(currentUser.Class.dataValues.Teacher === "null"){
                //     return next({code : 404,message:"Guru tidak terdaftar dimanapun"})
                // }
                // console.log(currentUser.Class.dataValues.Teacher)
                
            }

            console.log(currentUser)
            
            console.log(currentUser.role)
            
        } catch (error) {
            next({code:500,message:error.message||'internal server error'})
        }
    },

    Register : async (req,res,next) => {
        try {
            const {name,email,password} = req.body

            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                return next({code:406,message:"format email is not correct"})
            }

            const isExist = await User.findOne({
                where : {email : email}
            })
            
            if(isExist){
                return next({code:409,message:"email already exist"})
            }

            const hashed = bcrypt.hashSync(password)
            let data = {
                name:name,
                email:email,
                password:hashed,
                role:"teacher",
            }
            const newUser = await User.create(data)

            res.status(201).json({
                message : "user created",
                teacher : {Nama_Guru : newUser.name,ID:newUser.id,email:email,Role:"teacher"}
            })
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    Login : async (req,res,next) => {
        try {
            const {email,password} = req.body;
            
            // cek apakah emailnya ada?
            let user = await User.findOne({
                where : {
                    email : email
                }
            })

            if(!user) {
                throw new Error ("invalid email / password")
            }


            //cek apakah passnya bener
            if(!bcrypt.compareSync(password,user.password)){
                throw new Error ("invalid email / password")
            }

            //kembalikan access token
            const jwtPayload = {
                userId : user.id,
                role   : user.role
            };

            const accesstoken = jwt.sign(jwtPayload,"charlie")

            res.status(200).json({
                message : `Login Berhasil, Selamat Datang ${user.name}`,
                accessToken : accesstoken,
                payload : jwtPayload
            })

        } catch (error) {
            next({code:500,message:error.message})
        }
    }
}

module.exports = userController