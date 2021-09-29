const mainRouter = require('express').Router();


mainRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: 'all good, connected'
    })
})

module.exports = mainRouter