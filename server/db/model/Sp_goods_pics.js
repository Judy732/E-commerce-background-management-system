var Sequelize = require('sequelize');
var DB = require('../config/dbconfig');


const Sp_goods_picsModel = DB.define('sp_goods_pics',{
    pics_id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    goods_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pics_big :{
        type:Sequelize.INTEGER,
        allowNull:false,
    }},{
    freezeTableName:true,
    timestamps:false
})

module.exports = Sp_goods_picsModel;
