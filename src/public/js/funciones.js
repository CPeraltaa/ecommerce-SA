//**************************************************LÓGICA DE FUNCIÓN PARA HACER LOGIN************************************************ */
var boton = document.getElementById("Ingresar");

boton.addEventListener("click", function () {
  //alert("entro a la funcion");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var porId = document.getElementById("email2").value;
  if (porId == "") {
    document.getElementById("email").focus();
    alert("Debes Ingresar tu Email");
    return false;
  } else if (!re.exec(porId)) {
    document.getElementById("email2").focus();
    alert("Email No Valido");
    return false;
  } else if (document.getElementById("password").value == "") {
    document.getElementById("password").focus();
    alert("Debes ingresar la password");
  } else {
    //aqui se debe crear la lógica para consumir el webservice de login
    var user = document.getElementById("email2").value;
    var password = document.getElementById("password").value;
    if (user == "admin@admin.com" && password == "admin") {
      //alert("es usuario administrador");
      var url = "/proveedor";
      window.location = url;
    } else if (user == "admin@cliente.com" && password == "admin") {
      var url = "/cliente";
      window.location = url;
    } else {
      var cliente = {
        correo: user,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post("http://34.68.127.94/auth", JSON.stringify(cliente), {
          headers: headers,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log(JSON.stringify(cliente));
            alert("Credenciales Válidas: " + JSON.stringify(res.data));
            console.log(JSON.stringify(res.data));

            var datos = JSON.parse(JSON.stringify(res.data));
            console.log("Datos: "+ Object.values(datos));
            var productos;
            var atributos = [];
            atributos = Object.values(datos);
            var usuario = Object.values(datos);
            console.log("usuario: " + usuario);
            var idUsuario = usuario[0];//se obtiene el id del usuario registrado
            var tipoUsuario = usuario[1]; //se obtiene el tipo de usuario que puede ser 01:cliente || 00:proveedor

            if (tipoUsuario == "01"){
              console.log("ID Usuario: "+idUsuario + "  tipo: Cliente");
              let url = "/cliente?id=" + idUsuario;
              $(location).attr("href", url);
            }else{
              console.log("ID Usuario: "+idUsuario + "  tipo: Proveedor");
              let url = "/proveedor?id=" + idUsuario;
              $(location).attr("href", url);
            }
          } else {
            alert("Credenciales inválidas");
          }
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
          alert(err);
        });
    }
  }
});
//**************************************************FUNCION...**********************************

function popUp(URL) {
  window.open(
    URL,
    "DetalleProducto",
    "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=600,left = 390,top = 50"
  );
}
//****************CREAR TARJETA DE PRODUCTO***************** */
function crearCasillaProducto(
  codproducto,
  nombre,
  cat_categoria,
  stock,
  precio,
  precio_venta
) {
  console.log("******************");

  //var productoData2 = Object.keys(productoData);
  const contenedor = document.getElementById("catalogo");

  const div = document.createElement("div");
  div.className = "col-sm-3";

  const divCard = document.createElement("div");
  divCard.className = "card";

  div.appendChild(divCard);

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  divCard.appendChild(divCardBody);

  const h5 = document.createElement("h5");
  h5.className = "card-title text-center";

  const img = document.createElement("img");
  img.id = "img_obs";
  img.src = "/imagen/alcanciabuena.png";

  h5.appendChild(img);

  const p1 = document.createElement("p");
  p1.className = "card-text";

  const labelProducto = document.createElement("label");
  labelProducto.id = "labelProducto";
  labelProducto.textContent = "Nombre: " + nombre;
  const br = document.createElement("br");
  const labelCategoria = document.createElement("label");
  labelCategoria.id = "labelCategoria";
  labelCategoria.textContent = "Categoría: " + cat_categoria;
  const br2 = document.createElement("br");
  const labelPrecio = document.createElement("label");
  labelPrecio.id = "labelPrecio";
  labelPrecio.textContent = "Precio: " + precio;

  p1.appendChild(labelProducto);
  p1.appendChild(br);
  p1.appendChild(labelCategoria);
  p1.appendChild(br2);
  p1.appendChild(labelPrecio);

  const p2 = document.createElement("p");
  p2.className = "card-text text-right";

  divCardBody.appendChild(h5);
  divCardBody.appendChild(p1);
  divCardBody.appendChild(p2);

  const btnAgregar = document.createElement("a");
  btnAgregar.modal = "modal";
  btnAgregar.data = "#ModalProductos";
  btnAgregar.type = "button";
  btnAgregar.href =
    "javascript:popUp('/detalleProducto?ID=" +codproducto +"&Precio=" +precio +"')";
  btnAgregar.id = "btnAgregarProducto2";
  btnAgregar.className = "btn btn-primary";
  btnAgregar.textContent = "Agregar al Carrito";

  p2.appendChild(btnAgregar);

  contenedor.appendChild(div);
}
//**************************************************LÓGICA DE FUNCIÓN DE REGISTRO DE USUARIOS************************************************ */
var boton2 = document.getElementById("registrar");

