import {Tree, Modal, Space, Button, message} from 'antd';
import axios from "axios";
import React,{useState,useEffect} from "react";

export default function Permission(props) {

    const treeData=[
        {
            title:'商品管理',
            key:'0-0-0',

            children:[
                {
                    title:'商品列表',
                    key:'0-1-0',
                    children:[
                        {
                            title:'添加商品',
                            key:'0-1-1',
                        },
                        {
                            title:'商品修改',
                            key:'0-1-2',
                        },
                        {
                            title:'商品删除',
                            key:'0-1-3',
                        }, {
                            title:'更新商品图片',
                            key:'0-1-4',
                        },
                        {
                            title:'更新商品属性',
                            key:'0-1-5',
                        },
                        {
                            title:'更新商品状态',
                            key:'0-1-6',
                        },
                        {
                            title:'获取商品详情',
                            key:'0-1-7',
                        },


                    ]
                },
                {
                    title:'分类参数',
                    key:'0-2-0',
                    children: [
                        {
                            title:'获取参数列表',
                            key:'0-2-1'
                        },
                        {
                            title:'创建商品参数',
                            key:'0-2-2'
                        },
                        {
                            title:'删除商品参数',
                            key:'0-2-3'
                        },
                    ]
                },
                {
                    title:'商品分类',
                    key:'0-3-0',
                    children: [
                        {
                            title: '添加分类',
                            key:'0-3-1'
                        },
                        {
                            title: '删除分类',
                            key:'0-3-2'
                        },
                        {
                            title: '获取分类详情',
                            key:'0-3-3'
                        },
                    ]
                }
            ]
        },
        {
            title: '订单管理',
            key:'1-0-0',
            children: [
                {
                    title: '订单列表',
                    key:'1-1-0',
                    children: [
                        {
                            title: '添加订单',
                            key: '1-1-1',
                        },
                        {
                            title: '删除订单',
                            key:'1-1-2',
                        }
                    ]
                }
            ]
        }
    ];

    const [arr,setArr] = useState([]);

    return (
        <>
            <Modal
                title={<div style={{width: '100%', cursor: 'move'}}>分配权限</div>}
                visible={props.visible}
                okText={'确认'}
                cancelText={'取消'}
                onOk={() => {
                    let id = props.editPermission;
                    axios.post(`http://localhost:8888/role/roles/${id}/rights`,{arr:arr}).then(result => {
                        message.success('角色授权成功');
                        props.closeForm();
                    })
                }}
                onCancel={() => {
                    props.closeForm();
                }}>
                <Tree
                    checkable
                    defaultExpandedKeys={['0-0-0', '1-0-0']}
                    defaultSelectedKeys={props.selected}
                    onSelect={(selectedKeys, info) => {
                        console.log('selected：', selectedKeys, info);
                    }}
                    onCheck={(checkedKeys, info) => {
                        console.log('onCheck', checkedKeys, info);
                        setArr(checkedKeys);
                    }}
                    treeData={treeData}/>
            </Modal>
        </>
    )
}
