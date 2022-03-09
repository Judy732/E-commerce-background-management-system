// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import LayOut from "./components/layout";
import User from "./components/user/user";
import Order from "./components/order/order";
import Login from "./components/login/login";
import PrivateRoute from "./route/router";
import Echarts from "./components/echarts/echarts";
import Good from "./components/goods/good";
import PowerList from "./components/power/powerList";
import Home from "./components/home/home";
import Category from "./components/category/Category";
import AddGoods from "./components/goods/AddGoods";
import Roles from "./components/power/role";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path={'/'} element={<Login/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/home'} element={<PrivateRoute/>}>
                      <Route path={'/home'} element={<LayOut/>}>
                          <Route path={'/home/'} element={<Home/>}/>
                          <Route path={'/home/user'} element={<User/>}/>
                          <Route path={'/home/order'} element={<Order/>}/>
                          <Route path={'/home/echart'} element={<Echarts/>}/>
                          <Route path={'/home/good'} element={<Good/>}/>
                          <Route path={'/home/cate'} element={<Category/>}/>
                          <Route path={'/home/attr'} element={<AddGoods/>}/>
                          <Route path={'/home/powerList'} element={<PowerList/>}/>
                          <Route path={'/home/role'} element={<Roles/>}/>
                      </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
