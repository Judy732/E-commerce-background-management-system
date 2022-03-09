const Sequelize = require('sequelize')
const db = require('../config/dbconfig')

const ManagerModel = db.define('sp_manager',{
    mg_id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    mg_name: {
        type: Sequelize.STRING(32),
        allowNull:false
    },
    mg_pwd: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    mg_time: {
        type: Sequelize.DATE,
        allowNull:false
    },
    role_id: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    mg_mobile: {
        type: Sequelize.STRING(32),
        allowNull:true
    },
    mg_email: {
        type:Sequelize.STRING(64),
        allowNull:true
    },
    mg_state: {
        type:Sequelize.INTEGER,
        allowNull:true
    },
    code: {
        type:Sequelize.STRING(255),
        allowNull:true
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = ManagerModel
