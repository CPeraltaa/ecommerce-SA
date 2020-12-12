import { json } from "express";
var express = require('express');
var db = require('../db/index');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');
const con = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'admin',
    password: '1234',
    database: 'proyectosa'
});
//------------------------lista proveedor y productos---------------
router.get('/listaProveedores', async (req, res, next) => {
    try{
        let results = await db.allProveedores();
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
router.get('/listaProductos', async (req, res, next) => {
    try{
        let results = await db.allProductos();
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//----------------------------- borrar proveedor------------------
router.delete('/:id', async (req, res, next) => {
    try{
        let results = await db.borrar(req.params.id);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//-------------------------- registrar usuario-------------------------
router.post('/registro', async (req, res, next) => {
    try{
        if(req.body.tipo == 1){
            if(req.body.foto == ""){
                let results = await db.insertarP(req.body.nombre,req.body.correo,req.body.direccion,req.body.password,req.body.tipo);    
                res.json(results);
            }else{
                let results = await db.insertarP(req.body.nombre,req.body.correo,req.body.direccion,req.body.password,req.body.tipo,req.body.foto);
                res.json(results);
            }
            
            
        }else{
            if(req.body.foto == ""){
                let results = await db.insertarC(req.body.nombre,req.body.apellidos,req.body.correo,req.body.direccion,req.body.celular,req.body.password,req.body.tipo);
                res.json(results);
            }else{
                let results = await db.insertarC(req.body.nombre,req.body.apellidos,req.body.correo,req.body.direccion,req.body.celular,req.body.password,req.body.tipo,req.body.foto);
                res.json(results);
            }
            
        }
        
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


//-------------------------CRUD PRODUCTO-------------------------------
router.post('/insertarProducto', async (req,res) => {
    try{
        
        let results = await db.insertarProducto(req.body.nombre, req.body.cat_codcategoria,req.body.stock,req.body.precio,req.body.precio_venta);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/modificarProducto/:id', async (req,res) => {
    try{
        
        let results = await db.updateProducto(req.body.nombre, req.body.cat_codcategoria,req.body.stock,req.body.precio,req.body.precio_venta,req.params.id);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/eliminarProducto/:id', async (req,res) => {
    try{
        let results = await db.borrarProducto(req.params.id);
        res.json(results);
        
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//-----------------------------------------------------------------


router.post('/auth', function(request, response) {
	var email = request.body.correo;
    var password = request.body.password;
    console.log("entro al auth "+email+" "+password);
	if (email && password) {
		con.query('SELECT * FROM usuario WHERE email = ? AND contra = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {

				request.session.loggedin = true;
                request.session.username = email;
                
				response.redirect('/home');//REDIRECT 
			} else {
				response.send('Contraseña o usuario incorrecto');
			}			
			response.end();
		});
	} else {
		response.send('favor ingresar nuevamente credenciales');
		response.end();
	}
});
module.exports = router