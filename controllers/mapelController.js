"use strict"

const {Mapel,Score} = require("../models");

const mapelController= {
    getMapel: async(req,res,next)=>{
        try {
            let mapel = await Mapel.findAll();
            res.status(200).json({
                message: 'Success',
                mapel
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    getDetail: async(req,res,next)=>{
        try {
            const data = await Mapel.findOne({
                where: {
                    id: req.params.id
                },
                include: Score
            })
    
            if (!data) {
                return next({code: 404, message: 'Not Found'})
            }
    
            res.status(200).json({
                status: 'success',
                data
            })
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    },
    addMapel: async(req,res,next)=>{
        try {
            let {nama_mapel} = req.body;
    
            let data = await Mapel.create({nama_mapel});
            
    
            res.status(201).json({
                status: 'success',
                data
            })
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    patchMapel: async(req,res,next)=>{
        try {
            let {nama_mapel} = req.body;
    
            let data = await Score.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!data) {
                return next({code: 400, message: 'Not Found, try with another id'})
            }
    
            data.nama_mapel=nama_mapel
    
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
    deleteMapel: async(req,res,next)=>{
        try {
            const data = await Mapel.findOne({where: {id: req.params.id}});
    
            if (!data) {
                return next({code: 400, message: 'Not Found, please try with another id'})
            }
    
            await data.destroy();
    
            res.sendStatus(204)
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=mapelController