boton2.addEventListener("click", function () {
  //alert("entro a la funcion2");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var porId = document.getElementById("email").value;
  if (document.getElementById("completo").value == "") {
    document.getElementById("completo").focus();
    alert("Debes Ingresar tu Nombre Completo");
    return false;
  } else if (document.getElementById("dir").value == "") {
    document.getElementById("dir").focus();
    alert("Debes Ingresar tu Direccion");
    return false;
  } else if (document.getElementById("email").value == "") {
    document.getElementById("email").focus();
    alert("Debes Ingresar tu Email");
    return false;
  } else if (!re.exec(porId)) {
    document.getElementById("email").focus();
    alert("Email No Valido");
    return false;
  } else if (document.getElementById("tel").value == "") {
    document.getElementById("tel").focus();
    alert("Debes Ingresar tu Telefono");
    return false;
  } else if (document.getElementById("pass1").value == "") {
    document.getElementById("pass1").focus();
    alert("Debes Ingresar la Password");
    return false;
  } else if (document.getElementById("pass2").value == "") {
    document.getElementById("pass2").focus();
    alert("Debes Confirmar la password");
    return false;
  } else if (document.getElementById("pass1").value.length < 6) {
    document.getElementById("pass1").focus();
    alert("La password debe tener minimo 6 Caracteres");
    return false;
  } else if (document.getElementById("pass2").value.length < 6) {
    document.getElementById("pass2").focus();
    alert("La password debe tener minimo 6 Caracteres");
    return false;
  } else {
    //alert("se puede registrar usuario");

    var nombre1 = document.getElementById("completo").value;
    var direccion1 = document.getElementById("dir").value;
    var email1 = document.getElementById("email").value;
    var tel1 = document.getElementById("tel").value;
    var tipoRegistro1 = document.getElementById("tipoUsuario").value;
    var pw = document.getElementById("pass1").value;
    alert(
      nombre1 +
        " | " +
        direccion1 +
        " | " +
        email1 +
        " | " +
        tel1 +
        " | " +
        tipoRegistro1 +
        " | " +
        pw
    );

    var usuario = {
      nombre: nombre1,
      correo: email1,
      direccion: direccion1,
      celular: tel1,
      password: pw,
      tipo: tipoRegistro1,
    };
    console.log(JSON.stringify(usuario));
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://34.68.127.94/registro", JSON.stringify(usuario), {
        headers: headers,
      })
      .then((res) => {
        console.log("Retorno: " + res);
        if (res.status == 201) {
          alert("Usuario registrado exitosamente!");
          var url = "/";
          $(location).attr("href", url);
        } else {
          document.getElementById("spanmensaje").innerText =
            "No se pudo registrar el usuario, intente de nuevo.";
          alert("No se pudo registrar el usuario, intente de nuevo.");
        }
      })
      .catch(function (err) {
        alert("[ERROR]: " + err);
        console.log(err);
      });
  }
});

//**************************************************LÓGICA DE FUNCIÓN PARA CARGAR PRODUCTOS*********************************************** */
var botonCargarProductos = document.getElementById("botonDescargarProductos");

botonCargarProductos.addEventListener("click", function () {
  alert("entro a la funcion descargar productos.");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  //aqui se debe crear la lógica para consumir el webservice de login
  var user = "4";

  var listaProductos = {
    id: 1,
    id_cliente: 0,
    producto: "empty",
    cantidad: "1",
    subtotal: "1",
  };
  console.log(stringify(listaProductos));
  var URL = "http://34.68.127.94/" + user;
  axios
    .get(URL, JSON.stringify(listaProductos))
    .then((res) => {
      console.log(stringify("Entro a verificar dentorde la twew"));

      if (res.status == 200) {
        console.log(JSON.stringify(res.data));
        alert("Búsqueda Realizada: " + JSON.stringify(res.data));
      } else {
        alert("No se encontraron productos");
      }
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
      alert(err);
    });
});

