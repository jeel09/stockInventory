var Sequelize = require('sequelize')
var productTable = require('../datasource/db_config')

let productTableObj = productTable.define('tbl_products',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    price:Sequelize.STRING,
    quantity:Sequelize.STRING
})

module.exports = productTableObj;
