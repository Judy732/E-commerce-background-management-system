import {Layout, Menu, Breadcrumb, Button, Pagination} from "antd";
import {EllipsisOutlined,UserOutlined,CrownOutlined,ShoppingOutlined,FundOutlined,ProfileOutlined,UnorderedListOutlined} from "@ant-design/icons"
import {NavLink, Route, BrowserRouter, Routes, Link, Outlet, useLocation} from "react-router-dom";
import {useState} from "react";

const {Header,Content,Sider} = Layout
const {SubMenu} = Menu

function LayOut() {
    //侧边框关闭开启
    const [collapsed,setCollapsed] = useState(false)

    const onCollapse = ()=> {
        setCollapsed(!collapsed)
    }

    //路径集合
    const breadcrumbNameMap = {
        '/user':'用户列表',
        '/order':'订单列表',
        '/echarts':'数据列表',
        '/good':'商品列表',
        '/cate':'商品分类',
        '/attr':'添加商品',
        '/echart':'数据统计',
        '/powerList':'权限列表',
        '/role':'角色列表'
    }

    //获取当前路径
    const location = useLocation()
    //将获取到的当前路径进行格式化 剥离/组成数组
    const pathSnippets = location.pathname.split('/').filter(i=>i)
    //去掉数组中的home首页
    let path = []
    path.push(pathSnippets.shift())
    //对数组中的路径进行切片查询 返回子面包屑
    const extraBreadcrumbItems = pathSnippets.map((_,index)=> {
        const url = `/${pathSnippets.slice(0,index+1).join('/')}`
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        )
    })
    //对面包屑路径进行拼接
    const breadcrumbItems = [
        <Breadcrumb.Item key='home'>
            <Link to={'/home'}>首页</Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)


    return (
            <Layout>
                <Header width='200px'>
                    <div style={{float:'left',color:'white',fontSize:'18px'}}>
                        电商后台管理系统
                    </div>
                    <div style={{marginLeft:'520px',color:'white',float:'left'}}>用户 : {sessionStorage.username}</div>
                    <div style={{float:'right'}}>
                        <Button type={'text'} style={{color:'white'}}>
                            <NavLink to={'/login'}>退出</NavLink>
                        </Button>
                    </div>
                </Header>
                <Layout>
                    <Sider collapsible={true} collapsed={collapsed} onCollapse={onCollapse}>
                        <Menu
                            theme='dark'
                            mode='inline'
                            style={{height:'100%',borderRight:0}}
                        >
                            <SubMenu key='sub1' icon={<UserOutlined/>} title='用户管理'>
                                <Menu.Item key='1' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'user'}>用户列表</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub2' icon={<CrownOutlined/>} title='权限管理'>
                                <Menu.Item key='2' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'role'}>角色列表</NavLink>
                                </Menu.Item>
                                <Menu.Item key='3' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'powerList'}>权限列表</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub3' icon={<ShoppingOutlined />} title='商品管理'>
                                <Menu.Item key='4' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'good'}>商品列表</NavLink>
                                </Menu.Item>
                                <Menu.Item key='5' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'cate'}>商品分类</NavLink>
                                </Menu.Item>
                                <Menu.Item key='8' icon={<UnorderedListOutlined/>}>
                                    <NavLink to={'attr'}>添加商品</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub4' icon={<ProfileOutlined />} title='订单管理'>
                                <Menu.Item key='6' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'order'}>订单列表</NavLink>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key='sub5' icon={<FundOutlined />} title='数据统计'>
                                <Menu.Item key='7' icon={<UnorderedListOutlined />}>
                                    <NavLink to={'echart'}>数据列表</NavLink>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding:'0 24px 24px'}}>
                        <Breadcrumb style={{margin:'16px 0',textAlign:'left'}}>
                            {breadcrumbItems}
                        </Breadcrumb>
                        <Content
                            style={{
                                color:'black',
                                minHeight:610,
                                margin:0,
                                padding:16,
                                // border:'solid',
                                backgroundColor:'white'
                            }}
                        >
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
    )
}

export default LayOut
