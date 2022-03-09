const Sequelize = require('sequelize')
const db = require('../config/dbconfig')
const PermissionModel = require('./PermissionModel')

const PowerModel = db.define('sp_permission',{
    id: {
        type:Sequelize.INTEGER,
        field:'ps_id',
        primaryKey:true,
        autoIncrement:true
    },
    authName: {
        type:Sequelize.STRING(255),
        field: 'ps_name',
        allowNull:false
    },
    pid: {
        type:Sequelize.INTEGER,
        field:'ps_id',
        allowNull: false
    },
    ps_c: {
        type:Sequelize.STRING(32),
        allowNull:false
    },
    ps_a: {
        type:Sequelize.STRING(32),
        allowNull:false
    },
    level: {
        type:Sequelize.INTEGER,
        field:'ps_level',
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

// PowerModel.hasMany(PermissionModel)

module.exports = PowerModel
