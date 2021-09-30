const jwt = require("jsonwebtoken")
const {User} = require("../models");

const authentication = async (req,res,next) => {
    try {
        // get token dari header masing2 route
        const {accesstoken} = req.headers
        // console.log(req.headers)

        // cek access tokennya ada apa engga
        if(!accesstoken){
            throw new error ("accesstoken needed")
        }

        // cek access tokennya sama secret-keynya bener apa engga 
        const jwtPayload = jwt.verify(accesstoken,"charlie"); // disini jwt akan dapet info seperti userId dan role (dikirim saat login)
        // console.log(jwtPayload)

        // mengecek apakah yang punya accesstoken ini ada didatabase atau engga
        let user = await User.findOne({
            where : {
                id : jwtPayload.userId  // cek apakah idnya sama kayak yang dibawa payload
            }
        })

        // kalo user udah engga ada di database bakal error
        if(!user){
            throw new Error ("user sudah tidak ada di database")
        }
        
        //menginfokan ke autho siapa yang sedang login 
        // infonya bisa dipake di method controller
        req.currentUser = user

        next();

    } catch (error) {
        next({code:500, message:error.message})
    }
}

module.exports = authentication