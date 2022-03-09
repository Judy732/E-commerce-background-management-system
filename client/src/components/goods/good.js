import {Button, Space, Table, Modal, message, Input,Pagination} from 'antd'
import {useEffect,useState} from 'react';
import axios from 'axios';
import {CloseOutlined, ExclamationCircleOutlined, FormOutlined,FireOutlined} from '@ant-design/icons';
import 'moment/locale/zh-cn';
import UpdateGoods from './UpdateGoods'
import React from 'react';
const {Column} = Table;


export default function Good() {
    const [goods,setGoods] = useState();    //保存全部商品的状态钩子

    const [code,setCode] = useState(0);    // 保存是否执行状态管理的副作用钩子

    const [updateGoodsForm,setUpdateGoodsForm] = useState(false);    //决定编辑窗口是否打开
    const [editRecord,setEditRecord] = useState({}) //保存被编辑的商品


    // 状态管理的副作用钩子
    useEffect(() => {
        getGoods();
    },[code])


    //获取所有的商品信息 请求后台
    const getGoods = () => {
        axios.get('http://localhost:8888/goods/goods').then( result => {
            console.log('查到的所有商品信息--从后台传到前端的信息: ',result);
            setGoods(result.data.data);
        })
    }

    // 根据id查询商品
    const oneGood = (value) => {
        axios.get(`http://localhost:8888/goods/goods/${value}`).then(result => {
            //更新表格中的值
            setGoods(result.data.data);
        })
    }


    //打开更新信息窗口
    const openUpdateModal = (record) => {
        setUpdateGoodsForm(true);
        console.log('待编辑的用户的数据:',record);
        setEditRecord(record);
    }

    //关闭更新信息窗口
    const closeUpdateModal = () => {
        setUpdateGoodsForm(false);
    }


    //删除商品的函数
    const deleteGoods = (id) => {
        console.log('要删除的商品的id',id);
        Modal.confirm({
            title: '确认删除吗?',
            icon: <ExclamationCircleOutlined/>,  //消息框上的图片
            okText:'确认',
            cancelText:'取消',
            onOk: () => {   //当用户点击确定按钮时执行的操作
                axios.delete(`http://localhost:8888/goods/goods/${id}`).then(result => {
                    console.log('删除指定--用户后端传入的数据:',result);
                    message.success(result.data.meta.msg);
                    setCode(code === 0 ? 1 : 0)
                })
            }
        })
    }



    return (
        <>
            <UpdateGoods visible={updateGoodsForm} editRecord={editRecord} closeForm={closeUpdateModal} modifyCode={setCode}/>

            <Input.Search
                placeholder="请输入待搜索的商品ID"
                allowClear
                onSearch={oneGood}
                style={{ width: '40%',marginBottom:'10px'}}
                enterButton/>
            <Table
                dataSource={goods}
                border
                // rowKey={(record) => record.goods_id}
            >
                <Column dataIndex={'goods_id'} key={'goods_id'}  title={'商品ID'} align='center' />
                <Column dataIndex={'goods_name'} key={'goods_name'} title={'名称'} align='center'/>
                <Column dataIndex={'goods_price'} key={'goods_price'} title={'价格'} align='center'/>
                <Column dataIndex={'goods_number'} key={'goods_number'} title={'数量'} align='center'/>
                <Column dataIndex={'goods_weight'} key={'goods_weight'} title={'重量'} align='center'/>
                <Column dataIndex={'hot_number'} key={'hot_number'} title={'热卖数量'} align='center' />
                <Column dataIndex={'is_promote'} title={'是否促销'} align='center'  render={(text) => {
                    return text === 0 ? <FireOutlined /> : <FireOutlined style={{color: 'red'}} />
                }}/>
                <Column dataIndex={'goods_introduce'} key={'goods_introduce'} title={'商品简介'} align='center'/>
                <Column dataIndex={'goods_state'} key={'goods_state'} title={'状态'} align='center' render={function (text) {
                    if(text === 0) return '未通过'
                    if(text === 1) return '审核中'
                    if(text === 2) return '已通过'
                }}/>
                <Column key={'action'} title={'操作'}  align="center" render={(record) => (
                    <Space size={'middle'}>
                        <Button type={'link'} size={'small'} icon={<FormOutlined/>} onClick={() => openUpdateModal(record)}/>
                        <Button  danger type='link' size={'small'} icon={<CloseOutlined/>} onClick={() => deleteGoods(record.goods_id)}/>
                    </Space>
                )}/>
            </Table>
        </>
    )
}
