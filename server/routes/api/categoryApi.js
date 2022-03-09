/**
 * 1.6. 商品分类管理
 */
var express = require('express');
var router = express.Router();

var Sp_categoryModel = require('../../db/model/Sp_categoryModel');
const Sp_goodsModel = require('../../db/model/Sp_goodsModel');


/**
 * 1.6.1. 商品分类数据列表：
 * http://localhost:8888/cate/categories
 */
router.get('/categories', async function(req, res) {
    const result = await findLvel(0)

    for(let i=0;i<result.length;i++) {
        result[i].key = i+1;
        result[i].children = await findPid(result[i].cat_id);
    }


    for(let i=0;i<result.length;i++) {
        for(let j=0;j<result[i].children.length;j++) {
            result[i].children[j].key = (i+1)+''+ (j+1);
            result[i].children[j].children = await findPid(result[i].children[j].cat_id);
        }
    }


    for(let i=0;i<result.length;i++) {
        for(let j=0;j<result[i].children.length;j++) {
            for(let k=0;k<result[i].children[j].children.length;k++) {
                result[i].children[j].children[k].key = (i+1)+''+ (j+1)+''+(k+1);
            }
        }
    }


    res.json({
        'data': result,
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    })
});


const findLvel = (level) => {
    return new Promise(function(resolve, reject){
        Sp_categoryModel.findAll({
            where: {
                cat_level: level
            },
            raw: true,
        }).then(result => {
            resolve(result);
        })
    })
}

const findPid = (pid) => {
    return new Promise(function(resolve,reject) {
        Sp_categoryModel.findAll({
            where: {
                cat_pid: pid
            },
            raw: true
        }).then(result => {
            resolve(result);
        })
    })
}



/**
 * 查询某级分类中的所有分类
 * http://localhost:8888/cate/categories/:level
 */

router.get('/categories/:level',(req,res) => {
    Sp_categoryModel.findAll({
        where: {
            cat_level: req.params.level
        },
        raw: true
    }).then(result => {
        res.json({
            'data': result
        })
    })
})









/**
 *
 * 1.6.2. 添加分类:http://localhost:8888/cate/categories
 */
router.post('/categories',(req,res) => {
    let category = req.body.category
    Sp_categoryModel.create({
        cat_name: category.cat_name,
        cat_pid: category.cat_pid,
        cat_level: category.cat_level,
        cat_deleted: 0,
        cat_icon: category.cat_icon,
        cat_src: category.cat_src
    }).then(result => {
        res.json({
            'data': {
                'cat_id': result.cat_id,
                'cat_name': result.cat_name,
                'cat_pid': result.cat_pid,
                'cat_level': result.cat_level,
            },
            'meta': {
                'msg': '创建成功',
                'status': 201
            }
        })
    })
})



/**
 * 1.6.3. 根据 id 查询分类:http://localhost:8888/cate/categories/:id
 */
router.get('/categories/:id',(req,res) => {
    Sp_categoryModel.findOne({
        where: {
            cat_id:req.params.id,
        },
        raw: true
    }).then(result => {
        res.json({
            'data': {
                'cat_id': result.cat_id,
                'cat_name': result.cat_name,
                'cat_pid': result.cat_pid,
                'cat_level': result.cat_level,
            },
            'meta': {
                'msg': '获取成功',
                'status': 200
            }
        })
    }).catch(err => {
        console.log(err);
    })
})



/**
 * 1.6.4. 编辑提交分类:http://localhost:8888/cate/categories/:id
 */
router.put('/categories/:id',(req,res) => {
    let category = req.body.category
    Sp_categoryModel.findOne({
        where: {
            cat_id: req.params.id,
        }
    }).then(result => {
        result.update({
            cat_name: category.cat_name,
            cat_icon: category.cat_icon,
            cat_src: category.cat_src
        }).then(sss => {
            res.json({
                'data': {
                    'cat_id': sss.cat_id,
                    'cat_name': sss.cat_name,
                    'cat_pid': sss.cat_pid,
                    'cat_level': sss.cat_level
                },
                'meta': {
                    'msg': '更新成功',
                    'status': 200
                }
            })
        })
    })
})


/**
 * 1.6.5. 删除分类:http://localhost:8888/cate/categories/:id
 */

router.delete('/categories/:id',(req,res) => {
    Sp_categoryModel.findOne({
        where: {
            cat_id: req.params.id,
        }
    }).then (result => {
        result.update({
            cat_deleted: 1
        }).then(ssss => {
            res.json({
                'data': null,
                'meta': {
                    'msg': '删除成功',
                    'status': 200
                }
            })
        })
    })
})



module.exports = router;
