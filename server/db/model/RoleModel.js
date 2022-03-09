/**
 * sp_role表对应的模型
 *  roles.js里面使用
 */

const Sequelize = require('sequelize');
const DB = require('../../db/config/dbconfig');


const Sp_roleModel = DB.define('sp_role',{
    roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id',
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: Sequelize.STRING(20),
        field: 'role_name',
        allowNull: false,
    },
    psIds: {
        type: Sequelize.INTEGER,
        field: 'ps_ids',
        allowNull: true,
    },
    roleDesc: {
        type: Sequelize.TEXT,
        field: 'role_desc',
        allowNull: true,
    },

},{
    freezeTableName: true,
    timestamps: false,
})


module.exports = Sp_roleModel
