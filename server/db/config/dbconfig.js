const Sequelize = require('sequelize')

var db = new Sequelize('system','root','200173',{
    port:3306,
    dialect:'mysql',
    pool: {
        max:20,
        min:3,
        idle:100000
    }
})

module.exports = db