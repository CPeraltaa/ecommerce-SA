import { Router } from "express";
import { Request, Response } from "express";
import { Descripcion } from "./Descripcion";
import {RequestMail} from './RequestMail';
import {ResponseMail} from './ResponseMail'
var nodemailer = require("nodemailer");
require("dotenv").config();

class ClienteRoute {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  get(req: Request, resp: Response) {
   //return resp.json("***");
  }

  private post(req: Request, resp: Response) {
    //obtener el json del cuerpo del request:
    let input: RequestMail;
    input = req.body;
    //TODO: posiblemente, ir a la base de datos a consultar... o realizar algun proceso...

console.log(input);  
var cuerpoMsj:string="";
console.log(input);
if (input.tipo == 1){
    cuerpoMsj = "Listado de Productos:   "
    for(var i = 0;i<input.articulos.length;i++) {

      let aux:Descripcion
      aux = input.articulos[i];
      cuerpoMsj = cuerpoMsj + aux.Desc+" /";
      console.log(cuerpoMsj);
    }
cuerpoMsj = cuerpoMsj +", Total compra: "+ input.totalCompra;
}else if(input.tipo == 2){
    cuerpoMsj = "El producto: "+input.productoAgotado +" esta agotado."
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
  to: input.para, //"ederson.ramirez87@gmail.com",
  subject: "Reporte",
  text: cuerpoMsj,
};
transporter.sendMail(mailOPtions,(error:any,info:any)=>{
    if(error){
        resp.status(500).send(error.message);
    }else{
        let vrlResponse: ResponseMail = {
            statusCode: 200,
            msj: "Correo enviado exitosamente.",
          };
        console.log("email enviado");
        resp.status(200).jsonp(vrlResponse);
       // resp.status(200).jsonp(req.body);
    }
}) 

    //return resp.json(vrlResponse);
  }

  private routes() {
    this.router.route("/").get(this.get).post(this.post);
  }
}

const clienteRoute = new ClienteRoute();
export default clienteRoute.router;
