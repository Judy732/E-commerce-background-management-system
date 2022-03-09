import {Modal, Form, Input, message, Select} from 'antd';
import React,{useState} from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
const { Option } = Select;


export default function AddCategory(props) {

    const AddCategoryRef = React.createRef();

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


    const [level,setLevel] = useState([]);
    const options = level.map(d =><Option value={d.cat_id} key={d.cat_id}>{d.cat_name}</Option> )



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
                >添加分类信息</div>}
                visible={props.visible}
                destroyOnClose
                onCancel={props.closeForm}
                cancelText={'取消'}
                okText={'确定'}
                onOk = { async () => {
                    await AddCategoryRef.current.validateFields().then(value => {
                        console.log('value',value);
                        axios.post('http://localhost:8888/cate/categories',{category:value}).then(result => {
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
                    ref={AddCategoryRef}
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
                        label='分类名称'
                        name='cat_name'
                        rules={[{
                            required: true
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='分类等级'
                        name='cat_level'
                        rules={[{
                            required: true
                        }]}
                    >
                        <Select
                            onChange={ async value => {
                                console.log('value---------------',value);
                                if(value === 0) {
                                    setLevel([{cat_id:0,cat_name:'顶级分类'}])
                                }else {
                                    await axios.get(`http://localhost:8888/cate/categories/${value-1}`).then(result => {
                                        setLevel(result.data.data);
                                    })
                                }
                            }}
                        >
                            <Option value = {0}>一级分类</Option>
                            <Option value = {1}>二级分类</Option>
                            <Option value = {2}>三级分类</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='父级分类'
                        name='cat_pid'
                        rules={[{
                            required: true
                        }]}
                    >
                        <Select>
                            {options}
                        </Select>
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
