/**
 * 1.8. 商品管理
 */

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');



//使用上传中间件，需要安装：npm install connect-multiparty
const multiparty = require('connect-multiparty');
const multipartMiddleware = multiparty();


var Sp_goodsModel = require('../../db/model/Sp_goodsModel');
const Sp_categoryModel = require('../../db/model/Sp_categoryModel');
const Sp_goods_picsModel = require('../../db/model/Sp_goods_pics');


/**
 * 1.9. 图片上传
 * http://localhost:8888/goods/upload
 */
router.post('/upload',multipartMiddleware,(req,res)=> {
    console.log("上传文件名："+req.files.photoCotent.name)
    //上传图片参数
    var file = req.files.photoCotent;
    console.log(req.files);
    //定义上传文件的存放路径
    var des_file = path.join(__dirname,'../public/images')+"\\"+file.originalFilename
    console.log(des_file) //上传路径：des_file
    console.log(file.path) //临时文件路径：file.path
    //将文件存入本地服务器文件中
    fs.readFile(file.path,function (err,data){
        fs.writeFile(des_file,data,function(err){
            if(err){
                console.log(err)
                res.json({code:1});
                return
            }
        })
    })
    //将图片存放地址返回
    res.send({
        code: 0,
        imgPath: `http://localhost:8888/images/${file.originalFilename}` //网络访问时public目录不能出现，public是虚拟目录
    });
})





/**
 * 1.8.1. 商品列表数据：
 * http://localhost:8888/goods/goods
 */
router.get('/goods',function (req,res){
    Sp_goodsModel.findAll({
        raw:true,
    }).then(result=>{
        res.json({
            'data':result,
            "meta": {
                "msg": "获取成功",
                "status": 200
            }

        })
    }).catch(err=>{
        console.log(err)
    })
});




/**
 * 1.8.2. 添加商品
 * http://localhost:8888/goods/goods
 */

router.post('/goods',(req,res) => {
    let goods = req.body.goods;
    console.log('返回的数据------------',goods);


    Sp_goodsModel.create({
        goods_name: goods.goods_name,
        goods_price: goods.goods_price,
        goods_number: goods.goods_number,
        goods_weight: goods.goods_weight,
        add_time: new Date(),
        hot_number: 0,
        is_promote: goods.is_promote === false ? 0 : 1,
        goods_state: goods.goods_state,
        goods_introduce: goods.goods_introduce,

        goods_big_logo: goods.goods_big_logo,
    }).then(result => {
        console.log(result)
        Sp_goods_picsModel.create({
            goods_id: result.goods_id,
            pics_big: goods.goods_big_logo,
        })
        console.log(result);
        res.json({
            'data':result,
            'meta': {
                'msg': '商品添加成功',
                'status': 201,
            }
        })
    }).catch(err => {
        console.log(err);
    })


})


/**
 * 1.8.3. 根据 ID 查询商品
 * http://localhost:8888/goods/goods/:id
 */
router.get('/goods/:id',function (req,res){
    Sp_goodsModel.findAll({
        where:{
            goods_id:req.params.id,
        }
    }).then(result=>{
        res.json({
            'data': result,
            "meta": {
                "msg": "创建商品成功",
                "status": 201
            }
        })
    }).catch(err=>{
        console.log(err)
    })
});


/**
 * 1.8.4. 编辑提交商品
 * http://localhost:8888/goods/goods/:id
 */
router.put('/goods/:id',function (req,res){
    Sp_goodsModel.findOne({
        where:{
            goods_id: req.params.id,
        },
    }).then( result1 => {
        let goods = req.body.goods;
        result1.update({
            goods_name: goods.goods_name,
            goods_price: goods.goods_price,
            goods_number: goods.goods_number,
            good_weight: goods.goods_weight,
            goods_introduce: goods.goods_introduce,
            upd_time: new Date(),
            is_promote: goods.is_promote === false ? 0 : 1,
            goods_state: goods.goods_state
        }).then(result=>{
            res.json({
                data:result,
                "meta": {
                    "msg": "更新商品成功",
                    "status": 201
                }
            })
        }).catch(err => {
            console.log(err);
        })
    })
});


/**
 * 1.8.5. 删除商品
 * http://localhost:8888/goods/goods/:id
 */
router.delete('/goods/:id',function (req,res){
    Sp_goodsModel.destroy({
        where:{
            goods_id:req.params.id,
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
});


/**
 * 同步商品图片
 * http://localhost:8888/goods/goods/:id/pics
 */

router.put('/goods/:id/pics',(req,res) => {

})


/**
 * 同步商品属性
 * http://localhost:8888/goods/goods/:id/attributes
 */

router.put('/goods/:id/attributes',function (req,res){

});

module.exports = router;
