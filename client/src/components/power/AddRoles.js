import React,{useState} from "react";
import {Form,Input,DatePicker,Radio,Modal,message} from "antd";
import axios from "axios";

export default function AddRoles(props) {
    const addRolesRef = React.createRef();

    return (
        <>
            <Modal
                title="添加角色"
                visible={props.visible}
                okText={'确认'}
                cancelText={'取消'}
                onCancel={() => props.closeForm()}
                onOk={async () => {
                    await addRolesRef.current.validateFields().then((value)=>{
                        axios.post('http://localhost:8888/role/roles',{value:value}).then(result=>{
                            props.closeForm()
                            props.modifyCode(result.data.code)
                            message.success('添加成功')
                        })
                    })
                }}
            >
                <Form ref={addRolesRef}>
                    <Form.Item label='角色名称'
                               name='roleName'
                               rules={[{
                                   required:true,
                                   message:'请输入角色名称'
                               }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='角色描述'
                        name='roleDesc'
                        rules={[{
                            required:true,
                            message:'请输入角色描述'
                        }]}

                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
