const mainRouter = require('express').Router();
const studentRouter = require ("./student");
const ClassRouter = require("./class")
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