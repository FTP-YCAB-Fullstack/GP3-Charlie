"use strict"

const {Student} = require("../models");

const studentController = {
    getAll: async (req,res,next) =>{
        try {
            let student = await Student.findAll();
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
            next(error)
        }
    },

    submitNewData: async(req,res,next)=>{
        try {
            let student = await Student.create(req.body);
            res.status(201).json({
                msg : "Success Create New Student",
                student
            })
        } catch (error) {
           next(error)
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
            res.status(500).json({
                error
            })
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
            res.status(500).json(error)
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
            res.status(500).json(error)
        }
    }
}

module.exports = studentController;