/**
 * sp_attribute对应的模型
 * attribute.js里面使用
 */

var Sequelize = require('sequelize');
var DB = require('../config/dbconfig');
var sp_categoryModel = require('./Sp_categoryModel');

const sp_attributeModel = DB.define('sp_attribute',{
    attr_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    attr_name:{
        type:Sequelize.STRING(32),
        allowNull:false,
    },
    cat_id:{    //外键
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
            model:sp_categoryModel,
            key:'cat_id',
        }
    },
    attr_sel:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    attr_write:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    attr_vals:{
        type:Sequelize.TEXT,
        allowNull:false
    }},{
    freezeTableName:true,
    timestamps:false
})

module.exports = sp_attributeModel;
