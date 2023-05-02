require('dotenv').config();
const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    })

sequelize.authenticate()
    .then(() => console.log("Conectado no Mysql!"))
    .catch(error => console.log(error))
module.exports = sequelize
