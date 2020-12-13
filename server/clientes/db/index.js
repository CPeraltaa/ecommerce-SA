const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit:10,
    password: '1234',
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
    password: '1234',
    database: 'proyectosa'
});

let dataBD = {};

dataBD.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM producto`, (error,results) =>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};


dataBD.infoCliente = (codusuario) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM usuario WHERE codusuario= ? `, [codusuario], (error,results) =>{
            if(error){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};



dataBD.insertarTarjeta = (numero,nombre,direccion,vencimiento,cvv,cliente) => {
    
        
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO tarjeta(numero,nombre,direccion,vencimiento,cvv,cliente) VALUES ('" + numero + "','" + nombre + "','" + direccion + "','" + vencimiento +"','" + cvv + "'," + cliente +");";
        con.query(query, (err, res) => {
        if (err) throw err;           
        resolve(res.insertId);
        });
    });
};


dataBD.getTarjetasUsuario = (cliente) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM tarjeta WHERE cliente= ? `, [cliente], (error,results) =>{
            if(error){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};


dataBD.eliminarTarjeta = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE from tarjeta WHERE cliente= ?`, [id], (err,results) =>{
            if(err){
                return reject(err);
            }
            return resolve('Eliminada');
        });
    });
};

module.exports = dataBD;