"use strict"

const {Mapel,Score,Student} = require("../models");

const mapelController= {
    getMapel: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser;
            if(currentUser.role === "admin"){
                let mapel = await Mapel.findAll();
                if(mapel.length){

                    res.status(200).json({
                        message: 'Success',
                        mapel,
                        currentUser
                    })
                }else{
                    res.status(404).json({
                        msg : "Data is Empty"
                    })
                }
            }

            if(currentUser.role === "teacher"){
                let mapel = await Mapel.findAll();
                res.status(200).json({
                    message: 'Success',
                    mapel,
                    currentUser
                })
            }
        } catch (error) {
            next({code:500,message:error.message})
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
            const currentUser = req.currentUser
            console.log(currentUser.role)
            
            let {nama_mapel} = req.body;

            if(currentUser.role === "admin"){

        
                let data = await Mapel.create({nama_mapel});
                
        
                res.status(201).json({
                    status: 'success',
                    data
                })
            }else{
                res.status(401).json({
                    message:"User Access Denied"
                })
            }
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    patchMapel: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            console.log(currentUser.role)
            if (currentUser.role === "admin") {
                
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
            }else{
                res.status(401).json({
                    message:"access denied"
                })
            }
    
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    },
    deleteMapel: async(req,res,next)=>{
        try {
            const currentUser = req.currentUser
            console.log(currentUser.role)
            if (currentUser.role === "admin") {
                
                const data = await Mapel.findOne({where: {id: req.params.id}});
        
                if (!data) {
                    return next({code: 400, message: 'Not Found, please try with another id'})
                }
        
                await data.destroy();
        
                res.sendStatus(204)
            }
            else{
                res.status(401).json({
                    message: "Access Denied"
                })
            }
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=mapelController