var botonAgregarProductosSubasta = document.getElementById("btnAgregarProductoSubasta");

botonAgregarProductosSubasta.addEventListener("click", function () {
  alert("entro a la funcion agregar producto desde subasta.");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  //aqui se debe crear la lógica para consumir el webservice de login
  var user = "4";

  var producto = {
    nombre: "",
    cat_codcategoria: "",
    stock: "",
    precio: "",
    precio_venta: "",
    codproveedor: ""
  }

  var listaProductos = {
    id: 1,
    id_cliente: 0,
    producto: "empty",
    cantidad: "1",
    subtotal: "1",
  };
  console.log(stringify(producto));
  var URL = "http://34.68.127.94/insertarProducto";
  axios
    .get(URL, JSON.stringify(producto))
    .then((res) => {
      console.log(stringify("Entro a verificar dentorde la twew"));

      if (res.status == 200) {
        console.log(JSON.stringify(res.data));
        alert("Búsqueda Realizada: " + JSON.stringify(res.data));
      } else {
        alert("No se encontraron productos");
      }
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
      alert(err);
    });
});

function cargarProductosEnPantalla() {
  alert("entro a la funcion descargar productos. 2020202");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  //aqui se debe crear la lógica para consumir el webservice de login
  var user = "7";

  var listaProductos = {
    id: 1,
    id_cliente: 0,
    producto: "empty",
    cantidad: "1",
    subtotal: "1",
  };
  console.log(JSON.stringify(listaProductos));
  axios
    .get("http://35.238.2.36/cliente/listarProductos")
    .then((res) => {
      if (res.status == 200) {
        console.log(JSON.stringify(res.data));
        alert("Búsqueda Realizada: " + JSON.stringify(res.data));
        verProductosTienda(JSON.stringify(res.data));
      } else {
        alert("No se encontraron productos");
      }
      console.log(res);
    })
    .catch(function (err) {
      console.log("Error en llamada al microservisios");
      console.log(err);
      alert(err);
    });
}
//*****************BOTÓN PARA CALCULAR EL SUBTOTAL DE PRODUCTO***************** */
var calcularSubtotal = document.getElementById("subTotalProducto");
calcularSubtotal.addEventListener("keydown", function () {
  var precio = document.getElementById("precioProducto").value;
  alert("precio:" + precio);
  var cantidad = document.getElementById("cantidadProducto").value;
  alert("Cantidad:" + precio);
  if (cantidad > 0) {
    var subtotal = precio.value * cantidad.value;
    alert("Subtotal: " + subtotal.value);
    document.getElementById("subTotalProducto").value = subtotal;
  } else {
    alert("Debe elegir al menos un producto para agregar al carrito.");
  }
});

function calcularSubTotal() {
  var precio = document.getElementById("precioProducto").value;
  var cantidad = document.getElementById("cantidadProducto").value;
  var subtotal = precio * cantidad;
  alert("Subtotal: " + subtotal.value);
  document.getElementById("subTotalProducto").value = subtotal;
}

function calcularSubTotal() {
  var precio = document.getElementById("precioProducto").value;
  var cantidad = document.getElementById("cantidadProducto").value;
  var subtotal = precio * cantidad;
  alert("Subtotal: " + subtotal.value);
  document.getElementById("subTotalProducto").value = subtotal;
}

//**************************************************AÑADIR PRODUCTO AL CARRITO DE COMPRAS************************************************ */
var agrearProducto = document.getElementById("btnAñadeAlCarrito");

