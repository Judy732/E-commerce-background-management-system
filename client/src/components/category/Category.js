import {Button, Space, Table, Switch, Modal, message} from 'antd';
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
    ExclamationCircleOutlined,
    FormOutlined
} from '@ant-design/icons';

import UpdateCategory from './UpdateCategory';
import AddCategory from './AddCategory';

const {Column} = Table


export default function Category () {
    const [category,setCategory] = useState();  // 所有的分类
    const [code,setCode] = useState(0);

    const [updateCategoryForm,setUpdateCategoryForm] = useState(false);

    const [editCategory,setEditCategory] = useState({}) //保存被编辑的分类

    //添加分类框框的状态
    const [addCategoryForm,setAddCategoryForm] = useState(false);

    //获取分类信息并进行处理
    const getCategory = () => {
        axios.get('http://localhost:8888/cate/categories').then(result => {
            console.log('从后台传过来的分类信息',result);
            setCategory(result.data.data);
        })
    }

    // 状态管理的副作用钩子
    useEffect(() => {
        getCategory();
    },[code])


    // 删除指定的分类
    const deleteCategory = (record) => {
        console.log('-----',record)
        let arr = [];
        if(record.cat_level === 0) {
            arr.push(record.cat_id)
            for(let i=0;i<record.children.length;i++) {
                arr.push(record.children[i].cat_id)
                for(let j=0;j<record.children[i].children.length;j++) {
                    arr.push(record.children[i].children[j].cat_id)
                }
            }
        }else if(record.cat_level === 1) {
            arr.push(record.cat_id);
            for(let i=0;i<record.children.length;i++) {
                arr.push(record.children[i].cat_id)
            }
        }else{
            arr.push(record.cat_id);
        }
        console.log('要删除的所有分类的id号',arr);

        Modal.confirm({
            title: '确认删除吗？',
            icon: <ExclamationCircleOutlined/>,
            okText:'确定',
            cancelText:'取消',
            onOk: async () => {
                for(let i=0;i<arr.length;i++) {
                    await axios.delete(`http://localhost:8888/cate/categories/${arr[i]}`).then(result => {
                    })
                }
                message.success('删除成功');
                setCode(code === 0 ? 1 : 0)
            }
        })
    }

    return (
        <>
            <UpdateCategory visible={updateCategoryForm} editCategory={editCategory} closeForm={() => setUpdateCategoryForm(false)} modifyCode={setCode}/>
            <AddCategory  visible={addCategoryForm} closeForm={() => {setAddCategoryForm(false)}} modifyCode={setCode}/>

            <Button
                style={{
                    marginBottom: '4px'
                }}
                type='default'
                size='middle'
                onClick={() => setAddCategoryForm(true)}
            >添加分类</Button>
            <Table
                border
                rowKey={(record) => record.id }
                dataSource={category}
                indentSize={15}
            >
                <Column dataIndex='cat_id' title='分类ID' key='id' align='center'/>
                <Column dataIndex='cat_name' title='分类名称' key='cat_name'  align='center' />
                <Column dataIndex='cat_level' title='分类等级' key='cat_level' align='center' render={(text) => {
                    if(text === 0) return <Button size='small' style={{color:'while',backgroundColor:'rgb(255,0,0,0.5)'}}>一级</Button>
                    if(text === 1) return <Button size='small' style={{color:'while',backgroundColor:'rgb(255,255,0,0.5)'}}>二级</Button>
                    if(text === 2) return <Button size='small' style={{color:'while',backgroundColor:'rgb(0,0,255,0.5)'}}>三级</Button>
                }}/>
                <Column dataIndex='cat_deleted' title='是否有效' key='cat_deleted' align='center' render={(text,record) => {
                    return text === 0 ? <CheckCircleOutlined style={{color:'green'}}/> : <CloseCircleOutlined style={{color:'red'}} />
                }}/>
                <Column key={'action'} title={'操作'}  align="center" render={(record) => (
                    <Space size={'middle'}>
                        <Button type={'link'} size={'small'} icon={<FormOutlined/>} onClick={() => {setEditCategory(record);setUpdateCategoryForm(true)}}></Button>
                        <Button  danger type='link' size={'small'} icon={<CloseOutlined/>} onClick={() =>deleteCategory(record)}></Button>
                    </Space>
                )}/>
            </Table>
        </>
    )
}
