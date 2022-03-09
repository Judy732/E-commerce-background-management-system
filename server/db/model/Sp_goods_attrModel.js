/**
 * sp_goods_attr表对应的模型
 */
var Sequelize=require('sequelize');
var DB=require('../config/dbconfig');

const Sp_good_attrModel = DB.define('sp_goods_attr',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    goods_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    attr_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    attr_value:{
        type:Sequelize.TEXT,

    },
    add_price:{
        type:Sequelize.DECIMAL(8,2),
    }

},{
    freezeTableName: true,
    timestamps: false
});


module.exports = Sp_good_attrModel;
