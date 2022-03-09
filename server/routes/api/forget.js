var express = require('express')
var router = express.Router()
const Email = require('../../email/config')
const ManagerModel = require('../../db/model/ManagerModel')
const crypto = require('crypto')

//发送验证码
//http://localhost:8888/forget/send
router.put('/send',(req,res)=> {
    let email = req.body.email
    let name = req.body.name
    let sendDate = new Date().getTime()
    // console.log(sendDate)

    ManagerModel.findAll({
        where:{
            mg_name: name
        }
    }).then(result=> {
        if(result.length>0) {
            //账号存在
            var mail = {
                //发件人
                from:'1721290586@qq.com',
                //主题
                subject:'我想以世纪和你在一起——验证码',
                //收件人
                to:email,
                //邮件内容
                text:Email.verify
            }
            var info = Email.transporter.sendMail(mail)
            if(info) {
                res.send({
                    msg:'验证码发送成功',
                    date:sendDate
                })
                ManagerModel.update({
                    code:mail.text
                },{
                    where:{
                        mg_name: name
                    }
                })
            }else {
                res.send({
                    msg:'验证码发送失败',
                    code:404
                })
            }
        }else {
            res.send({
                msg:'该用户不存在',
                code:4400
            })
        }
    })
})

//验证验证码
//http://localhost:8888/forget/try
router.post('/try',(req,res)=> {
    let name = req.body.mg_name
    let email = req.body.mg_email
    let identy = req.body.mg_code
    let pwd = req.body.mg_pwd

    let oldDate = req.body.oldDate
    let nowDate = new Date().getTime()

    //加密密码
    let md5 = crypto.createHash('md5')
    let newpwd = md5.update(pwd).digest('hex')

    ManagerModel.findAll({
        where: {
            mg_email:email
        }
    }).then(result=> {
        // console.log(result)
        if(result[0].code === identy && (nowDate-oldDate)<36000) {
            ManagerModel.update({
                mg_pwd:newpwd
            },{
                where:{
                    mg_name:name
                }
            }).then(result=> {
                res.send({
                    msg:'重置成功'
                })
            }).catch(err=> {
                console.log(err)
            })
        }
    }).catch(err=> {
        console.log(err)
    })
})

module.exports = router
