const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')

const path = require('path');

const pool = mysql.createPool({
    connectionLimit:10,
    password: '1234',
    user: 'admin',
    database: 'proyectosa',
    host: 'localhost',
    port: '3308',
    multipleStatements : true
});

const con = mysql.createConnection({
    host: 'localhost',
    port: '3308',
    user: 'admin',
    password: '1234',
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
            const query = "INSERT INTO usuario(nombre,email,direccion,telefono,contra,tipo,foto) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + celular +"','" + password + "'," + tipo +",'"+foto+"');";
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
proyectobd.insertarP = (nombre,correo,direccion,password,tipo,foto,telefono) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO usuario(nombre,email,direccion,telefono,tipo,contra,foto) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + telefono + "',1,'"+password+"');";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });


};
proyectobd.insertarC = (nombre,apellidos,correo,direccion,celular,password,tipo,url,idjuego) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO usuario(nombre,apellidos,correo,direccion,celular,password,tipo) VALUES ('" + nombre + "','" + apellidos + "','"+correo + "','" +direccion + "','" + celular + "','"+password+"',0);";
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
module.exports = proyectobd;