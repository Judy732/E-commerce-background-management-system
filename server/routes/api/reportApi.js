const express = require('express')
const router = express.Router()
const ReportModel1 = require('../../db/model/ReportModel1')
const ReportModel2 = require('../../db/model/ReportModel2')
const ReportModel3 = require('../../db/model/ReportModel3')

//对应sp_report_1
//http://localhost:8888/report/type1
router.get('/type1',(req,res)=> {
    ReportModel1.findAll({
        raw:true
    }).then(result=> {
        let hbData = [],hbPer=0;
        let hdData=[],hdPer=0;
        let qtData=[],qtPer=0;
        let hnData=[],hnPer=0;
        let xbData=[],xbPer=0;
        let data1=[];
        for(let i=0;i<result.length;i++) {
            if(result[i].rp1_area==='华北'){
                hbData.push(result[i].rp1_user_count)
                hbPer=hbPer+result[i].rp1_user_count
            }else if(result[i].rp1_area==='华东') {
                hdData.push(result[i].rp1_user_count)
                hdPer=hdPer+result[i].rp1_user_count
            }else if(result[i].rp1_area==='华南') {
                hnData.push(result[i].rp1_user_count)
                hnPer=hnPer+result[i].rp1_user_count
            }else if(result[i].rp1_area==='西部'){
                xbData.push(result[i].rp1_user_count)
                xbPer=xbPer+result[i].rp1_user_count
            }else {
                qtData.push(result[i].rp1_user_count)
                qtPer=qtPer+result[i].rp1_user_count
            }

        }
        let obj1={value:hdPer,name:'华东'}
        data1.push(obj1)
        let obj2={value:hbPer,name:'华北'}
        data1.push(obj2)
        let obj3={value:hnPer,name:'华南'}
        data1.push(obj3)
        let obj4={value:qtPer,name:'其他'}
        data1.push(obj4)
        let obj5={value:xbPer,name:'西部'}
        data1.push(obj5)


        res.json({
            data:{
                hdData:hdData,
                hbData:hbData,
                qtData:qtData,
                hnData:hnData,
                xbData:xbData,
            },
            data1:data1
        })
    }).catch(err=>{
        console.log(err);
    })
})

//对应sp_report_2
//http://localhost:8888/report/type2
router.get('/type2',(req,res)=> {
    ReportModel2.findAll({
        raw:true
    }).then(result=> {
        let oneData = [],onePer=0;
        let twoData=[],twoPer=0;
        let threeData=[],threePer=0;
        let fourData=[],fourPer=0;
        let data=[];

        for(let i=0;i<result.length;i++) {
            if(result[i].rp2_page==='牛奶'){
                oneData.push(result[i].rp2_count)
                onePer=onePer+result[i].rp2_count
            }else if(result[i].rp2_page==='坚果') {
                twoData.push(result[i].rp2_count)
                twoPer=twoPer+result[i].rp2_count
            }else if(result[i].rp2_page==='巧克力') {
                threeData.push(result[i].rp2_count)
                threePer=threePer+result[i].rp2_count
            }else if(result[i].rp2_page==='花生糖'){
                fourData.push(result[i].rp2_count)
                fourPer=fourPer+result[i].rp2_count
            }

        }
        let obj1={value:onePer,name:'牛奶'}
        console.log(obj1)
        data.push(obj1)
        let obj2={value:twoPer,name:'坚果'}
        data.push(obj2)
        let obj3={value:threePer,name:'巧克力'}
        data.push(obj3)
        let obj4={value:fourPer,name:'花生糖'}
        data.push(obj4)


        res.json({
            dataAll:{
                oneData:oneData,
                twoData:twoData,
                threeData:threeData,
                fourData:fourData,
            },
            data:data
        })
    }).catch(err=>{
        console.log(err);
    })
})

//对应sp_report_3
//http://localhost:8888/report/type3
router.get('/type3',(req,res)=> {
    ReportModel3.findAll({
        raw:true
    }).then(result=> {
        let from_count = []
        for(let i=0;i<result.length;i++) {
            from_count.push(result[i].rp3_count)
        }

        res.json({
            data:from_count
        })
    })
})

module.exports = router;
