// 引入所需的依赖文件
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
// 引入所需要路由的页面
import Index from "@/views/Index";
let element = [
  {
    path: "/",
    element: <Navigate to="/Index"></Navigate>,
  },
  {
    path: "/Index",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Index></Index>
      </React.Suspense>
    ),
    component: React.lazy(() => import(`@/views/Index`)),
  },
];
export const RoutesContext = createContext();
const Routes = () => {
  const [routes] = useContext(RoutesContext);
  return useRoutes(routes);
};

function flatten(arr, flay = true) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const Component = React.lazy(() => import(`@/views/${arr[i].component}`));
    const path = !flay
      ? arr[i].path.charAt() === "/"
        ? arr[i].path.slice(1)
        : arr[i].path
      : arr[i].path;
    result.push({
      path: path,
      element: (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component></Component>
        </React.Suspense>
      ),
      children: arr[i].children ? flatten(arr[i].children, false) : "",
    });
  }
  return result;
}

const Router = () => {
  const noewDate = sessionStorage.getItem("router")
    ? flatten(JSON.parse(sessionStorage.getItem("router")))
    : [];
  const [routes, setRoutes] = useState([...element, ...noewDate]);
  return (
    <RoutesContext.Provider value={[routes, setRoutes]}>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
    </RoutesContext.Provider>
  );
};

export default Router;
