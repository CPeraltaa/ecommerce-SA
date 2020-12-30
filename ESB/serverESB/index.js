"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var axios = require('axios');
var mysql = require('mysql');
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.post("/registrar-cliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/registro', {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.email,
            direccion: "ciudad",
            password: req.body.contraseña,
            celular: req.body.celular,
            tipo1: "0"
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/registrar-proveedor", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/registro', {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            empresa: req.body.empresa,
            correo: req.body.email,
            password: req.body.contrasena,
            celular: req.body.celular,
            direccion: req.body.direccion,
            tipo: 1
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/login-cliente", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/auth', {
            correo: req.body.email,
            password: req.body.contraseña
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/login-proveedor", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/auth', {
            correo: req.body.email,
            password: req.body.contraseña
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/crear-producto-proveedor", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/insertarProducto', {
            codproveedor: req.body.id_proveedor,
            nombre: req.body.nombre,
            stock: req.body.stock,
            precio: req.body.precio_venta,
            precio_venta: req.body.precio_venta
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.get("/ver-productos", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.get('http://34.68.127.94/listaProductos').then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/ver-producto?id_producto=:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/getProducto', {
            idproducto: req.params.id
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.post("/realizar-compra", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios.post('http://34.68.127.94/compra2', {
            idcliente: req.body.id_cliente,
            productos: req.body.productos
        }).then(function (response) {
            res.send(JSON.stringify(response.data));
        })["catch"](function (error) {
            res.send(error.message);
        });
        return [2 /*return*/];
    });
}); });
app.listen(app.get('port'), function () {
    console.log("server running on " + app.get('port'));
});
