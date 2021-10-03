"use strict"

const {Score,Mapel,Student,Class} = require("../models");

const scoreController= {
    getScore: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser;
            
            let score = await Score.findAll({
                attributes: {
                    exclude: ["createdAt","updatedAt","StudentId"]
                },
                include:{
                    model: Student,
                    attributes: {
                        exclude: ['id','createdAt', 'updatedAt']
                        },
                    }
            });
            
            res.status(200).json({
                score,
                currentUser
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    addScore: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser;

            let {studentId,MapelId,grade} = req.body;
    
            let student = await Student.findOne({where : {id : studentId},include : Class})

            let mapel = await Mapel.findOne({where : {id : MapelId}})
            let checkStudent = await Student.findOne({where : {id : studentId}})

            if(!mapel){
                return next({code:404,message:"Mapel Not Found"})
            }

            if(!checkStudent){
                return next({code:404,message:"Student Not Found"})
            }

            if(student.Class.dataValues.Teacher !== currentUser.Class.dataValues.Teacher){
                console.log("Bukan Gurunya")
                return next({code : 401,message:`Anda bukan guru ${student.name}, Akses ditolak`})
            }

            let student_name = await Student.findByPk(studentId);
            let Mapel_name = await Mapel.findByPk(MapelId)
            

            // console.log(student_name.toJSON(),Mapel_name.toJSON());
            let result = await student_name.addMapel(Mapel_name, { through: { grade: grade } });
            // let result = await Mapel_name.addStudent(student_name, { through: { grade: grade } });
            // let payload = {
            //     studentId : student_name,
            //     MapelId : Mapel_name,
            //     grade : grade,
            //     StudentData : StudentData
            // }
            // let nilai = await Score.create(payload)
            res.status(201).json({
                result,
                currentUser
            })
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    getDetail: async(req,res,next)=>{
        try {
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