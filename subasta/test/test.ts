import { json } from "body-parser";
import { expect } from "chai";

let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
const url = "http://35.196.221.92";

describe("Obtener subastas: ", () => {
  it("subastas", (done) => {
    chai
      .request(url)
      .get("/api/sub/act")
      .end(function (err: any, res: any) {
        //console.log(res);
        expect(res);
        done();
      });
  });
});

describe("consulta subasta: ", () => {
  it("consultas", (done) => {
    chai
      .request(url)
      .post("/api/sub/act")

      .send({
        /*chanel: "APP",
        td_digit: 2569,
        dpi: "2236151050201",
        pin: "5426",*/
      })
      .end(function (err: any, res: any) {
        //console.log(res);
        expect(res);
        done();
      });
  });
});

describe("consulta2: ", () => {
  it("consulta2", (done) => {
    chai
      .request(url)
      .post("/api/sub/of")

      .send({
        id_subasta: 4,
        valor_of: 350,
        usuario_of: 4,
        estado: 1,
      })
      .end(function (err: any, res: any) {
        // console.log(res);
        expect(res);
        done();
      });
  });
});
