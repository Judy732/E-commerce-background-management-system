const express = require('express')
const router = express.Router()
const ManagerModel = require('../../db/model/ManagerModel')
const crypto = require('crypto')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//查询用户数据
//http://localhost:8888/users/search
router.get('/search',(req,res)=> {
    ManagerModel.findAll().then(result=> {
        res.json({
            data:result,
            meta: {
                msg:'获取成功',
                status:200
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

//添加用户
//http://localhost:8888/users/add
router.post('/add',(req,res)=> {
    //获取时间的小时和分钟有点问题
    let today = new Date().toLocaleString()

    //对密码进行加密
    let pwd = req.body.user.pwd
    let md5 = crypto.createHash('md5')
    let newpwd = md5.update(pwd).digest('hex')


    ManagerModel.create({
        mg_name:req.body.user.name,
        mg_pwd:newpwd,
        mg_time:today,
        role_id:req.body.user.roleid,
        mg_email:req.body.user.email,
        mg_mobile:req.body.user.mobile,
        // 状态的初始值都为0
        mg_state:0
    }).then(result=>{
        res.json({
            meta:{
                msg:'用户创建成功',
                status:201,
                code:Math.ceil(Math.random()*10000)
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

//修改用户状态
//http://localhost:8888/users/update
router.put('/update',(req,res)=> {
    console.log(req.body.data)
    let name = req.body.data.username
    let state = req.body.data.state
    ManagerModel.update({
        mg_state:state === 0?1:0
    },{
        where:{
            mg_name: name
        }
    }).then(result=> {
        res.json({
            meta:{
                msg:'修改用户状态成功',
                status:200,
                code:Math.ceil(Math.random()*10000)
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

//根据name查询用户信息 模糊查询
//http://localhost:8888/users/searchName
router.post('/searchName',(req,res)=> {
    console.log(req.body.name)
    let name = req.body.name
    ManagerModel.findAll({
        where: {
            mg_name: {
                [Op.like]:`%${name}%`
            }
        }
    }).then(result=> {
        res.json({
            data:result,
            meta: {
                msg:'查询成功',
                status:200
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

//修改用户信息
//http://localhost:8888/users/updateAll
router.put('/updateAll',(req,res)=> {
    ManagerModel.update({
        role_id:req.body.user.roleid,
        mg_mobile:req.body.user.mobile,
        mg_email:req.body.user.email,
    },{
        where: {
            mg_name:req.body.name
        }
    }).then(result=> {
        res.json({
            meta: {
                msg:'更新成功',
                status:200,
                code:Math.ceil(Math.random()*10000)
            }
        })
    }).catch(err=> {
        console.log(err)
    })
})

//删除用户
//http://localhost:8888/users/delete
router.delete('/delete',(req,res)=> {
    ManagerModel.destroy({
        where: {
            mg_name:req.body.username
        }
    }).then(result=> {
        res.json({
            msg:'删除成功',
            status:200,
            code:Math.ceil(Math.random()*10000)
        })
    }).catch(err=> {
        console.log(req.body)
        console.log(err)
    })
})

module.exports = router
