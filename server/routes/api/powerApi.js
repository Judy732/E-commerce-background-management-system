var express=require('express');
var router=express.Router();
var permission=require('../../db/model/PowerModel');

//http://localhost:8888/power/all
router.get('/all',function (req,res){
    let tree=[];
    permission.findAll({
        raw:true,
    }).then(result=>{
        let now=result;
        for(let i=0;i<now.length;i++){
            if(now[i].level===1){
                let obj={
                    value:now[i].authName,
                    label:now[i].authName,
                    children:[],

                };
                tree.push(obj);
                now.splice(i,1);
                i--;
            }
        }
        for(let j=0;j<now.length;j++){
            if(now[j].level===2){
                // let pid=now[j].pid;
                let obj={
                    value:now[j].authName,
                    label:now[j].authName,
                    children: []
                };
                if(now[j].pid===1){
                    tree[0].children.push(obj);
                    now.splice(j,1);
                    j--;
                }else{
                    tree[1].children.push(obj);
                    now.splice(j,1);
                    j--;
                }

            }
        }
        for(let q=0;q<now.length;q++){
            let obj={
                value:now[q].authName,
                label:now[q].authName,
            };
            let a=tree[0].children;
            let b=tree[1].children;
            if(now[q].pid===2){

                a[0].children.push(obj);
            }else if(now[q].pid===9){

                a[1].children.push(obj);
            }else if(now[q].pid===13){
                a[2].children.push(obj);
            }else{
                b[0].children.push(obj);
            }
        }
        res.json({
            data:tree,
            msg:'查询成功'
        })
    }).catch(err=>{
        console.log(err)
    })
});


//http://localhost:8888/power/allTable
router.get('/allTable',function (req,res){
    permission.findAll({
        raw:true,
    }).then(result=>{
        res.json({
            data:result,
            code:200,
            mag:'查询成功',
        })
    }).catch(err=>{
        console.log(err)
    })
});


// http://localhost:8888/power/selOne
router.post('/selOne',function (req,res){
    // console.log(req.body.value)
    let arr=req.body.value;
    let authName=arr[arr.length-1]
    console.log(authName)
    permission.findOne({
        where:{
            authName:authName,
        }
    }).then(result=>{
        res.json({
            data:[result],
            code:200,
            msg:'查询成功！'
        })
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
});


module.exports=router;
