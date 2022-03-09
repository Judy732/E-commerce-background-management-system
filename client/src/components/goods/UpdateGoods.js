import {Form, Input, Radio, Button, DatePicker, Modal, message, Select, Cascader,
    InputNumber, TreeSelect, Switch} from 'antd';

import React,{useState} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';


export default function UpdateGoods(props) {
    const UpdateGoodsRef = React.createRef();  //可以存放Form表单里面的数据

    const [disable,setDisable] = useState(true);  //控制Modal是否可以拖拽
    const [bounds,setBounds] = useState({left:0,top:0,bottom:0,right:0});   //设定Modal拖拽的范围
    const draggableRef = React.createRef(); //与可拖拽组件Draggable进行绑定
    const onStart = (event,uiData) => { //鼠标悬停到对话框变为可移动的图标的时候触发
        const {clientWidth,clientHeight} = window.document.documentElement; //获取浏览器窗口的高度和宽度
        const targetReact = draggableRef.current.getBoundingClientRect();   //获取在窗口中显示的Modal
        setBounds({
            bounds: {
                left: -targetReact.left + uiData.x,
                right: clientWidth - (targetReact.right-uiData.x),
                top: -targetReact.top + uiData.y,
                bottom: clientHeight - (targetReact.bottom - uiData.y)
            }
        })
    }



    return (
        <>
            <Modal
                title={<div
                    style={{
                        width:'100%',
                        cursor: 'move'
                    }}
                    onMouseMove = {() => {
                        if(disable) {
                            setDisable(false)
                        }
                    }}
                    onMouseOut = {() => {
                        if(disable) {
                            setDisable(true);
                        }
                    }}
                >更新商品信息:</div>}
                visible={props.visible}
                destroyOnClose
                onCancel={props.closeForm}
                okText={'确认'}
                cancelText={'取消'}
                onOk = { async () => {
                    await UpdateGoodsRef.current.validateFields().then(value => {
                        axios.put(`http://localhost:8888/goods/goods/${value.goods_id}`,{goods: value}).then(result => {
                            props.closeForm();
                            props.modifyCode(Math.random()*100000);
                            message.success(result.data.meta.msg)
                        })
                    })
                }}
                modalRender = {(modal) => (
                    <Draggable disable = {disable} bounds={bounds}
                               onStart={(event,uiData) => {
                                   onStart(event,uiData)
                               }}
                    >
                        <div ref = {draggableRef}>{modal}</div>
                    </Draggable>
                )}
            >

                <Form
                    ref = {UpdateGoodsRef}
                    preserve={false}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="编&nbsp;&nbsp;&nbsp;号"
                        name='goods_id'
                        rules={[{
                            required: true,
                        }]}
                        initialValue={props.editRecord.goods_id}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item label='名&nbsp;&nbsp;&nbsp;称'
                               name='goods_name'
                               rules={[{
                                   required: true,
                               }]}
                               initialValue={props.editRecord.goods_name}
                    >
                        <Input  />
                    </Form.Item>
                    <Form.Item label='价&nbsp;&nbsp;&nbsp;格'
                               name='goods_price'
                               rules={[{
                                   required: true,
                               }]}
                               initialValue={props.editRecord.goods_price}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='数&nbsp;&nbsp;&nbsp;量'
                        name='goods_number'
                        rules={[{
                            required: true,
                        }]}
                        initialValue={props.editRecord.goods_number}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='重&nbsp;&nbsp;&nbsp;量'
                               name='goods_weight'
                               rules={[{
                                   required: true,
                               }]}
                               initialValue={props.editRecord.goods_weight}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item label='介&nbsp;&nbsp;&nbsp;绍'
                               name='goods_introduce'
                               rules={[{
                                   required: false,
                               }]}
                               initialValue={props.editRecord.goods_introduce}
                    >
                        <Input.TextArea showCount maxLength={100} />
                    </Form.Item>
                    <Form.Item label={'是否促销'}
                               name={'is_promote'}
                               rules={[{
                                   required: false,
                               }]}
                    >
                        <Switch defaultChecked={props.editRecord.is_promote === 0 ? false : true}/>
                    </Form.Item>
                    <Form.Item label='状&nbsp;&nbsp;&nbsp;态'
                               name='goods_state'
                               rules={[{
                                   required: false,
                               }]}
                        // initialValue={props.editRecord.goods_state === 0 }
                    >
                        <Select>
                            <Select.Option value = '0'>未通过</Select.Option>
                            <Select.Option value = "1">审核中</Select.Option>
                            <Select.Option value = "2">已通过</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
