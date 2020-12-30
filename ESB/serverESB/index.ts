var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var axios = require('axios');
var mysql = require('mysql');
var path = require('path');

import { AxiosError, AxiosResponse } from "axios";
import {Response, Request} from "express";
import { MysqlError } from "mysql";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);





app.post("/registrar-cliente", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/registro', {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.email,
        direccion: "ciudad",
        password: req.body.contraseña,
        celular: req.body.celular,
        tipo: 0
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});

app.post("/registrar-proveedor", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/registro', {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        empresa: req.body.empresa,
        correo: req.body.email,
        password: req.body.contrasena,
        celular:req.body.celular,
        direccion: req.body.direccion,
        tipo: 1
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});

app.post("/login-cliente", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/auth', {
        
        correo: req.body.email,
        password: req.body.contraseña
        
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});

app.post("/login-proveedor", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/auth', {
        
        correo: req.body.email,
        password: req.body.contraseña
        
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});

app.post("/crear-producto-proveedor", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/insertarProducto', {
        codproveedor : req.body.id_proveedor,
        nombre: req.body.nombre,
        stock: req.body.stock,
        precio: req.body.precio_venta,
        precio_venta: req.body.precio_venta
        
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});


app.get("/ver-productos", async (req: Request, res: Response) => {
    axios.get('http://34.68.127.94/listaProductos'
    ).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});

app.post("/ver-producto?id_producto=:id", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/getProducto', {
        idproducto: req.params.id
        
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});
app.post("/realizar-compra", async (req: Request, res: Response) => {
    axios.post('http://34.68.127.94/compra2', {
        idcliente: req.body.id_cliente,
        productos : req.body.productos
        
    }).then(function (response:AxiosResponse) {
        res.send(JSON.stringify(response.data));
    }).catch(function (error:AxiosError) {
        res.send(error.message);
    });
});
app.listen(app.get('port'), () => {
    console.log(`server running on ${app.get('port')}`);
});
