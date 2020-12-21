const express = require("express");
const app = express();
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const config = require("./config");
const PORT = config.PORT;

//APP SETTINGS
app.set("port", 4000);
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

//MIDDLEWARES

//ROUTES
app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/proveedor", (req, res) => {
  res.render("proveedor.html");
});

app.get("/cliente", (req, res) => {
  res.render("cliente.html");
});

app.get("/perfil-cliente", (req, res) => {
  res.render("perfil_cliente.html");
});

app.get("/carrito", (req, res) => {
  res.render("carrito.html");
});

app.get("/favorito", (req, res) => {
  res.render("favoritos.html");
});

app.get('/detalleProducto', (req, res) => {
  res.render("detalleProducto.html");
});
//STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//LISTENING SERVER
app.listen(app.get("port"), () => {
  console.log("Server on Port ", app.get("port"));
});
