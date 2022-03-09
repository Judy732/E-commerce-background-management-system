import {Form, Input, Modal, Radio, message} from "antd";
import React, {useState} from "react";
import axios from "axios";
import Draggable from 'react-draggable'

function AddUser(props) {
    //绑定表单
    const bindAddUser = React.createRef()

    //提交表单数据
    const submitAddUser = async function() {
        await bindAddUser.current.validateFields().then(value=> {
            axios.post('http://localhost:8888/users/add',{user:value}).then(result=> {
                props.close()
                props.modifyCode(result.data.meta.code)
                message.success(result.data.meta.msg)
            })
        })
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
                        添加信息
                    </div>
                }
                cancelText='取消'
                centered
                destroyOnClose='true'
                okText='提交'
                // title='添加用户'
                visible={props.visible}
                onOk = {submitAddUser}
                onCancel={()=> {
                    props.close()
                }}
                modalRender = {(modal)=> (
                    <Draggable disabled={disabled} bounds={bounds} onStart={(event,uiDate)=> onStart(event,uiDate)}>
                        <div ref={draggableRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <Form ref={bindAddUser}>
                    <Form.Item name='name' label='姓名' hasFeedback rules={[{required:true,message:'用户名不能为空'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='pwd' label='密码' hasFeedback rules={[{required:true,message:'密码不能为空'}]}>
                        <Input type='password'/>
                    </Form.Item>
                    <Form.Item name='roleid' label='角色' hasFeedback rules={[{required:true,message:'选项不能为空'}]}>
                        <Radio.Group>
                            <Radio value={1}>管理员</Radio>
                            <Radio value={2}>超级管理员</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name='mobile' label='&nbsp;&nbsp;&nbsp;电话' hasFeedback rules={[{
                        pattern:/^1[3|5|7|8][0-9]{9}$/,
                        message:'请输入正确的联系方式'
                    }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name='email' label='&nbsp;&nbsp;&nbsp;邮箱' hasFeedback>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddUser