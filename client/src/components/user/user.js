import {Table, Space, Button,Input,Modal,message,Switch} from "antd";
import {FormOutlined,DeleteOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import React,{useEffect,useState,useRef} from "react";
import axios from "axios";
import AddUser from "./addUser";
import UpdateUser from "./updateUser";
const {Column} = Table
const {Search} = Input

function User() {
    const [users,setUsers] = useState([])
    const [code,setCode] = useState(0)

    //挂载
    useEffect(()=> {
        getUsers()
    },[code])

    //获取用户信息
    const getUsers = ()=> {
        axios.get('http://localhost:8888/users/search').then(result=> {
            setUsers(result.data.data)
        })
    }

    //添加用户
    //是否打开添加用户信息框状态
    const [addUser,setAddUser] = useState(false)
    //打开添加用户添加框
    const openAddUser = ()=> {
        setAddUser(true)
    }
    //关闭添加用户添加框
    const closeAddUser = ()=> {
        setAddUser(false)
    }

    //查找某个用户
    const search = React.createRef()

    //搜索框查找信息
    const searchUser = ()=> {
        console.log(search.current.state.value)
        axios.post('http://localhost:8888/users/searchName',{name:search.current.state.value}).then(result=> {
            if(result.data.data.length === 0) {
                message.warning('请输入正确的用户名')
            }else {
                setUsers(result.data.data)
                message.success(result.data.meta.msg)
            }
        })
    }

    //删除用户信息
    const deleteUser = (name)=> {
        Modal.confirm({
            title:'确定删除吗？',
            icon:<ExclamationCircleOutlined/>,
            okText:'确定',
            okType:'danger',
            cancelText:'取消',
            onOk:()=> {
                axios.delete('http://localhost:8888/users/delete',{data:{username:name}}).then(result=> {
                    message.success(result.data.msg)
                    setCode(result.data.code)
                })
            }
        })
    }

    //修改用户信息
    //存储选中编辑的数据
    const [editRecord,setEditRecord] = useState({})
    //是否打开修改用户添加框
    const [updateUser,setUpdateUser] = useState(false)
    //打开
    const openUpdateUser = (record)=> {
        setUpdateUser(true)
        //传入选中数据
        setEditRecord(record)
    }
    //关闭
    const closeUpdateUser = ()=> {
        setUpdateUser(false)
    }

    //修改用户状态
    const changeState = (name,state) => {
        // console.log(name)
        axios.put('http://localhost:8888/users/update',{data:{username:name,state:state}}).then(result=>{
            message.success(result.data.meta.msg)
        })
    }

    return (
        <>
            <div>
                {/*搜索框*/}
                <Search
                    placeholder="请输入用户名"
                    enterButton
                    style={{width:'240px'}}
                    ref={search}
                    onSearch={()=>searchUser()}
                />
                <Button type='default' style={{margin:'0 5px 2px'}} onClick={openAddUser}>添加用户</Button>
            </div>
            {/*添加信息框*/}
            <AddUser visible={addUser} close={closeAddUser} modifyCode={setCode}/>
            {/*更新信息框*/}
            <UpdateUser visible={updateUser} close={closeUpdateUser} edit={editRecord} modifyCode={setCode}/>
            {/*表格展示数据*/}
            <Table border dataSource={users} rowKey={(record) => record.mg_name}>
                <Column dataIndex='mg_id' key='mg_id' align={'center'} title='#'/>
                <Column dataIndex='mg_name' key='mg_name' align={'center'} title='用户名'/>
                <Column dataIndex='mg_email' key='mg_email' align={'center'} title='邮箱'/>
                <Column dataIndex='mg_mobile' key='mg_mobile' align={'center'} title='电话'/>
                <Column dataIndex='role_id' key='role_id' align={'center'} title='角色' render={(role_id)=> (
                    role_id === 0?<span>管理员</span>:<span>超级管理员</span>
                )}/>
                <Column dataIndex='mg_state' key='mg_state' align={'center'} title='状态' render={(mg_state,record)=> (
                    <Switch defaultChecked={mg_state === 0?false:true} onChange={()=>changeState(record.mg_name,record.mg_state)}/>
                )}/>
                <Column key='action' title='操作' align='center' render={(record)=> (
                    <Space size='middle'>
                        <Button type='link' size='middle' icon={<FormOutlined/>} onClick={()=>openUpdateUser(record)}/>
                        <Button danger type='link' size='middle' icon={<DeleteOutlined/>} onClick={()=> deleteUser(record.mg_name)}/>
                    </Space>
                )}/>
            </Table>
        </>
    )
}

export default User
