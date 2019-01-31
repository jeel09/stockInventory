var Sequelize = require('sequelize');
const userTable = require('../datasource/db_config')
var bcrypt = require('bcrypt-nodejs');

let userTableObj = userTable.define('tbl_users',{
    id:
    {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING
})

userTableObj.hashPassword = function(password){
    return bcrypt.hashSync(password)
}

userTableObj.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = userTableObj ;