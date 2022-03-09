import React, {useEffect, useState} from "react";
import {Form, Input, DatePicker, Radio, Modal, message, Select} from "antd";
import axios from "axios";

const { Option } = Select;

export default function AddAttribute(props) {
    const addAttributeRef = React.createRef();

    const [catLevel3,setcatLevel3] = useState([]);
    const getCatLevel3 = () => {
        let level = 3;
        axios.get(`http://localhost:8888/cate/categories/${level}`).then(result => {
            setcatLevel3(result.data.data);
            console.log(result.data.data,'------------')
        })
    }
    useEffect(() => {
        getCatLevel3();
    },[])
    const catOption = catLevel3.map(d =><Option value={d.cat_id} key={d.cat_id}>{d.cat_name}</Option> )

    return (
        <>
            <Modal
                title="添加分类"
                visible={props.visible}
                onCancel={() => props.closeForm()}
                cancelText={'取消'}
                onCancel={()=>props.closeForm()}
                okText={'确定'}
            >
                <Form ref={addAttributeRef}>
                    <Form.Item label='属性名称'
                               name='attr_name'
                               rules={[{
                                   required:true,
                                   message:'请输入分类属性名称'
                               }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='分类编号'
                        name='cat_id'
                        rules={[{
                            required:true,
                            message:'请输入分类编号'
                        }]}
                    >
                        <Select>
                            {catOption}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
