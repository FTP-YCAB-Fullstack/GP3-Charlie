"use strict"

const {Student,Class} = require("../models");

const studentController = {
    getAll: async (req,res,next) =>{
        try {
            let student = await Student.findAll({include : Class});
            if (student.length){
                res.status(200).json({
                    msg: "Success Get All Data of Student",
                    student
                })

            }else{
                res.status(404).json({
                    msg : "Data is Empty"
                })
            }
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    submitNewData: async(req,res,next)=>{
        try {
            let {name,Class} = req.body;
            let payload = {
                name : name,
                Class : Class
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
                    student
                })
            }
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    update : async(req,res,next)=>{
        try {
            let student = await Student.findOne({
            where : {
                id : req.params.id    
            }
        });
            student.update(req.body);
                res.status(200).json({
                    msg: "Success Updating Data",
                    student
                })
    
            
        } catch (error) {
            next({code:500,message:error.message})
        }
    },

    revoke : async(req,res,next)=>{
        try {
            let student = await Student.destroy({
                where : {
                    id : req.params.id
                }
            })

            if(!student === 1){
                res.status(200).json({
                    msg : "Success Delete Data",
                    student
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