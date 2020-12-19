import { Router } from "express";
import { Request, Response } from "express";
import {RequestSub} from './RequestSub';
import {RequestOf} from './RequestOf';
import {conn} from './db';
var mysql = require("mysql");
require("dotenv").config();

export class RouteCar {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  async getOfWin(req: Request, resp: Response) {
    const id = req.params.id;
    const con = await conn();
    con.connect();
    con.query(
      "select*from oferta where estado = 1 and id_subasta = ?",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        console.log(results);
        return resp.json(results);
      }
    );
    con.end(); 
  }

  async getOfHis(req: Request, resp: Response) {
    const id = req.params.id;
    const con = await conn();
    con.connect();
    con.query(
      "select*from oferta where id_subasta = ?",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        console.log(results);
        return resp.json(results);
      }
    );
    con.end(); 
  }

  async getSubAct(req: Request, resp: Response) {
    //const id = req.params.id;
    const con = await conn();
    con.connect();
    con.query(
      "select*from subasta where fecha_fin >= sysdate()",
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        console.log(results);
        return resp.json(results);
      }
    );
    con.end(); 
  }
  async post(req: Request, resp: Response) {
    //obtener el json del cuerpo del request:
    let newPost: RequestSub;
    newPost = req.body;

    const con = await conn();
    con.connect();
    con.query(
      'insert into subasta set ?',[newPost],
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        return resp.json({
          statusCode:200,
          message: "elemento creado",
        });
      }
    );
    con.end();
  }



  async postOf(req: Request, resp: Response) {
    //obtener el json del cuerpo del request:
    let newPost: RequestOf;
    let sub:number;
    newPost = req.body;
    sub = newPost.id_subasta;


    const con1 = await conn();
    con1.connect();
    con1.query(
      'update oferta set estado = 2 where id_subasta = ?',[sub],
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        console.log('Elementos actualizados...')
        /*return resp.json({
          statusCode:200,
          message: "elemento creado",
        });*/
      }
    );
    con1.end();


    const con = await conn();
    con.connect();
    con.query(
      'insert into oferta set ?',[newPost],
      function (error: any, results: any, fields: any) {
        if (error) throw error;
        return resp.json({
          statusCode:200,
          message: "elemento creado",
        });
      }
    );
    con.end();
  }


  delete(req: Request, resp: Response){
    const id = req.params.id;

    var connection = mysql.createConnection({
      /*host: "localhost",
      user: "root",
      password: "123456",
      database: "prueba",*/
      host:'34.66.117.163',
      user:'root',
      password:'SA12345',
      database: 'proyectosa'
    });

    connection.connect();
    connection.query(
      "delete from carrito where id_cliente = ?",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        
      }
    );
    connection.end();
  }

  private routes() {
    this.router.route("/ofwin/:id").get(this.getOfWin),
    this.router.route("/ofhis/:id").get(this.getOfHis),
    this.router.route("/act").get(this.getSubAct),
    this.router.route("/").post(this.post),
    this.router.route("/of").post(this.postOf);
  }
}

const routecar = new RouteCar();
export default routecar.router;
