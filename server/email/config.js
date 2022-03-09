const nodemailer = require('nodemailer')

var Email = {
    config:{
        host: 'smtp.qq.com',
        port:587,
        auth: {
            user:'1721290586@qq.com',
            pass:'zyhefwxmvuaqfdfe'
        }
    },
    //获得config对象
    get transporter() {
        return nodemailer.createTransport(this.config)
    },
    get verify() {
        return Math.random().toString().substring(2,6)
    },
    get time() {
        return Date.now
    }
}

module.exports=Email
