"use strict"

const {Score,Mapel,Student} = require("../models");

const scoreController= {
    getScore: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            if (currentUser.role === "admin") {
                
                let score = await Score.findAll({include:Mapel});
                if (!score) {
                    return next({code:404,message:"Data Not Found"})
                }
                res.status(200).json({
                    message: 'Success',
                    score
                })
            }

            if (currentUser.role === "teacher") {
                let score = await Score.findAll({include:Mapel});
                if (!score) {
                    return next({code:404,message:"Data Not Found"})
                }
                res.status(200).json({
                    message: 'Success',
                    score
                })
            }
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    addScore: async(req,res,next)=>{
        try {
            let {studentId,MapelId,grade} = req.body;
            const currentUser = req.currentUser
            if (currentUser.role === "admin") {
                
                // let student_name = await Student.findByPk(studentId);
                // let Mapel_name = await Mapel.findByPk(MapelId)
                
    
               
                // console.log(student_name.toJSON(),Mapel_name.toJSON());
                // let result = await student_name.addMapel(Mapel_name)
                let result = {
                    studentId : studentId,
                    MapelId : MapelId,
                    grade : grade
                }
    
                let score = await Score.create(result)
                res.status(201).json({
                    status: score
                })
            }
    
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    getDetail: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            if (currentUser.role === "admin") {
                
                const data = await Score.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: Mapel
                })
        
                let student_name = await Student.findByPk(studentId);
                let Mapel_name = await Mapel.findByPk(MapelId)
    
               
                // console.log(student_name.toJSON(),Mapel_name.toJSON());
                let result = await student_name.addMapel(Mapel_name)
                // let result = {
                //     studentId : studentId,
                //     MapelId : MapelId,
                //     grade : grade
                // }
    
                // let score = await Score.create(result)
                res.status(201).json({
                    status: result
                })
            }

            if (currentUser.role==="teacher") {
                const data = await Score.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: Mapel
                })
        
                let student_name = await Student.findByPk(studentId);
                let Mapel_name = await Mapel.findByPk(MapelId)
    
               
                // console.log(student_name.toJSON(),Mapel_name.toJSON());
                let result = await student_name.addMapel(Mapel_name)
                // let result = {
                //     studentId : studentId,
                //     MapelId : MapelId,
                //     grade : grade
                // }
    
                // let score = await Score.create(result)
                res.status(201).json({
                    status: result
                })
            }
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    patchScore: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            if (currentUser.role==="admin") {
                
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
            }
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    },
    deleteScore: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            if (currentUser.role === "admin") {
                
                const data = await Score.findOne({where: {id: req.params.id}});
        
                if (!data) {
                    return next({code: 400, message: 'Not Found, please try another id'})
                }
        
                await data.destroy();
        
                res.sendStatus(200).json({
                    message:"berhasi hapus data"
                })
            }
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=scoreController