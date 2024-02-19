// import FoudOrder from "./views/found.order";
// import { Button } from "antd-mobile";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useRoutes,
//   Switch,
// } from "react-router-dom";
import React from "react";
// import { lazyload } from "./utils/lazyload";
// import Particle from "./views/particle";
import Router from "@/utils/dynamic";
// const Foo = React.lazy(() => import("./views/Foo"));
// const Foo = lazyload("Foo");
// const Index = lazyload("Index");
// const Department = lazyload("department");
//BrowserRouter 基于历史记录模式
//HashRouter 基于哈希模式
//Routes
//Route
//Link 组件跳转页面必须基于BrowserRouter内
// import { useUserStore } from "@/store/user";
const App = () => {
  // const UserStore = useUserStore();
  return <Router></Router>;
};
export default App;
