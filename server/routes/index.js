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
var safe_buffer_1 = require("safe-buffer");
var express = require('express');
var db = require('../db/index');
var axios = require('axios');
var bodyParser = require('body-parser');
var router = express.Router();
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');
var con = mysql.createConnection({
    host: '34.66.117.163',
    port: '3306',
    user: 'admin',
    password: 'T@shkjet20',
    database: 'proyectosa'
});
var objsCarrito = new Array();
//------------------------lista proveedor y productos---------------
router.get('/listaProveedores', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.allProveedores()];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/listaProductos', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.allProductos()];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/listarProductosProveedor', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("lista productos proveedor");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.allProductosProveedor(req.body.codproveedor)];
            case 2:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
//-------------------detalles usuario-------------------------
router.get('/getUsuario', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.one(req.body.codusuario)];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//----------------------------- borrar proveedor------------------
router["delete"]('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.borrar(req.params.id)];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                console.log(e_5);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//-------------------------- registrar usuario-------------------------
router.post('/registro', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, results, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(req.body.tipo == 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, db.insertarP(req.body.nombre, req.body.correo, req.body.direccion, req.body.celular, req.body.password, req.body.tipo)];
            case 1:
                results = _a.sent();
                res.sendStatus(201);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, db.insertarC(req.body.nombre, req.body.correo, req.body.direccion, req.body.celular, req.body.password, req.body.tipo)];
            case 3:
                results = _a.sent();
                res.sendStatus(201);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                e_6 = _a.sent();
                console.log(e_6);
                res.sendStatus(500);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
//-------------------------CRUD PRODUCTO-------------------------------
router.post('/insertarProducto', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, results2, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, db.insertarProducto(req.body.nombre, req.body.cat_codcategoria, req.body.stock, req.body.precio, req.body.precio_venta)];
            case 1:
                results = _a.sent();
                return [4 /*yield*/, db.insertarProductoProveedor(results, req.body.codproveedor)];
            case 2:
                results2 = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                console.log(e_7);
                res.sendStatus(500);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/modificarProducto/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.updateProducto(req.body.nombre, req.body.cat_codcategoria, req.body.stock, req.body.precio, req.body.precio_venta, req.params.id)];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                console.log(e_8);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router["delete"]('/eliminarProducto/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.borrarProducto(req.params.id)];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_9 = _a.sent();
                console.log(e_9);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//-----------------------------------------------------------------
router.get('/listarCompras', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var results, e_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.listarCompras(req.body.codusuario)];
            case 1:
                results = _a.sent();
                res.status(200).json(results);
                return [3 /*break*/, 3];
            case 2:
                e_10 = _a.sent();
                console.log(e_10);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/auth', function (request, response) {
    var email = request.body.correo;
    var password = request.body.password;
    console.log("entro al auth " + email + " " + password);
    if (email && password) {
        con.query('SELECT * FROM usuario WHERE email = ? AND contra = ?', [email, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = email;
                var buf = safe_buffer_1.Buffer.from(results[0].tipo);
                console.log(buf.toString());
                response.status(200).send(JSON.stringify({ "codusuario": results[0].codusuario, "tipo": results[0].tipo })); //REDIRECT 
            }
            else {
                response.send(401);
            }
            response.end();
        });
    }
    else {
        response.send('favor ingresar nuevamente credenciales');
        response.end();
    }
});
var header = {
    "Content-Type": "application/json"
};
//-------------------------------compra--------------------------
router.post('/directa', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var producto, results, results2, e_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db.getProducto(req.body.idproducto)];
            case 1:
                producto = _a.sent();
                console.log("esto trae el producto: ", producto);
                return [4 /*yield*/, db.insertarCompra(req.body.idcliente, producto.subtotal)];
            case 2:
                results = _a.sent();
                return [4 /*yield*/, db.insertarDetalleCompra(results, producto)];
            case 3:
                results2 = _a.sent();
                res.status(200).json(results2);
                return [3 /*break*/, 5];
            case 4:
                e_11 = _a.sent();
                console.log(e_11);
                res.sendStatus(500);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/compra', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tot;
    return __generator(this, function (_a) {
        console.log("cod cliente" + req.body.idcliente);
        id = req.body.idcliente;
        tot = 0;
        funcionLista(req, res, function () {
            return __awaiter(this, void 0, void 0, function () {
                var j, idCompra, _a, _b, _i, i, iddetalle, e_12;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 6, , 7]);
                            //res.json(idCompra);
                            console.log("tamaño ", objsCarrito.length);
                            for (j in objsCarrito) {
                                tot = tot + (objsCarrito[j].subtotal * objsCarrito[j].cantidad);
                            }
                            console.log("total: ", tot);
                            return [4 /*yield*/, db.insertarCompra(id, tot)];
                        case 1:
                            idCompra = _c.sent();
                            _a = [];
                            for (_b in objsCarrito)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3 /*break*/, 5];
                            i = _a[_i];
                            console.log("for ", i, " ", objsCarrito[i]);
                            return [4 /*yield*/, db.insertarDetalleCompra(idCompra, objsCarrito[i])];
                        case 3:
                            iddetalle = _c.sent();
                            _c.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5:
                            res.status(200);
                            return [3 /*break*/, 7];
                        case 6:
                            e_12 = _c.sent();
                            console.log(e_12);
                            res.sendStatus(500);
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }.bind(this));
        return [2 /*return*/];
    });
}); });
function funcionLista(req, res, callback) {
    listarCarrito(req, res, function () {
        return callback();
    }.bind(this));
}
function listarCarrito(req, res, callback) {
    console.log("llamando servicio listar...");
    llamarServicioListar(req, res, function () {
        return callback();
    }.bind(this));
}
function llamarServicioListar(req, res, callback) {
    var j = axios.get('http://34.70.142.209/api/car/' + req.body.idcliente, {
        headers: header
    })
        .then(function (response) {
        console.log("->>>>>>  Consumiendo servicio de obtener carrito" + req.body.idcliente);
        for (var i in response.data) {
            objsCarrito.push(response.data[i]);
        }
        console.log("objetos carrito:", objsCarrito);
        return callback(objsCarrito);
        //res.json(response.data)
    })["catch"](function (e) {
        res.send(e.message);
    });
}
//-------------------------factura-----------------------------
router.post('/factura', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var idcompra, nit, dir, idcliente, tot;
    return __generator(this, function (_a) {
        console.log("cod compra" + req.body.idcompra);
        idcompra = req.body.idcompra;
        nit = req.body.nit;
        dir = req.body.direccion;
        idcliente = req.body.idcliente;
        tot = 0;
        funcionLista(req, res, function () {
            return __awaiter(this, void 0, void 0, function () {
                var detallecompra, j, idFactura, _a, _b, _i, i, iddetalle, e_13;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 7, , 8]);
                            return [4 /*yield*/, db.allDetalleCompra(idcompra)];
                        case 1:
                            detallecompra = _c.sent();
                            //res.json(idCompra);
                            console.log("esto trae el detallecompra: ", detallecompra);
                            console.log("tamaño ", detallecompra.length);
                            for (j in detallecompra) {
                                tot = tot + (detallecompra[j].subtotal * detallecompra[j].cantidad);
                            }
                            console.log("total: ", tot);
                            return [4 /*yield*/, db.insertarFactura(idcliente, nit, dir, tot)];
                        case 2:
                            idFactura = _c.sent();
                            _a = [];
                            for (_b in detallecompra)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            i = _a[_i];
                            console.log("for ", i, " ", detallecompra[i]);
                            return [4 /*yield*/, db.insertarDetalleFactura(idFactura, detallecompra[i])];
                        case 4:
                            iddetalle = _c.sent();
                            _c.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6:
                            res.json(detallecompra);
                            return [3 /*break*/, 8];
                        case 7:
                            e_13 = _c.sent();
                            console.log(e_13);
                            res.sendStatus(500);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        }.bind(this));
        return [2 /*return*/];
    });
}); });
module.exports = router;
