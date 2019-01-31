var sequelize = require('sequelize');
var config = require('./connection_string.json')
config = config.local;
var sequelize = new sequelize(config.database, config.username, config.password,
{
    dialect: "mysql",
    host:config.host,
    logging: false
})

sequelize.sync({force:false})
module.exports = sequelize

