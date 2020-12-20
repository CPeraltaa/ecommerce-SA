import { Router } from "express";
import { Request, Response } from "express";
import { RequestCar } from "./RequestCar";
var mysql = require("mysql");
require("dotenv").config();

export class RouteCar {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  get(req: Request, resp: Response) {
    const id = req.params.id;

    var connection = mysql.createConnection({
      /* host: "localhost",
      user: "root",
      password: "123456",
      database: "prueba",*/

      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "select*from carrito where id_cliente = ? and tipo = 'C'",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        console.log(results);
        return resp.json(results);
      }
    );
    connection.end();
  }

  post(req: Request, resp: Response) {
    //obtener el json del cuerpo del request:
    let newPost: RequestCar;
    newPost = req.body;

    var connection = mysql.createConnection({
      /*host: "localhost",
      user: "root",
      password: "123456",
      database: "prueba",*/
      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "insert into carrito set ?",
      [newPost],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        return resp.json({
          statusCode: 200,
          message: "elemento creado",
        });
      }
    );
    connection.end();
  }

  delete(req: Request, resp: Response) {
    const id = req.params.id;
    var connection = mysql.createConnection({
      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "delete from carrito where id_cliente = ?",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        return resp.json({
          statusCode: 200,
          message: "elemento eliminado",
        });
      }
    );
    connection.end();
  }

  postF(req: Request, resp: Response) {
    //obtener el json del cuerpo del request:
    let newPost: RequestCar;
    newPost = req.body;

    var connection = mysql.createConnection({
      /*host: "localhost",
      user: "root",
      password: "123456",
      database: "prueba",*/
      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "insert into carrito set ?",
      [newPost],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        return resp.json({
          statusCode: 200,
          message: "elemento creado",
        });
      }
    );
    connection.end();
  }

  getF(req: Request, resp: Response) {
    //Obtener el listado de favoritos de un cliente
    const id = req.params.id;

    var connection = mysql.createConnection({
      /* host: "localhost",
      user: "root",
      password: "123456",
      database: "prueba",*/

      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "select*from carrito where id_cliente = ? and tipo = 'F'",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        console.log(results);
        return resp.json(results);
      }
    );
    connection.end();
  }

  deleteF(req: Request, resp: Response) {
    //borrar elemento de favoritos mediante su id
    const id = req.params.id;
    var connection = mysql.createConnection({
      host: "34.66.117.163",
      user: "root",
      password: "SA12345",
      database: "proyectosa",
    });
    connection.connect();
    connection.query(
      "delete from carrito where id = ?",
      [id],
      function (error: any, results: any, fields: any) {
        if (error) throw error;

        return resp.json({
          statusCode: 200,
          message: "elemento eliminado",
        });
      }
    );
    connection.end();
  }

  private routes() {
    this.router.route("/:id").get(this.get).delete(this.delete),
      this.router.route("/").post(this.post),
      this.router.route("/f").post(this.postF),
      this.router.route("/f/:id").get(this.getF).delete(this.deleteF);
  }
}

const routecar = new RouteCar();
export default routecar.router;
