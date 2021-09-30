"use strict"

const {Mapel} = require("../models");

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
    addMapel: async(req,res,next)=>{
        try {
            let {nama_mapel} = req.body;
    
            let data = await Mapel.create({nama_mapel});
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
    patchMapel: async(req,res,next)=>{
        try {
            let {nama_mapel} = req.body;
    
            let data = await Score.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (!data) {
                return next({code: 400, message: 'Not Found, try another id'})
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
                return next({code: 400, message: 'Not Found, please try another id'})
            }
    
            await data.destroy();
    
            res.sendStatus(204)
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=mapelController