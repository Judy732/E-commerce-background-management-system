const Sequelize = require('sequelize')
const db = require('../../db/config/dbconfig')

const ReportModel2 = db.define('sp_report_2',{
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    rp2_page: {
        type:Sequelize.STRING(255),
        allowNull:false
    },
    rp2_count: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    rp2_date: {
        type:Sequelize.DATE,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = ReportModel2