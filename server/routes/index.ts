import { json } from "express";
var express = require('express');
var db = require('../db/index');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/listaProveedores', async (req, res, next) => {
    try{
        let results = await db.allProveedores();
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        let results = await db.borrar(req.params.id);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/registro', async (req, res, next) => {
    try{
        if(req.body.tipo == 1){
            let results = await db.insertarP(req.body.nombre,req.body.correo,req.body.direccion,req.body.password,req.body.tipo);
            res.json(results);
        }else{
            let results = await db.insertarC(req.body.nombre,req.body.apellidos,req.body.correo,req.body.direccion,req.body.celular,req.body.password,req.body.tipo);
            res.json(results);
        }
        
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/login', async (req,res) => {
    try{
        let results = await db.login(req.body.email, req.body.password);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = router