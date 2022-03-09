/**
 * sp_goods对应的模型
 * goods.js里面使用
 */

var Sequelize = require('sequelize');
var DB = require('../config/dbconfig');
const Sp_categoryModel = require('../model/Sp_categoryModel');


const Sp_goodsModel = DB.define('sp_goods',{
    goods_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    goods_name:{
        type:Sequelize.STRING(255),
        allowNull:false,
    },
    goods_price:{
        type:Sequelize.DECIMAL(10),
        allowNull: false,
    },
    goods_number:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    goods_weight:{
        type:Sequelize.DECIMAL(10),
        allowNull:false,
    },
    add_time:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    upd_time:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    hot_number:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    cat_id:{
        type:Sequelize.INTEGER,
        allowNull: true
    },
    is_promote:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    goods_introduce:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    goods_state:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    goods_big_logo: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }
},{
    freezeTableName: true,
    timestamps: false
})

Sp_goodsModel.belongsTo(Sp_categoryModel,{foreignKey:'cat_id',targetKey:'cat_id'})
module.exports=Sp_goodsModel;
