const mainRouter = require('express').Router();

const userRouter = require('./user')


mainRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: 'all good, connected'
    })
})

mainRouter.use(userRouter)

module.exports = mainRouter