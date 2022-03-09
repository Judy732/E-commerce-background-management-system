import {Button, message, Modal, Space, Table} from "antd";
import {EditOutlined, DeleteOutlined, SnippetsOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import React, {useState,useEffect,useRef} from "react";
import axios from "axios";

import Permission from './Permission';
import UpdateRoles from './UpdateRoles'
import AddRoles from './AddRoles'

const {Column}=Table;

export default function Roles() {

    // 获取所有角色信息
    const [roles,setRoles] = useState([]);
    const [code,setCode] = useState(0);
    useEffect(() => {
        getRoles()
    },[code]);
    const getRoles = () => {
        axios.get('http://localhost:8888/role/roles').then(result => {
            setRoles(result.data.data);
        })
    }

    // 删除角色
    const deleteRole = (id) => {
        Modal.confirm({
            title:'确定删除该角色吗？',
            icon:<EditOutlined/>,
            onType:'danger',
            onOk:() => {
                axios.delete(`http://localhost:8888/role/roles/${id}`).then(result =>{
                    console.log(id);
                    message.success('删除成功！');
                    setCode(Math.random()*1000);
                })
            }
        })
    }


    // 添加角色
    const[permissionForm,setPermissionForm]=useState(false);
    // 还有问题  不能显示默认选中的！！！！！！！！
    const [defArr,setDefArr] = useState([]);
    const [editPermission,setEditPermission]=useState(0);//分配权限时被点击的该行id
    const openPerForm = async (id) => {
        setEditPermission(id);
        setPermissionForm(true);
        await axios.get(`http://localhost:8888/role/roles/${id}/quan`).then(result=>{
            setDefArr(result.data.data);
            console.log(defArr);
        })
    }

    //更新信息
    const[updateForm,setUpdateForm]=useState(false);
    const [editRecord,setEditRecord]=useState({});

    // 添加信息
    const [addRoleForm,setAddRoleForm]=useState(false);


    return (
        <>
            <Button
                style={{marginBottom:'20px'}}
                onClick={() => setAddRoleForm(true)}
            > 添加角色</Button>

            <Permission
                visible={permissionForm}
                closeForm={() => {setPermissionForm(false)}}
                defArr={defArr}
                editPermission={editPermission}
                selected={defArr}/>

            <UpdateRoles
                visible={updateForm}
                closeForm={() => setUpdateForm(false)}
                editRecord={editRecord}
                setCode={setCode}/>

            <AddRoles
                visible={addRoleForm}
                closeForm={() => setAddRoleForm(false)}
                modifyCode={setCode}/>

            <Table border dataSource={roles} rowKey={(record) => record.roleId}>
                <Column dataIndex={'roleId'} key={'roleId'} title={'编号'} align={'center'}/>
                <Column dataIndex={'roleName'} key={'roleName'} title={'角色名称'} align={'center'}/>
                <Column dataIndex={'roleDesc'} key={'roleDesc'} title={'角色描述'} align={'center'}/>
                <Column  key={'action'} title={'操作'} align={'center'} render={(record)=>(
                    <space size={'middle'}>
                        <Button type='link' size='middle' icon={<EditOutlined/>} onClick={() => {setUpdateForm(true);setEditRecord(record)}}/>
                        <Button danger type='link' size='middle' icon={<DeleteOutlined/>} onClick={()=>{deleteRole(record.roleId)}}/>
                        <Button type='link' size='middle' icon={<SnippetsOutlined/>} onClick={()=>{openPerForm(record.roleId)}}/>
                    </space>
                )}/>
            </Table>
        </>
    )
}
