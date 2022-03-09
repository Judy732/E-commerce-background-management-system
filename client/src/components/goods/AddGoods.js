import {Tabs, Form, Input, InputNumber, Select, Switch, Button, message, Modal, Cascader, Steps,Upload} from 'antd';
import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import UploadComponent from './UploadComponent';
import Attribute from './Attribute'


const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;


export default function AddGoods(props) {

    const addGoodsRef = React.createRef();  //创建ref与表单进行绑定

    //保存子组件传递过来的图片信息
    const [imgList,setImgList] = useState([]);
    //传递给子组件的用来改变父组件信息的函数
    const handleImg = (img) => {
        setImgList(img);
    }


    //点击添加商品按钮时进行的操作
    const addGoods = () => {
        Modal.confirm({
            title: '确认添加吗?',
            icon: <ExclamationCircleOutlined/>,  //消息框上的图片
            okText:'确认',
            cancelText:'取消',
            onOk: async () => {   //当用户点击确定按钮时执行的操作
                await addGoodsRef.current.validateFields().then(value => {
                    console.log('imgList：',imgList);
                    const imgUrl = [];  //返回的后端的图片的url地址
                    for(let i=0;i<imgList.length;i++) {
                        imgUrl.push(imgList[i].response.imgPath);
                    };
                    console.log('用户填入的数据--提交给后台的',value);
                    console.log(imgUrl.toString());

                    // 整个Form表单中要传递给传给前端的数据
                    let fanData = value;
                    fanData.goods_big_logo = imgUrl.toString();
                    console.log('返回的数据',fanData);

                    axios.post('http://localhost:8888/goods/goods',{goods:fanData}).then(result => {
                        message.success('添加成功!!');
                    })
                    addGoodsRef.current.resetFields();
                    setCurrent(current+1);
                })
            }
        })
    }

    // 获取所有的分类信息
    const [category,setCategory] = useState([]);
    const getCategory = () => {
        axios.get('http://localhost:8888/cate/categories').then(result => {
            console.log('从后台传过来的分类信息',result.data.data);
            setCategory(result.data.data);

        })
    }

    // 状态管理的副作用钩子
    useEffect(() => {
        getCategory();
    },[]);
    const options1 = category.map(d =><Option value={d.cat_id} key={d.cat_id}>{d.cat_name}</Option> )


    // 二级联动框 根据选择的一级分类展示二级分类的数据
    const [cateLeve2, setCateLeve2] = useState([]);

    const options2 = cateLeve2.map(d =><Option value={d.cat_id} key={d.cat_id}>{d.cat_name}</Option>);

    // 三级联动框 根据选择的二级分类展示三级分类的数据
    const [cateLeve3, setCateLeve3] = useState([]);
    const options3 = cateLeve3.map(d =><Option value={d.cat_id} key={d.cat_id}>{d.cat_name}</Option>);


    //Step组件的当前页面记录
    const [current,setCurrent ] = useState(0);
    const callback = (key) => {
        setCurrent(key-1);
    }

    return (
        <>
            <Button style={{width:'100%', marginBottom: '5px'}} type="primary" onClick={addGoods}>添加商品</Button>

            <Steps
                size="small"
                style={{
                    marginBottom: '10px',
                    marginTop: '10px'
                }}
                current={current}
            >
                <Step title="基本信息" />
                <Step title="商品参数" />
                <Step title="商品图片" />
                <Step title="商品添加完成" />
            </Steps>


            <Form ref={addGoodsRef}
                  labelAlign="left" //label样式
                  labelCol={{ style: { width: '100%', height: '30px' } }} //label样式
                  preserve={false}
            >
                <Tabs
                    defaultActiveKey={0}
                    onChange={callback}
                    tabPosition="left"
                    style={{backgroundColor:'white'}}
                >
                    <TabPane tab="基本信息" key="1">
                        <Form.Item
                            label='名&nbsp;&nbsp;&nbsp;称'
                            name='goods_name'
                            rules={[{
                                required: true,
                                message: '请输入商品名称'
                            }]}
                            style={{
                                margin: '15px 10px 0 15px'
                            }}
                            validateFirst
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='价&nbsp;&nbsp;&nbsp;格'
                            name='goods_price'
                            rules={[{
                                required: true,
                            }]}
                            style={{
                                margin: '15px 10px 0 15px'
                            }}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label='重&nbsp;&nbsp;&nbsp;量'
                                   name='goods_weight'
                                   rules={[{
                                       required: true,
                                   }]}
                                   style={{
                                       margin: '15px 10px 0 15px'
                                   }}>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label='数&nbsp;&nbsp;&nbsp;量'
                            name='goods_number'
                            rules={[{
                                required: true,
                            }]}
                            style={{
                                margin: '15px 10px 0 15px'
                            }}>
                            <InputNumber min={0} />
                        </Form.Item>
                        <Form.Item label='介&nbsp;&nbsp;&nbsp;绍'
                                   name='goods_introduce'
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '15px 10px 0 15px'
                                   }}>
                            <Input.TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item label={'是否促销'}
                                   name={'is_promote'}
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '15px 10px 0 15px'
                                   }}>
                            <Switch />
                        </Form.Item>
                        <Form.Item label='状&nbsp;&nbsp;&nbsp;态'
                                   name='goods_state'
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '15px 10px 30px 15px'
                                   }}
                        >
                            <Select>
                                <Select.Option value = '0'>未通过</Select.Option>
                                <Select.Option value = "1">审核中</Select.Option>
                                <Select.Option value = "2">已通过</Select.Option>
                            </Select>

                        </Form.Item>
                        <Form.Item label='一级分类'
                                   name='cat_one_id'
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '0px 10px 30px 15px',
                                       width: '30%',
                                       float: 'left'
                                   }}

                        >
                            <Select
                                onSelect = { (value) => {
                                    console.log(value);
                                    for(let i=0; i< category.length;i++) {
                                        if(category[i].cat_id === value) {
                                            setCateLeve2(category[i].children);
                                        }
                                    }
                                }}
                            >
                                {options1}
                            </Select>
                        </Form.Item>
                        <Form.Item label='二级分类'
                                   name='cat_two_id'
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '0px 10px 30px 15px',
                                       width: '30%',
                                       float: 'left'
                                   }}
                        >
                            <Select
                                onSelect = { (value) => {
                                    console.log(value);
                                    for(let i=0; i< cateLeve2.length;i++) {
                                        if(cateLeve2[i].cat_id === value) {
                                            setCateLeve3(cateLeve2[i].children);
                                        }
                                    }
                                }}
                            >
                                {options2}
                            </Select>
                        </Form.Item>
                        <Form.Item label='三级分类'
                                   name='cat_three_id'
                                   rules={[{
                                       required: false,
                                   }]}
                                   style={{
                                       margin: '0px 10px 30px 15px',
                                       width: '30%',
                                       float: 'left'
                                   }}
                        >
                            <Select >
                                {options3}
                            </Select>
                        </Form.Item>


                    </TabPane>
                    <TabPane tab="商品参数" key="2">
                        <Attribute/>
                    </TabPane>

                    <TabPane tab="商品图片" key="3">
                        <Form.Item
                            label='图片上传'
                            name='goods_big_logo'
                            style={{
                                margin: '15px 10px 0 15px'
                            }}
                        >
                            <span style={{color: 'red'}}>一次可添加两张图片</span>
                            <UploadComponent onChange={handleImg}/>
                        </Form.Item>
                    </TabPane>
                </Tabs>
            </Form>
        </>
    )
}
