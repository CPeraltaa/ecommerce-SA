'use strict'

const route = require('express').Router()
const { getProducts, getInfoClient, addTarjeta, getTarjetas, deleteTarjeta} = require('../controllers/clientes.controller')

route.route('/cliente/listarProductos').get(getProducts)

route.route('/cliente/infoCliente/:id').get(getInfoClient)

route.route('/cliente/addTarjeta').post(addTarjeta)

route.route('/cliente/getTarjetas/:id').get(getTarjetas)

route.route('/cliente/deleteTarjeta/:id').delete(deleteTarjeta)


module.exports = route