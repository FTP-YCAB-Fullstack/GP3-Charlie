const mainRouter = require('express').Router();
const studentRouter = require ("./student");
<<<<<<< HEAD
=======
const ClassRouter = require("./class")
>>>>>>> b82ed7cda5febea0a26008b892c499ac1594b7e4
const userRouter = require('./user')
const scoreRouter = require('./score')
const mapelRouter = require('./mapel')


mainRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: 'all good, connected'
    })
})

mainRouter.use(studentRouter);
mainRouter.use(userRouter);
mainRouter.use(scoreRouter);
mainRouter.use(mapelRouter);
mainRouter.use(userRouter)
mainRouter.use(ClassRouter)


module.exports = mainRouter