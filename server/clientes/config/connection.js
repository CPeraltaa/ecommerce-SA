'use strict'

const mysql = require('mysql'),
      objectConnection = {
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'proyectosa',
        multipleStatements : true,
        insecureAuth : true
      }

    const myConn = mysql.createConnection(objectConnection)

    myConn.connect((err) => {
        if(err) {
            console.log(`ha ocurrido un error : ${err}`)
        }else {
            console.log(`base de datos conectada !!!`)
        }
    })

module.exports = myConn