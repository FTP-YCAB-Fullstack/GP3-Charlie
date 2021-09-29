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
    },
    patchScore: async(req,res,next)=>{
        try {
            let {studentId,MapelId,grade} = req.body;
    
            let data = await Score.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!data) {
                return next({code: 400, message: 'Not Found, try another id'})
            }
    
            data.studentId=studentId,
            data.MapelId = MapelId,
            data.grade = grade
    
            await data.save();
    
            res.status(200).json({
                status: 'success',
                data
            })
    
            console.log(data.toJSON())
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    },
    deleteScore: async(req,res,next)=>{
        try {
            const data = await Score.findOne({where: {id: req.params.id}});
    
            if (!data) {
                return next({code: 400, message: 'Not Found, please try another id'})
            }
    
            await data.destroy();
    
            res.sendStatus(204)
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=scoreController