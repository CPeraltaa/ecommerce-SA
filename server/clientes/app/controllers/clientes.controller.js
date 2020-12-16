'use strict'

const dataModels = require('../models/clientes.model')
const connection = require('../../config/connection')

async function getProducts(req, res) {
    dataModels.getProducts((data, error) => {
        // 404 500
        res.json(data)
    })
}

function getInfoClient(req, res) {
    console.log("id : ", req.params)
    const { id } = req.params
    dataModels.getInfoClient(id, (data, error) => {
        res.json(data)
    })
}

function addTarjeta (req, res) {
    const {numero,nombre,direccion,vencimiento,cvv,cliente} =  req.body
    console.log(`tarjeta : ${nombre}, ${numero}`)
    dataModels.addTarjeta({numero,nombre,direccion,vencimiento,cvv,cliente}, (data, error) => {
        res.json(data)
    })
}

function getTarjetas(req, res) {
    const { id } = req.params
    dataModels.getTarjetas(id, (data, error) => {
        res.json(data)
    })
}

function deleteTarjeta(req, res) {
    const { id } = req.params
    dataModels.deleteTarjeta(id, (data, error) => {
        res.json(data)
    })

}
module.exports = {
    getProducts,
    getInfoClient,
    addTarjeta,
    getTarjetas,
    deleteTarjeta
}