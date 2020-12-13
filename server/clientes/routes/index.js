import { json } from "express";
var express = require('express');
var db = require('../db/index');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/listarProductos', async (request, res, next) => {
    try{
        let results = await db.getAllProducts();
        res.json(results);
        
    } catch(e) {
        res.sendStatus(500);
    }
});

router.get('/getInfoCliente', async (request, res, next) => {
    try{
        let results = await db.infoCliente(request.body.codusuario);
        res.json(results);
        
    } catch(e) {
        res.sendStatus(500);
    }
});

router.get('/getTarjetas', async (request, res, next) => {
    try{
        let results = await db.getTarjetasUsuario(request.body.cliente);
        res.json(results);
        
    } catch(e) {
        res.sendStatus(500);
    }
});

router.post('/insertarTarjeta', async (req, res, next) => {
    try{
        let results = await db.insertarTarjeta(req.body.numero,req.body.nombre,req.body.direccion,req.body.vencimiento,req.body.cvv,req.body.cliente);
        res.json(results);
    } catch(e) {
        res.sendStatus(500);
    }
});

router.delete('/:cliente', async (req, res, next) => {
    try{
        let results = await db.eliminarTarjeta(req.params.cliente);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router