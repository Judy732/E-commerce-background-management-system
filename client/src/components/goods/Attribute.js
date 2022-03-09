import {
    Form, Input, Radio, Button, DatePicker, Modal, message, Select, Cascader,
    InputNumber, TreeSelect, Switch, Table
} from 'antd';
import {DeleteOutlined, EditOutlined, SnippetsOutlined, WarningOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import AddAttribute from './AddAttribute'

const {Column}=Table;

export default function Attribute(props) {
    const [attributeAll,setAttributeAll] = useState([]);
    const [code,setCode] = useState(0);
    const getAttributeAll = () => {
        axios.get('http://localhost:8888/attr/attributesAll').then(result => {
            setAttributeAll(result.data.data);
        })
    }
    useEffect(() => {
        getAttributeAll();
    })

    const [addAttributeForm,setAddAttributeForm] = useState(false);
    const close = ()=> {
        setAddAttributeForm(false)
    }
    return (
        <>
            <div style={{marginBottom:'20px'}}>
                <Button icon={<WarningOutlined/>} type="text" danger>只能添加三级分类</Button>
                <Button onClick={() => setAddAttributeForm(true)}>添加分类</Button>
            </div>


            <AddAttribute visible={addAttributeForm} closeForm={close}/>


            <Table border dataSource={attributeAll} rowKey={(record) => record.attr_id}>
                <Column dataIndex={'attr_id'} key={'attr_id'} title={'编号'} align={'center'}/>
                <Column dataIndex={'attr_name'} key={'attr_name'} title={'属性名称'} align={'center'}/>
                <Column dataIndex={'cat_id'} key={'cat_id'} title={'分类编号'} align={'center'}/>
                <Column dataIndex={'attr_vals'} key={'attr_vals'} title={'角色描述'} align={'center'}/>
                <Column  key={'action'} title={'操作'} align={'center'} render={(record)=>(
                    <space size={'middle'}>
                        <Button type='link' size='middle' icon={<EditOutlined/>} />
                        <Button danger type='link' size='middle' icon={<DeleteOutlined/>} />
                    </space>
                )}/>
            </Table>
        </>
    )
}
