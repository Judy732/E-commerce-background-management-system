import {Button, Space, Table, Input, Radio, message} from "antd";
import {FormOutlined,EnvironmentOutlined} from "@ant-design/icons";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import UpdateOrder from "./updateOrder";
import Location from "./location";
const {Column} = Table
const {Search} = Input

function Order() {
    const [order,setOrder] = useState([])
    const [code,setCode] = useState(0)

    const [see,setSee] = useState(false)

    //挂载
    useEffect(()=> {
        getOrder()
    },[code])

    //获取订单数据
    const getOrder = ()=> {
        axios.get('http://localhost:8888/orders/search').then(result=> {
            setOrder(result.data.goods)
        })
    }
    //?????
    const onChange = (e)=> {
        console.log(e)
            e.target.value = 0
            // e.target.value = 1
    }

    //修改信息
    //修改信息框开合状态
    const [editRecord,setEditRecord] = useState({})
    const [updateOrder,setUpdateOrder] = useState(false)
    //打开
    const openUpdateOrder = (record)=> {
        setEditRecord(record)
        setUpdateOrder(true)
    }
    //关闭
    const closeUpdateOrder = ()=> {
        setUpdateOrder(false)
    }


    //定位信息
    const [location,setLocation] = useState(false)
    //打开
    const openLocation = ()=> {
        setLocation(true)
    }
    //关闭
    const closeLocation = ()=> {
        setLocation(false)
    }

    //查询订单
    const search = useRef()
    const searchOrder = ()=> {
        if(search.current.state.value!=='') {
            axios.post('http://localhost:8888/orders/find',{id:search.current.state.value}).then(result=> {
                if(result.data.data.length === 0) {
                    message.warning(result.data.meta.msg)
                }else {
                    setOrder(result.data.data)
                    message.success(result.data.meta.msg)
                }
            })
        }else {
            getOrder()
        }
    }

    //时间格式化
    const time = (time)=> {
        let year = time.substring(0,10)
        let t = time.substring(11,19)
        var newTime = year + ' ' + t
        return newTime
    }

    return (
        <>
            <div>
                <Search placeholder='请输入订单编号' style={{width:220,margin:'2px 0'}} ref={search} onSearch={()=>searchOrder()}/>
            </div>
            {/*修改订单信息*/}
            <UpdateOrder visible={updateOrder} close={closeUpdateOrder} edit={editRecord} modefyCode={setCode}/>
            {/*定位信息*/}
            <Location visible={location} close={closeLocation}/>
            <Table bordered dataSource={order} rowKey={(record)=>record.order_number}>
                <Column align='center' dataIndex='order_id' key='id' title='#'/>
                <Column align='center' dataIndex='order_number' key='order_number' title='订单编号'/>
                <Column align='center' dataIndex='order_price' key='order_price' title='订单价格'/>
                <Column align='center' dataIndex='pay_status' key='pay' title='是否付款' render={(pay_status)=> (
                    pay_status === 0?<Button type='danger' size='small' value={0}>未付款</Button>:
                        <Button type='primary' size='small' value={1}>已付款</Button>
                )}>
                </Column>
                <Column align='center' dataIndex='is_send' key='is_send' title='是否发货' render={(is_send)=> (
                    is_send === 0?<span>否</span>:<span>是</span>
                    )}/>
                <Column align='center' dataIndex='create_time' key='create_time' title='下单时间' render={(create_time)=>time(create_time)}/>
                <Column key='action' title='操作' align='center' render={(record)=> (
                    <Space size='middle'>
                        <Button type='link' size='middle'  icon={<FormOutlined/>} onClick={()=>openUpdateOrder(record)}/>
                        <Button type='link' size='middle' style={{color:'#52c41a'}} icon={<EnvironmentOutlined/>} onClick={()=>openLocation()}/>
                    </Space>
                )}/>
            </Table>
        </>
    )
}

export default Order