agrearProducto.addEventListener("click", function () {
  alert("entro a la funcion de añadir al carrito");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var cantidad = document.getElementById("cantidadProductos").value;
  if (cantidad <= 0) {
    alert(
      "Debe elegir al menos un producto para agregar al carrito de compra."
    );
  } else if (cantidad > 0) alert("Información correcta...");

  var nombre1 = document.getElementById("nombreProducto").value;
  var precio1 = document.getElementById("precioProducto").value;
  var cantidad1 = document.getElementById("cantidadProducto").value;
  var usuario1 = "1";

  var producto = {
    id_cliente: "",
    producto: "",
    cantidad: "",
    subtotal: "",
  };
  if (
    nombre1.value == "" &&
    precio1.value == "" &&
    cantidad1 == "0" &&
    usuario1 == ""
  ) {
    //si los parámetros vienen vacíos se llena el json con información por defecto
    producto.id_cliente = "0";
    producto.producto = "empty";
    producto.cantidad = "0";
    producto.subtotal = "0";

    //prueba para verificar si crea la tabla de información
  } else {
    //si los parámetros vienen con información, se asignan a los parámetros del json
    producto.id_cliente = usuario1;
    producto.producto = nombre1;
    producto.cantidad = cantidad1;
    producto.subtotal = precio1;

    //JSON construido para enviar
    console.log(JSON.stringify(producto));
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://34.70.142.209/api/car", JSON.stringify(producto), {
        headers: headers,
      })
      .then((res) => {
        console.log("Respuesta MS_Carrito: " + JSON.stringify(res.data));
        if (res.status == 200) {
          alert("Producto agregado a carrito exitosamente!");
          //var url = "/";
          //$(location).attr("href", url);
        } else {
          //document.getElementById("spanmensaje").innerText =
          //"No se pudo registrar el usuario, intente de nuevo.";
          alert("No se pudo registrar el usuario, intente de nuevo.");
        }
      })
      .catch(function (err) {
        alert("[ERROR]: " + err);
        console.log(err);
      });
  }
});

function agregarProductoCarrito() {
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var cantidad = document.getElementById("cantidadProducto").value;
  if (cantidad <= 0) {
    alert(
      "Debe elegir al menos un producto para agregar al carrito de compra."
    );
  } else if (cantidad > 0)
    var nombre1 = document.getElementById("nombreProducto").value;
  var precio1 = document.getElementById("precioProducto").value;
  var cantidad1 = document.getElementById("cantidadProducto").value;
  var usuario1 = "";

  var producto = {
    id_cliente: "",
    producto: "",
    cantidad: "",
    subtotal: "",
  };
  if (
    nombre1.value == "" ||
    precio1.value == "" ||
    cantidad1 == "0" ||
    usuario1 == ""
  ) {
    //si los parámetros vienen vacíos se llena el json con información por defecto
    console.log("El json no trae todos los campos");
    producto.id_cliente = "0";
    producto.producto = "empty";
    producto.cantidad = "0";
    producto.subtotal = "0";

    alert("El producto no se ha podido almacenar.");
    console.log("El producto no se ha podido almacenar.");
  } else {
    //si los parámetros vienen con información, se asignan a los parámetros del json
    producto.id_cliente = usuario1;
    producto.producto = nombre1;
    producto.cantidad = cantidad1;
    producto.subtotal = precio1;

    //JSON construido para enviar
    console.log(JSON.stringify(producto));
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post("http://34.70.142.209/api/car", JSON.stringify(producto), {
        headers: headers,
      })
      .then((res) => {
        console.log("Respuesta MS_Carrito: " + JSON.stringify(res.data));
        if (res.status == 200) {
          alert("Producto agregado a carrito exitosamente!");
          //var url = "/";
          //$(location).attr("href", url);
        } else {
          //document.getElementById("spanmensaje").innerText =
          //"No se pudo registrar el usuario, intente de nuevo.";
          alert("No se pudo registrar el usuario, intente de nuevo.");
        }
      })
      .catch(function (err) {
        alert("[ERROR]: " + err);
        console.log(err);
      });
  }
}

//**************************************************REDIRECCIÓN A CARRITO DE COMPRAS************************************************ */
var carrito = document.getElementById("botonCarrito");

carrito.addEventListener("click", function () {
  location("carrito.html");
});

//**************************************************FUNCIÓN PARA CONSTRUIR TABLA EN BASE A JSON************************************************ */
// function obtieneDatos(data){
//   console.log("Entro a la funcion de obtener datos");
//   var tabla = document.createElement("table");
//   var datos = JSON.parse(data);
//   console.log(datos);

//   for(let item of Object.keys(datos)){
//     console.log(item +": "+ datos[item]);
//     tabla.innerHTML += `
//         <td>${datos[item]}</td>
//     `
//   }

//   //console.log(tabla);
//   return tabla;
// }

