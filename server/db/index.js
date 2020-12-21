const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')

const path = require('path');

const pool = mysql.createPool({
    connectionLimit:10,
    password: 'T@shkjet20',
    user: 'admin',
    database: 'proyectosa',
    host: '34.66.117.163',
    port: '3306',
    multipleStatements : true
});

const con = mysql.createConnection({
    host: '34.66.117.163',
    port: '3306',
    user: 'admin',
    password: 'T@shkjet20',
    database: 'proyectosa'
});

let proyectobd = {};

proyectobd.allProveedores = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM usuario where tipo = 1`, (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
proyectobd.allProductos = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM producto`, (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

proyectobd.allProductosProveedor = (proveedor) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM producto, product_prov WHERE product_prov.proveedor = ? AND producto.codproducto = product_prov.product`,[proveedor], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
proyectobd.allDetalleCompra = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM detallecompra where compra= ?`,[id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
proyectobd.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM usuario WHERE codusuario= ? `, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};
proyectobd.getProducto = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM producto WHERE codproducto= ? `, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};
proyectobd.listarCompras = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM compra WHERE cliente= ? `, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};
proyectobd.borrar = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from usuario WHERE codusuario= ?`, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve('BORRADO');
        });
    });
};
proyectobd.borrarProducto = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from producto WHERE codproducto= ?`, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve('Producto BORRADO');
        });
    });
};
proyectobd.borrarCategoria = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from categoria WHERE codcategoria= ?`, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve('Categoria BORRADO');
        });
    });
};


proyectobd.insertar = (nombre,correo,direccion,celular,password,tipo,foto) => {
    
        
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO usuario(nombre,email,direccion,telefono,contra,tipo) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + celular +"','" + password + "'," + tipo +",'"+foto+"');";
            con.query(query, (err, res) => {
            if (err) throw err;           
            resolve(res.insertId);
            });
        });
    
    
};
proyectobd.login = (email,password) => {
    var username = req.body.email;
    var pass = req.body.password;
    if(username && pass){
        
    }
    
        
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM usuario WHERE correo = '" + email + "' AND password='" + password + "';";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res);
        });
    });


};
proyectobd.insertarCategoria = (nombre) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO categoria(nombre) VALUES ('" + nombre + "');";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarP = (nombre,correo,direccion,telefono,password,tipo) => {
    
    
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO usuario(nombre,email,direccion,telefono,contra,tipo) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + telefono + "','"+password+"',1);";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarC = (nombre,correo,direccion,celular,password,tipo) => {
    
    
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO usuario(nombre,email,direccion,telefono,contra,tipo) VALUES ('" + nombre + "','"+correo + "','" +direccion + "','" + celular + "','"+password+"',0);";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};

proyectobd.insertarProducto = (nombre,idcategoria,stock,precio,precioventa) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO producto(nombre,cat_codcategoria,stock,precio,precio_venta) VALUES ('" + nombre + "'," + idcategoria + ","+stock + "," +precio + "," + precioventa + ");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarProductoProveedor = (producto,proveedor) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO product_prov(proveedor,product) VALUES (" + proveedor + "," + producto + ");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};


proyectobd.insertarPoductoImagen = (nombre,idcategoria,stock,path,precio,precioventa) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO producto(nombre,idcategoria,stock,path,precio,precio_venta) VALUES ('" + nombre + "'," + idcategoria + ","+stock + ",'"+path+"'," +precio + "," + precioventa + ");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.updateProducto= (nombre,idcategoria,stock,precio,precioventa, codproducto) => {
    
    
    const query = "UPDATE producto SET nombre='"+nombre+"', cat_codcategoria="+idcategoria+", stock="+stock+",precio="+precio+",precio_venta="+precioventa+" WHERE codproducto="+codproducto+";" 
    con.query(query, (err, res) => {
        if (err) throw err;           
        console.log("producto "+codproducto +" actualizado");
    });



};
proyectobd.insertarFactura = (cliente,nit,direccion,total) => {
    var d = Date(Date.now()); 
  
    // Converting the number of millisecond  
    // in date string 
    a = d.toString() 
    a = a.substring(0, a.length - 38);
    console.log("entro a la factura ", a);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO factura(codcliente,nit,direccion,fecha,total) VALUES (" + cliente + ",'"+nit+"','"+direccion+"','"+ a +"',"+total+");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};

proyectobd.insertarDetalleFactura = (idfactura,objeto) => {
    
  
    
    console.log("entro al detalle factura ",objeto);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO detallefactura(codfactura,codproducto,cantidad,subtotal) VALUES (" + idfactura + ","+ objeto.producto +","+ objeto.cantidad+","+objeto.subtotal+");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarCompra = (cliente,total) => {
    var d = Date(Date.now()); 
  
    // Converting the number of millisecond  
    // in date string 
    a = d.toString() 
    a = a.substring(0, a.length - 38);
    console.log("entro a la compra ", a);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO compra(cliente,fecha,total) VALUES (" + cliente + ",'"+ a +"',"+total+");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};

proyectobd.insertarDetalleCompra = (idcompra,objeto) => {
    
  
    
    console.log("entro al detalle compra ",objeto);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO detallecompra(compra,producto,cantidad,subtotal) VALUES (" + idcompra + ","+ objeto.id +","+ objeto.cantidad+","+objeto.subtotal+");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarDetalleCompra2 = (idcompra,objeto) => {
    
  
    
    console.log("entro al detalle compra ",objeto);
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO detallecompra(compra,producto,cantidad,subtotal) VALUES (" + idcompra + ","+ objeto.codproducto +", 1 ,"+objeto.precio_venta+");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
module.exports = proyectobd;