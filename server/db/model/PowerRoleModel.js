const Sequelize = require('sequelize')
const db = require('../config/dbconfig')

const PowerRoleModel = db.define('sp_role',{
    role_id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    role_name: {
        type:Sequelize.STRING(20),
        allowNull:false
    },
    ps_ids: {
        type:Sequelize.STRING(255),
        allowNull: false
    },
    ps_ca: {
        type:Sequelize.TEXT,
        allowNull:true
    },
    role_desc: {
        type:Sequelize.TEXT,
        allowNull:true
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = PowerRoleModel