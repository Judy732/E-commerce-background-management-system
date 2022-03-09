import {Form, Input, Button, Modal, message} from "antd";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Draggable from "react-draggable";


function Forget(props) {
    //绑定重置密码表
    const bindForget = React.createRef()

    //获取用户名和邮箱发邮件验证
    const email = React.createRef()
    const name = React.createRef()
    const pwd = React.createRef()
    const code = React.createRef()

    const [date,setDate] = useState()

    //发送邮件
    const sendEmail = async ()=> {
        // console.log(name.current.state.value)
        await axios.put('http://localhost:8888/forget/send',{email:email.current.state.value,name:name.current.state.value}).then(result=> {
            message.success(result.data.msg)
            console.log(result.data.date)
            setDate(result.data.date)
        })
        getChange()
    }

    //倒计时
    //定时器
    let timeChange = useRef(null)
    const [time,setTime] = useState(60)
    const [btnDisabled,setBtnDisabled] = useState(false)
    const [btnContent,setBtnContent] = useState('获取验证码')

    useEffect(()=> {
        // console.log(time,timeChange.current)
        if(time>0 && time<60) {
            setBtnContent(`${time}s后重发`)
        }else if(time === 0) {
            clearInterval(timeChange.current)
            setBtnDisabled(false)
            setTime(60)
            setBtnContent('获取验证码')
        }
    },[time])

    useEffect(()=> {
        return ()=> {clearInterval(timeChange.current)}
    },[])

    const getChange = ()=> {
        setBtnDisabled(true)
        timeChange.current = setInterval(()=> {
            setTime((time)=> time-1)
        },1000)
    }

    //提示框移动
    //modal是否可以移动
    const [disabled,setDisabled] = useState(true)
    //modal拖拽的方向
    const [bounds,setBounds] = useState({left:0,top:0,bottom:0,right:0})
    //和可以拖拽组件Draggable进行绑定
    const draggableRef = React.createRef()
    const onStart = (event,uiDate)=> {
        //获取浏览器窗口的高度宽度
        const {clientWidth,clientHeight} = window.document.documentElement
        //获取modal的外div
        const targetReact = draggableRef.current.getBoundingClientRect()
        setBounds({
            bounds:{
                left:-targetReact.left + uiDate.x,
                right:clientWidth-(targetReact.right-uiDate.x),
                top:-targetReact.top + uiDate.y,
                bottom:clientHeight - (targetReact.bottom - uiDate.y)
            }
        })
    }


    return (
        <>
            <Modal
                title={
                    <div style={{
                        width:'100%',
                        cursor:'move'
                    }}
                         onMouseMove={()=> {
                             if(disabled) {
                                 setDisabled(false)
                             }
                         }}
                         onMouseOut={()=> {
                             if(disabled) {
                                 setDisabled(true)
                             }
                         }}
                    >
                        重置密码
                    </div>
                }
                visible={props.visible}
                cancelText={'取消'}
                onCancel={props.close}
                okText={'提交'}
                destroyOnClose
                onOk={async ()=> {
                    clearInterval(timeChange.current)
                    // console.log(bindForget.current.state)
                    console.log(name.current.state)
                    console.log(email.current.state)
                    console.log(code.current.state)
                    console.log(pwd.current.state)
                    await axios.post('http://localhost:8888/forget/try',{mg_name:name.current.state.value,mg_email:email.current.state.value,mg_code:code.current.state.value,mg_pwd:pwd.current.state.value,oldDate:date}).then(result=> {
                        props.close()
                        message.success(result.data.msg)
                    })
                    }
                }
                modalRender = {(modal)=> (
                    <Draggable disabled={disabled} bounds={bounds} onStart={(event,uiDate)=> onStart(event,uiDate)}>
                        <div ref={draggableRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <Form ref={bindForget}>
                    <Form.Item label={'用户名'} name={'mg_name'}>
                        <Input style={{width:'94%'}} ref={name}/>
                    </Form.Item>
                    <Form.Item label={'邮箱'} name={'mg_email'}>
                        <Input.Group compact>
                            <Input style={{width:'70%'}} ref={email}/>
                            <Button onClick={()=>sendEmail()} disabled={btnDisabled}>
                                {btnContent}
                            </Button>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label={'验证码'} name={'mg_code'}>
                        <Input.Group>
                            <Input type={'password'} style={{width:'50%'}} ref={code} rules={[{
                                require:true,
                                pattern:/^\d{4}$/,
                                message:'验证码有误'
                            }]}/>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item label={'新密码'} name={'mg_pwd'}>
                        <Input style={{width:'94%'}} ref={pwd}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Forget
