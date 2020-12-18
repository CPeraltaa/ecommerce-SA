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
    alert("se puede registrar usuario");

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

var calcularSubtotal = document.getElementById("subTotalProducto");
calcularSubtotal.addEventListener("keydown", function(){

    var precio = document.getElementById("precioProducto").value;
    alert("precio:" + precio);
    var cantidad = document.getElementById("cantidadProducto").value;
    alert("Cantidad:" + precio);
    if(cantidad > 0){
      var subtotal = precio.value * cantidad.value;
    alert("Subtotal: " + subtotal.value);
    document.getElementById("subTotalProducto").value = subtotal;
    }else{
      alert("Debe elegir al menos un producto para agregar al carrito.");
    }

});

function calcularSubTotal(){
    var precio = document.getElementById("precioProducto").value;
    var cantidad = document.getElementById("cantidadProducto").value;
    var subtotal = precio * cantidad;
    alert("Subtotal: " + subtotal.value);
    document.getElementById("subTotalProducto").value = subtotal;
}

var agrearProducto = document.getElementById("btnAñadeAlCarrito");

boton2.addEventListener("click", function () {
  //alert("entro a la funcion2");
  re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  var cantidad = document.getElementById("cantidadProductos").value;
  if(cantidad <= 0){
      alert("Debe elegir al menos un producto para agregar al carrito de compra.");
  }else if(cantidad >0)
    alert("Información correcta...");

    var nombre1 = document.getElementById("nombreProducto").value;
    var precio1 = document.getElementById("precioProducto").value;
    var cantidad1 = document.getElementById("cantidadProducto").value;
    var usuario1 = "admin";

    var producto = {
      id_cliente: usuario1,
      producto: nombre1,
      cantidad: cantidad1,
      subtotal: precio1
    }
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

});

var carrito = document.getElementById("botonCarrito");

carrito.addEventListener("click", function () {
  location("carrito.html");
});
