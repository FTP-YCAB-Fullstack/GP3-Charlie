"use strict"

const {Student,Class,Mapel} = require("../models");


const studentController = {
    getAll: async (req,res,next) =>{
        try {
            const currentUser = req.currentUser;
            if (currentUser.role === "admin"){
                let student = await Student.findAll({include : [Class,Mapel]});
                if (student.length){
                    res.status(200).json({
                        msg: "Success Get All Data of Student",
                        student,
                        currentUser
                    })
                }else{
                    res.status(404).json({
                        msg : "Data is Empty"
                    })
                }
            }
            if(currentUser.role==="teacher"){
                // console.log(currentUser.dataValues)
                let student = await Student.findAll({where : {
                    ClassId : currentUser.dataValues.Class.dataValues.id
                },include : [Class,Mapel]});
                if (student.length){
                    res.status(200).json({
                        msg: "Success Get All Data of Student",
                        student,
                        currentUser
                    })
                }else{
                    res.status(404).json({
                        msg : "Data is Empty"
                    })
                }
            }
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    submitNewData: async(req,res,next)=>{
        try {
            let {name,ClassId} = req.body;
            let payload = {
                name : name,
                ClassId : ClassId
            }

            let student = await Student.create(payload);
            res.status(201).json({
                msg : "Success Create New Student",
                student
            })
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    getById : async(req,res,next)=>{
        try {
            const currentUser = req.currentUser;
            // console.log(currentUser.toJSON())
            if (currentUser.role === "admin" ){
                let student = await Student.findOne({
                    where : {
                        id : req.params.id
                    }
                });
                if (student==null){
                    res.status(404).json({
                        msg : "Data is Empty"
                    })
                }else{
                    res.status(200).json({
                        msg: "Success Get All Data of Student",
                        student,
                        currentUser
                    })
                }
            }

            // if(currentUser.role === "teacher"){
            //     let student = await Student.findOne({
            //         where : {
            //             id : req.params.id
            //         }
            //     });
            //     if (student==null){
            //         res.status(404).json({
            //             msg : "Data is Empty"
            //         })
            //     }else{
            //         res.status(200).json({
            //             msg: "Success Get All Data of Student",
            //             student,
            //             currentUser
            //         })
            //     }
            // }
            
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    update : async(req,res,next)=>{
        try {
            const {id} = req.params;
            const {name, ClassId} = req.body;
            const payload = {
                name : name,
                ClassId : ClassId
            }
            Student.update(payload,{where : {
                id : id
            }})
            
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    revoke : async(req,res,next)=>{
        try {
            const {id} = req.params;
            let student = await Student.destroy({
                where : {
                    id : id
                }
            })

            if(student){
                res.status(200).json({
                    msg : "Success Delete Data"
                })
            }else{
                res.status(404).json({
                    msg : "Data is Empty",
                })
            }
            
        } catch (error) {
            next({code:500,message:error.message})
        }
    }
}

module.exports = studentController;