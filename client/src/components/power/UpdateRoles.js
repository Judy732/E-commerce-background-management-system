import React,{useState} from "react";
import {Button,Modal,message,Form,Input}from 'antd';
import axios from "axios";

export default function UpdateRoles(props) {
    const updateRolesRef=React.createRef();

    return (
        <>
            <Modal
                title={<div style={{width:'100%',cursor:'move'}}>
                    更新信息
                </div>}
                visible={props.visible}
                onCancel={()=>{
                    props.closeForm();
                }}
                destroyOnClose
                okText={'确认'}
                cancelText={'取消'}
                onOk={async () => {
                    await updateRolesRef.current.validateFields().then(value => {
                        console.log(props.editRecord.roleId);
                        axios.put(`http://localhost:8888/role/roles/${props.editRecord.roleId}`,{role:value}).then(result => {
                            props.closeForm();
                            props.setCode(Math.random()*1000);
                            message.success('修改成功');
                        })
                    })
                }}
            >
                <Form  ref={updateRolesRef}>
                    <Form.Item label='编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号' name='roleId' initialValue={props.editRecord.roleId} rules={[{required:true}]}>
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item label='角色名称' name='roleName' initialValue={props.editRecord.roleName} rules={[{required:true,message:'请输入角色名称'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label='角色描述' name='roleDesc' initialValue={props.editRecord.roleDesc} rules={[{required:true,message:'请输入角色描述'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