function crearTablaDesdeJson(data) {
  console.log(data);
  var datosJson = JSON.parse(data);
  data = Object.keys(datosJson);
  console.log(data);
  console.log(data.length);
  var table = document.createElement("table");

  var thead = table.createTHead();
  var tbody = table.createTBody();
  console.log("Size de json: " + data.length);
  var col = [];

  for (var i = 0; i < data.length; i++) {
    console.log("Elemento_" + i + ": " + data[i]);
    var key = data[i].producto;
    if (col.indexOf(key) === -1) {
      col.push(key);
    }
  }

  var cabecera = thead.insertRow(-1);
  console.log("Tamaño de columnas: " + col.length);
  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = col[i];
    cabecera.appendChild(th);
  }

  tr = tbody.insertRow(-1);
  var tabCell;

  console.log(datosJson);
  for (let item of Object.keys(datosJson)) {
    var tabCell = tr.insertCell(-1);
    tabCell.innerHTML = datosJson[item];
  }
  console.log(table);
  return table;
}

function verProductosCarrito(data) {
  //console.log("Funcion para cargar productos en pantalla...");
  var datos = JSON.parse(data);
  var productos;
  var atributos = [];

  console.log("Cantidad de Atributos: " + atributos.length);
  for (let item of Object.keys(datos)) {
    var atr = Object.values(datos[item]);
    console.log("Item: " + atr);
    atributos.push(atr);
  }

  //se crea la tabla y sus encabezados
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var tabla =
    "<table class='table'>" +
    "<thead class='thead-dark'>" +
    "<tr>" +
    "<th>ID</th>" +
    "<th>Id_Cliente</th>" +
    "<th>Producto</th>" +
    "<th>Cantidad</th>" +
    "<th>Subtotal</th>" +
    "<th>Acciones</th>" +
    "</tr>" +
    "</thead>" +
    "<tbody>";

  for (var i = 0; i < atributos.length; i++) {
    var par = atributos[i];

    var id = par[0];
    var id_cliente = par[1];
    var producto = par[2];
    var cantidad = par[3];
    var subtotal = par[4];

    tabla +=
      "<tr>" +
      "<td>" +
      par[0] +
      "</td>" +
      "<td>" +
      par[1] +
      "</td>" +
      "<td>" +
      par[2] +
      "</td>" +
      "<td>" +
      par[3] +
      "</td>" +
      "<td>" +
      par[4] +
      "</td>" +
      "<td><button type='button' class='btn btn-dark'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/></svg></button>" +
      "<button type='button' class='btn btn-danger' onclick='eliminarCarrito()'>" +
      "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
      "<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>" +
      "<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>" +
      "</svg>" +
      "</button>" +
      "</td>" +
      "</tr>";

    console.log(
      "id: " +
        id +
        "  id:cliente: " +
        id_cliente +
        "  producto: " +
        producto +
        "  cantidad:  " +
        cantidad +
        "  subtotal: " +
        subtotal
    );
  }

  tabla += "</tbody></table>";
  console.log("Tabla construida con datos de carrito de compras...");
  console.log(tabla);
  return tabla;
}

function cargarCarrito(cliente) {
  let tabla;

  axios
    .get("http://34.70.142.209/api/car/" + cliente)
    .then((res) => {
      // tabla = crearTablaDesdeJson(JSON.stringify(res.data));
      // document.getElementById("detallecompra").appendChild(tabla);
      //console.log(JSON.stringify(res.data.producto));

      var respuesta = verProductosCarrito(JSON.stringify(res.data));
      document.getElementById("detallecompra").innerHTML = respuesta;
      /*var cc = [];

      for (var i in res.data) {
        cc.push(Number(res.data.rows[i].id));
        console.log(res.data.rows[i].producto);
      }
      console.log("arregloooo" + cc["producto"]);*/
    })
    .catch(function (err) {
      console.log("Error en llamada al microservisios");
      console.log(err);
      alert(err);
    });
  return tabla;
}

