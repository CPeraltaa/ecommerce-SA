'use strict'

const mysql = require('mysql'),
      objectConnection = {
        connectionLimit: 10,
        host: '34.66.117.163',
        port: '3308',
        user: 'admin',
        password: 'T@shkjet20',
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