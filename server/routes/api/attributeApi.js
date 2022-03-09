/**
 * 1.7. 分类参数管理
 */

var express = require('express');
var router = express.Router();
var sp_attributeModel = require('../../db/model/Sp_attributeModel');


// 查询所有的分类
// http://localhost:8888/attr/attributesAll
router.get('/attributesAll',function (req,res){
    sp_attributeModel.findAll({
        raw:true,
    }).then(result=>{
        res.json({
            data:result,
            "meta": {
                "msg": "获取成功",
                "status": 200
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})


/**
 * 1.7.1. 参数列表
 * http://localhost:8888/attr/categories/:id/attributes
 *
 */
router.get('/categories/:id/attributes',function (req,res){
    let nid = req.params.id;
    sp_attributeModel.findAll({
        raw:true,
        where:{
            cat_id:nid,
        }
    }).then(result=>{
        res.json({
            data:result,
            "meta": {
                "msg": "获取成功",
                "status": 200
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})

/**
 * 1.7.2. 添加动态参数或者静态属性
 * http://localhost:8888/attr/categories/:id/attributes
 */

router.post('/categories/:id/attributes',(req,res) => {

})


/**
 * 1.7.3. 删除参数
 * http://localhost:8888/attr/categories/:id/attributes/:attrid
 */
router.delete('/categories/:id/attributes/:attrid',(req,res) => {
    sp_attributeModel.destroy({
        where:{
            attr_id:req.params.attrid,
            cat_id:req.params.id,
        }
    }).then(result=>{
        res.json({
            "data": result,
            "meta": {
                "msg": "删除成功",
                "status": 200
            }
        })
    }).catch(err=>{
        console.log(err)
    })
})


/**
 * 1.7.4. 根据 ID 查询参数
 * http://localhost:8888/attr/categories/:id/attributes/:attrid
 */
router.get('/categories/:id/attributes/:attrid',(req,res) => {
    sp_attributeModel.findAll({
        where:{
            attr_id:req.params.attrid,
            cat_id:req.params.id,
        }
    }).then(result=>{
        res.json({
            data:result,
            "meta": {
                "msg": "获取成功",
                "status": 200
            }
        })
    })
})


/**
 * 1.7.5. 编辑提交参数
 * http://localhost:8888/attr/categories/:id/attributes/:attrid
 */
router.put('/categories/:id/attributes/:attrid',(req,res) => {
    sp_attributeModel.findOne({
        where:{
            attr_id:req.params.attrid,
            cat_id:req.params.id,
        }
    }).then(result => {
        result.update({
            attr_name:req.body.attr_name,
            attr_sel:req.body.attr_sel,
            attr_vals:req.body.attr_vals,
        }).then(sss => {
            res.json({
                data:sss,
                "meta": {
                    "msg": "更新成功",
                    "status": 200
                }
            })
        }).catch(err => {
            console.log(err);
        })
    })
})

module.exports = router;
