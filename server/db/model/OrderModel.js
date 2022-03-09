const Sequelize = require('sequelize')
const db = require('../config/dbconfig')

const OrderModel = db.define('sp_order',{
    order_id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:false
    },
    order_number: {
        type:Sequelize.STRING(32),
        allowNull:false
    },
    order_price: {
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
    },
    order_pay: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    is_send: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    trade_no: {
        type:Sequelize.STRING(32),
        allowNull:false
    },
    order_fapiao_title: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    order_fapiao_company: {
        type:Sequelize.STRING(32),
        allowNull:false
    },
    order_fapiao_content:{
        type:Sequelize.STRING(32),
        allowNull:false
    },
    consignee_addr: {
        type:Sequelize.TEXT,
        allowNull:true
    },
    pay_status: {
        type:Sequelize.INTEGER,
        allowNull:true
    },
    create_time: {
        type:Sequelize.DATE,
        allowNull:true
    },
    update_time: {
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})


module.exports = OrderModel