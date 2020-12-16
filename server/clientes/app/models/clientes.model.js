'use strict'

const connection = require('../../config/connection')

var dataModels = {
    getProducts : (callback) => {
        if(connection) {
            let sql = `select * from producto`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    getInfoClient : (data, callback) => {
        console.log("el id : ", data)
        if(connection) {
            let sql = `select * from usuario where tipo = 0 and codusuario = ${connection.escape(data)}`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    addTarjeta : (data, callback) => {

        if(connection) {
            let sql = `insert into tarjeta(numero,nombre,direccion,vencimiento,cvv,cliente) values (${connection.escape(data.numero)}, ${connection.escape(data.nombre)}, ${connection.escape(data.direccion)}, ${connection.escape(data.vencimiento)}, ${connection.escape(data.cvv)}, ${connection.escape(data.cliente)})`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message : 'tarjeta insertada'})
            })
        }
    },
    getTarjetas : (data, callback) => {
        if(connection) {
            let sql = `select * from tarjeta where cliente = ${connection.escape(data)}`
            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback(rows)
            })
        }
    },
    deleteTarjeta : (data, callback) => {
        if(connection) {
            let sql = `delete from tarjeta where codtarjeta = ${connection.escape(data)}`

            connection.query(sql, (error, rows) => {
                if(error) throw error
                callback({message: 'tarjeta eliminado'})
            })
        }
    }
}

module.exports = dataModels