//*************************************************OBTENER PRODUCTOS DE LA TIENDA*********************************************** */
function verProductosTienda(data) {
  console.log("Funcion para cargar productos en pantalla...");
  var datos = JSON.parse(data);
  var productos;
  var atributos = [];

  console.log("Cantidad de Atributos: " + atributos.length);
  for (let item of Object.keys(datos)) {
    var atr = Object.values(datos[item]);
    console.log("Item: " + atr);
    atributos.push(atr);
  }

  //console.log("Total items: "+ atributos.length);

  for (var i = 0; i < atributos.length; i++) {
    var par = atributos[i];
    var codproducto = par[0];
    var nombre = par[1];
    var cat_categoria = par[2];
    var stock = par[3];
    var imagen = par[4];
    var precio = par[5];
    var precio_venta = par[6];

    // var id = par[0];
    // var id_cliente = par[1];
    // var producto = par[2];
    // var cantidad = par[3];
    // var subtotal = par[4];
    //console.log("id: " + id + "  id:cliente: " + id_cliente + "  producto: " + producto + "  cantidad:  "+ cantidad + "  subtotal: "+subtotal);
    console.log(
      "Codigo: " +
        codproducto +
        "  nombre " +
        nombre +
        "  categoria: " +
        cat_categoria +
        "  stock:  " +
        stock +
        "  precio: " +
        precio +
        "  precio_venta: " +
        precio_venta
    );
    //crearCasillaProducto(id, id_cliente, producto, cantidad, subtotal);
    crearCasillaProducto(
      codproducto,
      nombre,
      cat_categoria,
      stock,
      precio,
      precio_venta
    );
  }
}
//*************************************************CREAR TARJETA DE PRODUCTO************************************************** */
//****************CREAR TARJETA DE PRODUCTO***************** */
function crearCasillaProducto(
  codproducto,
  nombre,
  cat_categoria,
  stock,
  precio,
  precio_venta
) {
  console.log("******************");

  //var productoData2 = Object.keys(productoData);
  const contenedor = document.getElementById("catalogo");

  const div = document.createElement("div");
  div.className = "col-sm-3";

  const divCard = document.createElement("div");
  divCard.className = "card";

  div.appendChild(divCard);

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  divCard.appendChild(divCardBody);

  const h5 = document.createElement("h5");
  h5.className = "card-title text-center";

  const img = document.createElement("img");
  img.id = "img_obs";
  img.src = "/imagen/alcanciabuena.png";

  h5.appendChild(img);

  const p1 = document.createElement("p");
  p1.className = "card-text";

  const labelProducto = document.createElement("label");
  labelProducto.id = "labelProducto";
  labelProducto.textContent = "Nombre: " + nombre;
  const br = document.createElement("br");
  const labelCategoria = document.createElement("label");
  labelCategoria.id = "labelCategoria";
  labelCategoria.textContent = "Categoría: " + cat_categoria;
  const br2 = document.createElement("br");
  const labelPrecio = document.createElement("label");
  labelPrecio.id = "labelPrecio";
  labelPrecio.textContent = "Precio: " + precio;

  p1.appendChild(labelProducto);
  p1.appendChild(br);
  p1.appendChild(labelCategoria);
  p1.appendChild(br2);
  p1.appendChild(labelPrecio);

  const p2 = document.createElement("p");
  p2.className = "card-text text-right";

  divCardBody.appendChild(h5);
  divCardBody.appendChild(p1);
  divCardBody.appendChild(p2);

  const btnAgregar = document.createElement("a");
  btnAgregar.modal = "modal";
  btnAgregar.data = "#ModalProductos";
  btnAgregar.type = "button";
  btnAgregar.href =
    "javascript:popUp('detalleProducto?ID=" +
    codproducto +
    "&Precio=" +
    precio +
    "')";
  btnAgregar.id = "btnAgregarProducto2";
  btnAgregar.className = "btn btn-primary";
  btnAgregar.textContent = "Agregar al Carrito";

  p2.appendChild(btnAgregar);

  contenedor.appendChild(div);
}

//*******************FUNCION PARA OBTENER LOS PARÀMETROS DE LA URL************************ */
function getUrlParameter(parametro) {
 var sPageUrl = decodeURIComponent(window.location.search.substring(1)),
     sUrlVariables = sPageUrl.split('&'), 
     sParameterName, 
     i;
  for(i = 0; i < sUrlVariables.length; i++){
    sParameterName = sUrlVariables[i].split('=');
    if (sParameterName[0] == parametro){
      if (sParameterName[1] == undefined){
        return "0";
      }else{
        return sParameterName[1];
      }
    }
  }
};


function cargaIdUSuario(){
  var idUsuario = getUrlParameter("id");
  if (idUsuario === undefined ){
    alert("No se encontró el id de usuario");
  }else{
    alert("Bienvenido usuario id: " + idUsuario);
    document.getElementById("spanIdUsuario").innerText = idUsuario;
  }
  console.log("Usuario obtenido: " + idUsuario);
}