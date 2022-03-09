const Sequelize = require('sequelize')
const db = require('../config/dbconfig')
const OrderModel = require('./OrderModel')

const PermissionModel = db.define('sp_permission',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ps_id: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    ps_api_service: {
        type:Sequelize.STRING(255),
        allowNull:false
    },
    ps_api_action: {
        type:Sequelize.STRING(255),
        allowNull:false
    },
    ps_api_path: {
        type:Sequelize.STRING(255),
        allowNull:false
    },
    ps_api_order: {
        type:Sequelize.STRING(255),
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

// PermissionModel.belongsTo(OrderModel,{
//     foreignKey:'ps_id',
// })

module.exports = PermissionModel