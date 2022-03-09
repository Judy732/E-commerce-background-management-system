import {Modal,Form,Input,message} from 'antd';
import React,{useState} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

export default function UpdateCategory(props) {

    const UpdateCategoryRef = React.createRef();


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
                        width: '100%',
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
                >更新分类信息</div>}
                visible={props.visible}
                destroyOnClose
                onCancel={props.closeForm}
                cancelText={'取消'}
                okText={'确定'}
                onOk = { async () => {
                    await UpdateCategoryRef.current.validateFields().then(value => {
                        console.log(value);
                        axios.put( `http://localhost:8888/cate/categories/${value.cat_id}`,{category: value}).then (result => {
                            props.closeForm();
                            props.modifyCode(Math.random()*1000);
                            message.success(result.data.meta.msg);
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
                    ref={UpdateCategoryRef}
                    preserve={false}
                    layout='horizontal'
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                >
                    <Form.Item
                        label="分类ID"
                        name='cat_id'
                        rules={[{
                            required: true,
                        }]}
                        initialValue={props.editCategory.cat_id}
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        label='分类名称'
                        name='cat_name'
                        rules={[{
                            required: true
                        }]}
                        initialValue={props.editCategory.cat_name}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='分类图标'
                        name='cat_icon'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='分类来源'
                        name='cat_src'
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
