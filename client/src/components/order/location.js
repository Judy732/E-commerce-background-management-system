import {Button, Modal, Timeline} from "antd";
import React,{useState} from 'react'
import Draggable from "react-draggable";

function Location(props) {

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
                     }}>
                    物流信息
                </div>
            }
            visible={props.visible}
            cancelText='我知道了'
            onCancel={()=> {
                props.close()
            }}
            modalRender = {(modal)=> (
                <Draggable disabled={disabled} bounds={bounds} onStart={(event,uiDate)=> onStart(event,uiDate)}>
                    <div ref={draggableRef}>{modal}</div>
                </Draggable>
            )}
            // 怎么去掉ok按钮
        >
            <Timeline>
                <Timeline.Item color='green'>商品已经下单</Timeline.Item>
                <Timeline.Item color='green'>您的订单将由HLA（北京海淀区清河中街店）门店安排发货</Timeline.Item>
                <Timeline.Item color='green'>卖家发货</Timeline.Item>
                <Timeline.Item color='green'>顺丰速运 已收取快件</Timeline.Item>
                <Timeline.Item color='red'>快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]</Timeline.Item>
                <Timeline.Item color='grey'>快件到达 [北京顺义集散中心]</Timeline.Item>
                <Timeline.Item color='grey'>快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]</Timeline.Item>
                <Timeline.Item color='grey'>快件到达 [北京海淀育新小区营业点]</Timeline.Item>
                <Timeline.Item color='grey'>[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件</Timeline.Item>
                <Timeline.Item color='grey'>已签收,感谢使用顺丰,期待再次为您服务</Timeline.Item>
            </Timeline>
        </Modal>
    )
}

export default Location