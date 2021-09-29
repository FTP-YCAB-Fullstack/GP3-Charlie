"use strict"

const {Score} = require("../models");

const scoreController= {
    getScore: async(req,res,next)=>{
        try {
            let score = await Score.findAll();
            res.status(200).json({
                message: 'Success',
                score
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    addScore: async(req,res,next)=>{
        try {
            let {studentId,MapelId,grade} = req.body;
    
            let data = await Score.create({studentId, MapelId, grade});
            // let group = await Group.findByPk(groupId)
    
            // await data.addGroup(group)
    
            res.status(201).json({
                status: 'success',
                data
            })
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    }
}

module.exports=scoreController