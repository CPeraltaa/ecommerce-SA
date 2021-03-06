"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql = require("mysql");
require("dotenv").config();
var RouteCar = /** @class */ (function () {
    function RouteCar() {
        this.router = express_1.Router();
        this.routes();
    }
    RouteCar.prototype.get = function (req, resp) {
        var id = req.params.id;
        var connection = mysql.createConnection({
            /* host: "localhost",
             user: "root",
             password: "123456",
             database: "prueba",*/
            host: '34.66.117.163',
            user: 'root',
            password: 'SA12345',
            database: 'proyectosa'
        });
        connection.connect();
        connection.query("select*from carrito where id_cliente = ?", [id], function (error, results, fields) {
            if (error)
                throw error;
            console.log(results);
            return resp.json(results);
        });
        connection.end();
    };
    RouteCar.prototype.post = function (req, resp) {
        //obtener el json del cuerpo del request:
        var newPost;
        newPost = req.body;
        var connection = mysql.createConnection({
            /*host: "localhost",
            user: "root",
            password: "123456",
            database: "prueba",*/
            host: '34.66.117.163',
            user: 'root',
            password: 'SA12345',
            database: 'proyectosa'
        });
        connection.connect();
        connection.query('insert into carrito set ?', [newPost], function (error, results, fields) {
            if (error)
                throw error;
            return resp.json({
                statusCode: 200,
                message: "elemento creado",
            });
        });
        connection.end();
    };
    RouteCar.prototype.delete = function (req, resp) {
        var id = req.params.id;
        var connection = mysql.createConnection({
            /*host: "localhost",
            user: "root",
            password: "123456",
            database: "prueba",*/
            host: '34.66.117.163',
            user: 'root',
            password: 'SA12345',
            database: 'proyectosa'
        });
        connection.connect();
        connection.query("delete from carrito where id_cliente = ?", [id], function (error, results, fields) {
            if (error)
                throw error;
            return resp.json({
                statusCode: 200,
                message: "elemento eliminado",
            });
        });
        connection.end();
    };
    RouteCar.prototype.routes = function () {
        this.router.route("/:id").get(this.get).delete(this.delete),
            this.router.route("/").post(this.post);
    };
    return RouteCar;
}());
var routecar = new RouteCar();
exports.default = routecar.router;
