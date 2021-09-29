const mainRouter = require('express').Router();
const studentRouter = require ("./student");


mainRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: 'all good, connected'
    })
})

mainRouter.use(studentRouter);

module.exports = mainRouter