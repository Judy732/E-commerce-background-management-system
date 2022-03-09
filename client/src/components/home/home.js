import EChartsReact from "echarts-for-react";
import * as echarts from 'echarts';
import {Layout, Col, Row, Button} from "antd";
import {ECharts} from "echarts/core";
import axios from "axios";
import {useEffect, useState} from "react";

function Home() {

    const [oneData,setOneData] = useState([])
    const [twoData,setTwoData] = useState([])
    const [threeData,setThreeData] = useState([])
    const [fourData,setFourData] = useState([])
    const [pieData,setPieData] = useState([])

    const getData = ()=> {
        axios.get('http://localhost:8888/report/type2').then(result=> {
            setOneData(result.data.dataAll.oneData)
            setTwoData(result.data.dataAll.twoData)
            setThreeData(result.data.dataAll.threeData)
            setFourData(result.data.dataAll.fourData)
            setPieData(result.data.data)
        })
    }

    useEffect(()=> {
        getData()
    },[])

    const getLineOption=()=>{
        const lineOption={
            tooltip:{
                show:true,
                trigger:'axis',
            },
            xAxis:{
                data:['2012','2013','2014','2015','2016'],
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
                    name:'牛奶',
                    type:'line',
                    smooth:true,
                    data:oneData,
                    style:{
                        fill:'#BA55D3',
                    }
                },
                {
                    name:'坚果',
                    type:'line',
                    smooth:true,
                    data:twoData,
                },
                {
                    name:'巧克力',
                    type:'line',
                    smooth:true,
                    data:threeData,
                },
                {
                    name:'花生糖',
                    type:'line',
                    smooth:true,
                    data:fourData,
                },
            ],
            color: ['#FFE4E1', '#E9967A', '#8B4513', '#FFDAB9']
        };
        return lineOption;
    }

    const getPieOption=()=>{
        const pieOption= {
            series: [{
                // name: '用户来源',
                type: 'pie',
                left: 200,
                center: ['100', '50%'],
                // radius: ['40%', '70%'],
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
            // legend: {
            //     orient: 'vertical',
            //     y: 'center',
            //     right: '20',
            //     top:'160px',
            //     align: 'right',
            //     data: ['牛奶','坚果','巧克力','花生糖'],
            //     textStyle: {
            //         color: 'black',
            //         fontSize: '16'
            //     }
            // },
            color: ['#FFE4E1', '#E9967A', '#8B4513', '#FFDAB9']
        }
        return pieOption;
    }

    return (
        <>
            <Layout>
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
            </Layout>
        </>
    )
}

export default Home
