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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteCar = void 0;
var express_1 = require("express");
var db_1 = require("./db");
var mysql = require("mysql");
require("dotenv").config();
var RouteCar = /** @class */ (function () {
    function RouteCar() {
        this.router = express_1.Router();
        this.routes();
    }
    RouteCar.prototype.get = function (req, resp) {
        return __awaiter(this, void 0, void 0, function () {
            var id, con;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, db_1.conn()];
                    case 1:
                        con = _a.sent();
                        con.connect();
                        con.query("select*from carrito where id_cliente = ?", [id], function (error, results, fields) {
                            if (error)
                                throw error;
                            console.log(results);
                            return resp.json(results);
                        });
                        con.end();
                        return [2 /*return*/];
                }
            });
        });
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
exports.RouteCar = RouteCar;
var routecar = new RouteCar();
exports.default = routecar.router;
