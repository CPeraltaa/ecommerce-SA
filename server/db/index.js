const mysql = require('mysql');
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
proyectobd.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM usuario WHERE idusuario= ? `, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};
proyectobd.borrar = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from usuario WHERE idusuario= ?`, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve('BORRADO');
        });
    });
};


proyectobd.insertar = (nombre,correo,direccion,celular,password,tipo) => {
    
        
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO usuario(nombre,correo,direccion,celular,password,tipo) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + celular +"','" + password + "'," + tipo +");";
            con.query(query, (err, res) => {
            if (err) throw err;           
            resolve(res.insertId);
            });
        });
    
    
};
proyectobd.login = (email,password) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM usuario WHERE correo = '" + email + "' AND password='" + password + "';";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res);
        });
    });


};
proyectobd.insertarP = (nombre,correo,direccion,password,tipo,url,idjuego) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO usuario(nombre,correo,direccion,password,tipo) VALUES ('" + nombre + "','" + correo + "','" + direccion + "','" + password + "',1);";
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
module.exports = proyectobd;