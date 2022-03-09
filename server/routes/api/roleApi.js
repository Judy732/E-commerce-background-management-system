/**
 * 1.5. 角色管理
 */

var express = require('express');
var router = express.Router();
var Sp_roleModel = require('../../db/model/RoleModel');

/**
 *
 * 1.5.1. 角色列表：http://localhost:8888/role/roles
 */

router.get('/roles', function(req, res, next) {
    Sp_roleModel.findAll({
        raw: true,
    }).then(result => {
        res.json({
            'data': result,
            'meta': {
                'msg': '获取成功',
                'status': 200
            }
        })
    })
});

/**
 * 1.5.2. 添加角色：http://localhost:8888/role/roles
 */
router.post('/roles',(req,res) => {
    let value = req.body.value;
    Sp_roleModel.create({
        roleName: value.roleName,
        roleDesc: value.roleDesc,
    }).then(result => {
        res.json({
            'data': {
                'roleId': result.roleId,
                'roleName': result.roleName,
                'roleDesc': result.roleDesc
            }
        })
    }).catch(err=> {
        console.log(err);
    })
})



/**
 * 1.5.3. 根据 ID 查询角色：http://localhost:8888/role/roles/:id
 */

router.get('/roles/:id',(req,res) => {
    Sp_roleModel.findOne({
        where: {
            roleId: req.params.id
        }
    }).then(result => {
        res.json({
            'data': result,
            'mats': {
                'msg': '获取成功',
                'status': 200
            }
        })
    })
})


/**
 * 根据id返回指定角色权限:http://localhost:8888/role/roles/:id/quan
 */

router.get('/roles/:id/quan',(req,res) => {
    Sp_roleModel.findOne({
        where: {
            roleId: req.params.id
        }
    }).then(result => {
        let str = result.psIds;
        let quanArr = [];
        quanArr.push(str);

        res.json({
            data: quanArr
        })

    })
})


/**
 * 1.5.4. 编辑提交角色：http://localhost:8888/role/roles/:id
 */

router.put('/roles/:id',(req,res) => {
    let role = req.body.role
    Sp_roleModel.findOne({
        where: {
            roleId: req.params.id,
        }
    }).then(result => {
        result.update({
            roleName: role.roleName,
            roleDesc: role.roleDesc
        }).then(sss => {
            res.json({
                'data': sss,
                'meta': {
                    'msg': '获取成功',
                    'status': 200
                }
            })
        })
    })
})

/**
 * 1.5.5. 删除角色：http://localhost:8888/role/roles/:id
 */
router.delete('/roles/:id',(req,res) => {
    Sp_roleModel.destroy({
        where: {
            roleId: req.params.id
        }
    }).then(result => {
        res.json({
            'data': null,
            'meta': {
                'msg': '删除成功',
                'status': 200
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

/**
 * 1.5.6. 角色授权：http://localhost:8888/role/roles/:roleId/rights
 */
router.post('/roles/:roleId/rights',(req,res) => {
    Sp_roleModel.findOne({
        where: {
            roleId: req.params.roleId,
        }
    }).then(result => {
        result.update({
            psIds: req.body.arr
        }).then(sss => {
            res.json({
                'data': sss,
                'meta': {
                    'msg': '角色授权成功',
                    'status': 200
                }
            })
        })
    })



})


/**
 * 1.5.7. 删除角色指定权限：http://localhost:8888/role/roles/:roleId/rights/:rightId
 */

router.delete('/roles/:roleId/rights/:rightId',(req,res) => {


})


module.exports = router;
