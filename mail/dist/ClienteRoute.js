"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var nodemailer = require("nodemailer");
require("dotenv").config();
var ClienteRoute = /** @class */ (function () {
    function ClienteRoute() {
        this.router = express_1.Router();
        this.routes();
    }
    ClienteRoute.prototype.get = function (req, resp) {
        //return resp.json("***");
    };
    ClienteRoute.prototype.post = function (req, resp) {
        //obtener el json del cuerpo del request:
        var input;
        input = req.body;
        //TODO: posiblemente, ir a la base de datos a consultar... o realizar algun proceso...
        console.log(input);
        var cuerpoMsj = "";
        console.log(input);
        if (input.tipo == 1) {
            cuerpoMsj = "Listado de Productos:   ";
            for (var i = 0; i < input.articulos.length; i++) {
                var aux = void 0;
                aux = input.articulos[i];
                cuerpoMsj = cuerpoMsj + aux.Desc + " /";
                console.log(cuerpoMsj);
            }
            cuerpoMsj = cuerpoMsj + ", Total compra: " + input.totalCompra;
        }
        else if (input.tipo == 2) {
            cuerpoMsj = "El producto: " + input.productoAgotado + " esta agotado.";
        }
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: "softwareavanzado17@gmail.com",
                pass: "sagrupo17"
            },
        });
        var mailOPtions = {
            from: "Grupo 17",
            to: input.para,
            subject: "Reporte",
            text: cuerpoMsj,
        };
        transporter.sendMail(mailOPtions, function (error, info) {
            if (error) {
                resp.status(500).send(error.message);
            }
            else {
                var vrlResponse = {
                    statusCode: 200,
                    msj: "Correo enviado exitosamente.",
                };
                console.log("email enviado");
                resp.status(200).jsonp(vrlResponse);
                // resp.status(200).jsonp(req.body);
            }
        });
        //return resp.json(vrlResponse);
    };
    ClienteRoute.prototype.routes = function () {
        this.router.route("/").get(this.get).post(this.post);
    };
    return ClienteRoute;
}());
var clienteRoute = new ClienteRoute();
exports.default = clienteRoute.router;
