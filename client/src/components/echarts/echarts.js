import React from "react";
import EChartsReact from "echarts-for-react";
import {Layout,Row,Col}from 'antd';
import axios from 'axios';
import {useState,useEffect} from "react";


export default function Line(){

    const [hdData,setHdData]=useState([]);
    const [hnData,setHnData]=useState([]);
    const [hbData,setHbData]=useState([]);
    const [xbData,setXbData]=useState([]);
    const [qtData,setQtData]=useState([]);
    const [pieData,setPieData]=useState([]);


    useEffect(()=>{
        getHdData();

    },[]);


    const getHdData=()=> {
        axios.get('http://localhost:8888/report/type1').then(result => {
            setHdData(result.data.data.hdData)
            setHnData(result.data.data.hnData)
            setQtData(result.data.data.qtData)
            setXbData(result.data.data.xbData)
            setHbData(result.data.data.hbData)
            setPieData(result.data.data1)
        })

    };

    const getLineOption=()=>{
        const lineOption={
            title:{
                text:'用户来源',
                textStyle:{
                    color:'black',
                    fontSize:14,
                    align:'center'
                },

            },
            tooltip:{
                show:true,
                trigger:'axis',
            },
            legend:{
                backgroundColor:"#969696",
                borderColor:'#bbffaa',
                borderWidth:1,
                paddingTop:5,
                itemWidth:30,
                itemHeight:15,
                itemGap:15,
                textStyle:{
                    color:'white',
                    fontSize:15
                },
                data:['华东','华南','华北','西部','其他']
            },
            xAxis:{
                data:['2017','2018','2019','2020','2021'],
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#A9A9A9'
                    }
                },
            },
            yAxis:{
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:'#A9A9A9'
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#A9A9A9'
                    }
                }
            },
            series:[
                {
                    name:'华东',
                    type:'line',
                    smooth:true,
                    data:hdData,
                    style:{
                        fill:'#BA55D3',
                    }
                },
                {
                    name:'华南',
                    type:'line',
                    smooth:true,
                    data:hnData,
                },
                {
                    name:'华北',
                    type:'line',
                    smooth:true,
                    data:hbData,
                },
                {
                    name:'西部',
                    type:'line',
                    smooth:true,
                    data:xbData,
                },
                {
                    name:'其他',
                    type:'line',
                    smooth:true,
                    data:qtData,
                },
            ],
            color:[`#BA55D3`,`#99FF33`,`#FFB6C1`,`#66FFFF`,`#AAAAAA`]
        };
        return lineOption;
    }


    const getPieOption=()=>{
        const pieOption= {
            title: {
                x: '60',
                text: '用户来源',
                bottom: '15',
                left: 260,
                textStyle: {
                    color: '#369'
                }
            },
            series: [{
                name: '用户来源',
                type: 'pie',
                left: 200,
                center: ['100', '40%'],
                radius: ['40%', '70%'],//两个圆的班级
                avoidLabelOverlap: false,
                startAngle: 45,
                label : {
                    normal : {
                        formatter: '{b}:{c}: ({d}%)',
                        textStyle : {
                            fontSize : 10
                        }
                    }
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold',
                        color: '#FFFFFF'

                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: pieData
            }],
            legend: {
                orient: 'vertical',
                y: 'center',
                right: '10',
                top:'280px',
                align: 'right',
                data: ['华北','华南','华东','西部','其他'],
                textStyle: {
                    color: 'black',
                    fontSize: '16'
                }
            },
            color: ['#1E90FF', '#90EE90', '#87CEFA', '#FF8C00', '#FFA500']
        }
        return pieOption;
    }
    return(
        <>
            <Row style={{align:'center'}}>
                <Col span={12} style={{align:'center'}}>
                    <EChartsReact
                        option={getLineOption()}
                        style={{margin:'auto',height:'500px'}}
                        className={'react_for_echarts'}
                    />
                </Col>
                <Col span={11} style={{align:'center'}}>
                    <EChartsReact
                        option={getPieOption()}
                        style={{height:'380px' ,marginTop:'50px'}}
                        className={'react_for_echarts'}
                    />
                </Col>
            </Row>
        </>
    )
}
