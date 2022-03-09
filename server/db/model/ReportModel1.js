const Sequelize = require('sequelize')
const db = require('../config/dbconfig')

const ReportModel1 = db.define('sp_report_1',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rp1_user_count: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    rp1_area: {
        type:Sequelize.STRING(128),
        allowNull: false
    },
    rp1_date: {
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = ReportModel1