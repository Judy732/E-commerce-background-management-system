import {Button, Col, Form, Input, message, Row,Space} from "antd";
import './login.css'
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"
import Forget from "./forget";

function Login(props) {
    const bindLogin = React.useRef()
    let navigate = useNavigate()

    const login = async ()=> {
        await bindLogin.current.validateFields().then(value=> {
            fetch('http://localhost:8888/api/login',{
                method:'post',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:value.username,
                    password:value.password
                })
            }).then(res=> {
                //不是需要的数据
                return res.json()
            }).then(data=> {
                if(data.code === 200) {
                    sessionStorage.setItem('username',value.username)
                    sessionStorage.setItem('token',data.token)
                    navigate('/home')
                }else {
                    message.error(data.msg)
                }
            }).catch(err=> {
                console.log(err)
            })
        })
    }

    //是否显示重置密码框
    const [forget,setForget] = useState(false)

    //打开重置密码框
    const openForget = ()=> {
        setForget(true)
    }

    //关闭
    const closeForget = ()=> {
        setForget(false)
    }



    return (
        <>
            <Forget visible={forget} close={closeForget}/>

            <section className={'login'}>
                <h2 align={'center'}>用户登录</h2>
                <Form ref={bindLogin}>
                    <Form.Item name={'username'} label={'用户名'} rules={[{
                        required:true,
                        message:'用户名不能为空'
                    }]}>
                        <Input placeholder={'请输入用户名'}/>
                    </Form.Item>
                    <Form.Item name={'password'} label={'密码'} rules={[{
                        required:true,
                        message:'密码不能为空'
                    }]}>
                        <Input.Password placeholder={'请输入密码'}/>
                    </Form.Item>
                    <div align={'center'}>
                        <Space>
                            <Button type={'primary'} onClick={login}>登录</Button>
                            <Button type={'text'} size={'middle'} onClick={openForget}>忘记密码</Button>
                        </Space>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Login
