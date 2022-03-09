import {Modal, Form, Input, Select, message} from "antd";
import React,{useState} from "react"
import axios from "axios";
import Draggable from "react-draggable";
const {Option} = Select

function UpdateOrder(props) {
    //绑定表单
    const bindOrder = React.createRef()

    //提示框移动
    //modal是否可以移动
    const [disabled,setDisabled] = useState(true)
    //modal拖拽的方向
    const [bounds,setBounds] = useState({left:0,top:0,bottom:0,right:0})
    //和可以拖拽组件Draggable进行绑定
    const draggableRef = React.createRef()
    const onStart = (event,uiDate)=> {
        //获取浏览器窗口的高度宽度
        const {clientWidth,clientHeight} = window.document.documentElement
        //获取modal的外div
        const targetReact = draggableRef.current.getBoundingClientRect()
        setBounds({
            bounds:{
                left:-targetReact.left + uiDate.x,
                right:clientWidth-(targetReact.right-uiDate.x),
                top:-targetReact.top + uiDate.y,
                bottom:clientHeight - (targetReact.bottom - uiDate.y)
            }
        })
    }

    return (
        <Modal
            title={
                <div style={{
                    width:'100%',
                    cursor:'move'
                }}
                     onMouseMove={()=> {
                         if(disabled) {
                             setDisabled(false)
                         }
                     }}
                     onMouseOut={()=> {
                         if(disabled) {
                             setDisabled(true)
                         }
                     }}
                >
                    修改订单
                </div>
            }
            visible={props.visible}
            destroyOnClose
            cancelText={'取消'}
            onCancel={()=> {
                props.close()
            }}
            okText={'提交'}
            onOk={async ()=> {
                await bindOrder.current.validateFields().then(value => {
                    axios.put('http://localhost:8888/orders/update',{order:value}).then(result=> {
                        props.close()
                        message.success(result.data.meta.msg)
                        props.modefyCode(result.data.meta.code)
                    })
                })
            }}
            modalRender = {(modal)=> (
                <Draggable disabled={disabled} bounds={bounds} onStart={(event,uiDate)=> onStart(event,uiDate)}>
                    <div ref={draggableRef}>{modal}</div>
                </Draggable>
            )}
        >
            <Form ref={bindOrder}>
                <Form.Item name='order_number' label='订单编号' initialValue={props.edit.order_number}>
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item name='order_price' label='订单总金额' initialValue={props.edit.order_price}>
                    <Input/>
                </Form.Item>
                <Form.Item name='consignee_addr' label={'地址'} initialValue={props.edit.consignee_order}>
                    <Input/>
                </Form.Item>
                <Form.Item name='is_send' label='是否发货' initialValue={props.edit.is_send}>
                    <Select>
                        <Option value={1}>已发货</Option>
                        <Option value={0}>未发货</Option>
                    </Select>
                </Form.Item>
                <Form.Item name='pay_status' label='订单状态' initialValue={props.edit.pay_status}>
                    <Select>
                        <Option value={1}>已付款</Option>
                        <Option value={0}>未付款</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateOrder