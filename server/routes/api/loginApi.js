const express = require('express')
const router = express.Router()
//加密模块
const crypto = require('crypto')
//token模块
const jwt = require('jsonwebtoken')
const ManagerModel = require('../../db/model/ManagerModel')

//注册
//1.获取用户名和密码，对密码进行加密
//2.将用户名和密码保存到数据库中
//http://localhost:8888/api/register
router.post('/register',(req,res)=> {
    let name = req.body.username
    let pwd = req.body.password

    //对密码进行md5加密 生成十六进制字符串
    let md5 = crypto.createHash('md5')
    let newpwd = md5.update(pwd).digest('hex')

    //将用户名和加密后的密码保存到数据库中
    ManagerModel.create({
        mg_name:name,
        mg_pwd:newpwd
    }).then(result=> {
        res.json({
            code:201,
            msg:'注册成功'
        })
    }).catch(err=> {
        console.log(err)
        res.json({
            code:422,
            msg:'注册失败'
        })
    })
})

//登录
//1.获取用户名和密码，对密码进行加密
//2.查询数据得到用户对应的密码进行验证
//3.验证成功，生成token返回客户端；验证失败，返回信息
//http://localhost:8888/api/login
router.post('/login',(req,res)=> {
    let name = req.body.username
    let pwd = req.body.password

    //加密密码
    let md5 = crypto.createHash('md5')
    let newpwd = md5.update(pwd).digest('hex')

    //查询
    ManagerModel.findAll({
        where: {
            mg_name:name
        },
        raw:true
    }).then(result=>{
        //找到用户信息
        if(result.length!==0) {
            //密码相同
            if(result[0].mg_pwd === newpwd) {
                //生成token
                let token = jwt.sign(result[0],'yaocen',{
                    expiresIn:1440
                })

                res.json({
                    code:200,
                    msg:'登录成功',
                    token:token
                })
            }else {
                res.json({
                    code:422,
                    msg:'密码有误'
                })
            }
        }else {
            res.json({
                code:422,
                msg:'用户名有误'
            })
        }
    })
})

module.exports = router
