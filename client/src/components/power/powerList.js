import {Cascader,Table,Button,Tag} from "antd";
import axios from "axios";
import React,{useState,useEffect} from "react";
const{Column}=Table;


export default function PowerList(){

    const[permission,setPermission]=useState([]);
    const[perOptions,setPerOptions]=useState([]);

    useEffect(()=>{
        getPerList();
    },[]);

    useEffect(()=>{
        onChange();
    },[])

    useEffect(()=>{
        getPermission()
    },[]);

    const getPermission=()=>{
        axios.get('http://localhost:8888/power/allTable').then(result=>{
            setPermission(result.data.data);
            console.log(result.data.data)
        })
    };

    const getPerList=()=>{
        axios.get('http://localhost:8888/power/all').then(result=>{
            setPerOptions(result.data.data);
            console.log(result.data.data)
        })
    };

    const onChange=(value)=>{
        axios.post('http://localhost:8888/power/selOne',{value}).then(result=>{
            setPermission(result.data.data)
            console.log(result.data.data)
        }).catch(err=>{
            console.log(err);
        })

    }

    return(
        <>
            <div>
                <Cascader options={perOptions}  placeholder={'请选择'} onChange={onChange} style={{float:'left' ,marginBottom:'20px',width:'300px'}}/>
                <Button type={'primary'} >搜索</Button>
            </div>

            <Table border  dataSource={permission}>
                <Column dataIndex={'id'} key={'id'} title={'编号'} align={'center'}/>
                <Column dataIndex={'authName'} key={'authName'} title={'权限名称'} align={'center'}/>
                <Column dataIndex={'ps_a'} key={'ps_a'} title={'路径'} align={'center'}/>
                <Column dataIndex={'level'} key={'level'} title={'权限等级'} align={'center'} render={level=>(
                    <>
                        <Tag key={level} style={{
                            backgroundColor:level===1?"red":(level===2?'blue':'green')
                        }} >
                            {level+'级'}
                        </Tag>
                    </>
                )}
                />
            </Table>
        </>
    )
}
