var boton = document.getElementById('Ingresar');

boton.addEventListener('click', function(){
    //alert("entro a la funcion");
    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  var porId=document.getElementById("email2").value;
   if(porId==""){
        document.getElementById("email").focus();
          alert("Debes Ingresar tu Email");               
          return false;
      }
      else if(!re.exec(porId)){
          document.getElementById("email2").focus();
          alert("Email No Valido");
          return false;
      }
      else if(document.getElementById("password").value == ""){
        document.getElementById("password").focus();
        alert("Debes ingresar la password");
      }
  else{
        //aqui se debe crear la lógica para consumir el webservice de login
        var user = document.getElementById("email2").value;
        var password = document.getElementById("password").value;
        if(user=='admin@admin.com' && password=='admin'){
          //alert("es usuario administrador");
          var url = "/proveedor";
          window.location = url;
        }else if(user=='admin@cliente.com' && password=='admin'){
            var url = "/cliente";
            window.location = url;
        }
        else{
          alert("no es usuario administrador");
          axios.get('http://34.68.127.94', {
              correo: user,
              password:password
          })
          .then(function(res){
              if(res.status==200){
                  console.log(res.data);
                  alert("Credenciales Válidas");
              }else{
                  alert("Credenciales inválidas");
              }
              console.log(res);
          })
          .catch(function(err){
              console.log(err);
              alert(err);
          })
        }
      }
  });

  var boton2 = document.getElementById('registrar');

  boton2.addEventListener('click', function(){
    //alert("entro a la funcion2");
    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  var porId=document.getElementById("email").value;
  if(document.getElementById('completo').value ==""){
    document.getElementById("completo").focus();
          alert("Debes Ingresar tu Nombre Completo");               
          return false;
      }else if(document.getElementById("dir").value ==""){
        document.getElementById("dir").focus();
          alert("Debes Ingresar tu Direccion");               
          return false;
      }else if(document.getElementById("email").value ==""){
        document.getElementById("email").focus();
          alert("Debes Ingresar tu Email");               
          return false;
      }
      else if(!re.exec(porId)){
          document.getElementById("email").focus();
            alert("Email No Valido");
  return false;
      }
      else if(document.getElementById("tel").value ==""){
        document.getElementById("tel").focus();
          alert("Debes Ingresar tu Telefono");               
          return false;
      }
      else if(document.getElementById("pass1").value==""){
        document.getElementById("pass1").focus(); 
          alert("Debes Ingresar la Password");              
          return false;
      }

      else if(document.getElementById("pass2").value==""){
        document.getElementById("pass2").focus();
          alert("Debes Confirmar la password");               
          return false;
      }
      else if(document.getElementById("pass1").value.length < 6){
        document.getElementById("pass1").focus();
          alert("La password debe tener minimo 6 Caracteres");               
          return false;
      }
      else if(document.getElementById("pass2").value.length < 6){
        document.getElementById("pass2").focus();
          alert("La password debe tener minimo 6 Caracteres");               
          return false;
      }
  else{
    alert('se puede registrar usuario');
              
    var nombre1 = document.getElementById("completo").value;
    var direccion1 = document.getElementById("dir").value;
    var email1 = document.getElementById("email").value;
    var tel1 = document.getElementById("tel").value;
    var tipoRegistro1 = document.getElementById("tipoUsuario").value
    var pw = document.getElementById("pass1").value;
    alert(nombre1 + " | " + direccion1 +" | "+ email1 +" | "+ tel1+" | "+ tipoRegistro1 + " | " +pw);

    var usuario = {
        nombre: nombre1,
        correo: email1,
        celular: tel1,
        direccion: direccion1,
        password: pw, 
        tipo: tipoRegistro1
    }
    console.log(JSON.stringify(usuario));
    axios.post('http://34.68.127.94/registro', JSON.stringify(usuario))

    .then(function(res){
      if(res.status==201){
        alert("Usuario registrado exitosamente!");
        var url = "/";
         $(location).attr('href', url);
      }else{
        document.getElementById("spanmensaje").innerText = "No se pudo registrar el usuario, intente de nuevo.";
      }
    })
    .catch(function(err){
      console.log(err);
    })
 }
  });

  var carrito = document.getElementById('botonCarrito');

carrito.addEventListener('click', function(){
    location('carrito.html');
});