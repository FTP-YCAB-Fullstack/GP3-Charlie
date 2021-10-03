"use strict"

const {Mapel,Score} = require("../models");

const mapelController= {
    getMapel: async(req,res,next)=>{
        try {
            const currentUser = req,currentUser
            if (currentUser.role === "admin") {
                let mapel = await Mapel.findAll();
                if (!mapel) {
                    return next({code:404, message:"data tidek ditemukan"})
                }
                res.status(200).json({
                    message: 'Success',
                    mapel
                })
            }
            if (currentUser.role === "teacher") {
                let mapel = await Mapel.findAll();
                if (!mapel) {
                    return next({code:404, message:"data tidek ditemukan"})
                }
                res.status(200).json({
                    message: 'Success',
                    mapel
                })
            }
        } catch (error) {
            next({code:500, message:error.message})
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
          
            
    
        } catch (err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
    
        }
    },
    patchMapel: async(req,res,next)=>{
        try {
            if (currentUser.role === "admin") {
                let {nama_mapel} = req.body;
    
                let data = await Mapel.findOne({
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
            }
           
    
            console.log(data.toJSON())
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    },
    deleteMapel: async(req,res,next)=>{
        try {
            if (currentUser.role === "admin") {
                const data = await Mapel.findOne({where: {id: req.params.id}});
    
                if (!data) {
                    return next({code: 400, message: 'Not Found, please try with another id'})
                }
        
                await data.destroy();
        
                next({code:200, message: "sukses delete data"})
            }
            
        } catch(err) {
            next({code: 500, message: err.message || 'Internal Server Error'})
        }
    }
}

module.exports=mapelController