const Sequelize = require('sequelize')
const db = require('../config/dbconfig')

const ReportModel3 = db.define('sp_report_3',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rp3_src: {
        type:Sequelize.STRING(127),
        allowNull:false
    },
    rp3_count: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    rp3_date: {
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = ReportModel3