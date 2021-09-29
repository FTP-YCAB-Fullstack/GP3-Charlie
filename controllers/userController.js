const {User,Class} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userController = {
    getAll : async (req,res,next) => {
        try {
            const currentUser = req.currentUser
            let data = await User.findAll()
            res.status(200).json({
                users : data,
                currentUser : currentUser // mengetahui siapa yang sedang login dari authentication
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
                throw new Error("Email already exist")
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