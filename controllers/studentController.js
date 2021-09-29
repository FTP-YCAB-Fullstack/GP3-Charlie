"use strict"

const {Student,Class} = require("../models");

const studentController = {
    getAll: async (req,res,next) =>{
        try {
            let student = await Student.findAll({include:Class});
            res.status(200).json({
                msg : "Success",
                student
            })
        } catch (error) {
            res.status(500).json({
               error 
            })
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
            res.status(500).json({
                error
            })
        }
    },

    getById : async(req,res,next)=>{
        try {
            let student = await Student.findOne({
                where : {
                    id : req.params.id
                }
            });
            res.status(200).json({
                msg : "Succes Get Data By Id",
                student
            })

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
            res.status(201).json({
                msg : "Success Updating Data",
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

            res.status(200).json({
                msg : "Success Delete Data",
                student
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = studentController;