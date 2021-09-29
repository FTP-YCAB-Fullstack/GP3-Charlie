

const authorization = (roles) => (req,res,next) => {
    try {
        const currentUser = req.currentUser.dataValues // ambil currentUser buat tau rolenya apa
        // console.log(currentUser.dataValues)
        if(!roles.includes(currentUser.role)){
            next({code:500, message:"Unauthorized Access"})
        }
        next()
    } catch (error) {
        next({code:500, message:error.message})
    }

}

module.exports = authorization