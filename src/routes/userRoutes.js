const User = require ('../models/user');

module.exports = function(app){
    app.get('/users',(req, res)=>{
        User.getUsers((err,data)=>{
            res.status(200).json(data);
        })
    });
    app.get('/users/:id',(req, res)=>{
        User.getUser(req.params.id,(err,data)=>{
            res.status(200).json(data);
        })
    });


    app.post('/users',(req, res)=>{
        const userData = {
            id:null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };
        User.insertUser(userData,(err,data)=>{
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg: 'Usuario Creado!',
                    data:data
                })
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error Creando Usuario!'  
                })
            }
        });
    });

    app.put('/users/:id', (req,res)=>{
        const userData = {
            id:req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            created_at: null,
            updated_at: null
        };
        User.updateUser(userData, (err,data)=>{
            if(data && data.msg) {
                res.json({
                    success: true,
                    msg: 'Usuario Modificado!',
                    data:data
                })
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error Modificando Usuario!'  
                })
            }
        }) 
    });

    app.delete('/users/:id', (req,res)=>{
        let rMensaje="Usuario Eliminado";
        User.deleteUser(req.params.id, (err,data)=>{
            if(data && data.msg) {
                if(data.msg==='not exist'){rMensaje="Usuario no Existe";}                
                res.json({
                    success: true,
                    msg: rMensaje,
                    data:data
                })
            }else{
                res.status(500).json({
                    success: false,
                    msg: 'Error Eliminando Usuario!'  
                })
            }
        }) 
    });



};




/*
const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    res.json([])
});

module.exports = router;*/