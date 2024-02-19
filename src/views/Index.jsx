// import { Button } from "antd-mobile";
// import { useNavigate, useSearchParams } from "react-router-dom";
//useNavigate 此hook可以返回一个跳转页面的方法
// searchParams 查看传入的值
// setSearchParams 修改传入的值
import { LockOutlined } from "@ant-design/icons";
import img from "@/img/pic.jpg";
import styled from "styled-components";
import { Button, Checkbox, Form, Input } from "antd";
import { Icon } from "@iconify/react";
import { getFundRank, requestDynamicRouting } from "@/service";
import { useNavigate } from "react-router-dom";
import { RoutesContext } from "@/utils/dynamic";
import { useContext } from "react";
import React from "react";
// import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
const Backimg = styled.div`
  background-image: url(${img});
  background-size: cover;
`;
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
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Index = () => {
  const [, setRoutes] = useContext(RoutesContext);
  console.log(setRoutes);
  const navigate = useNavigate();
  const OnFinish = (values) => {
    console.log("Success:", values);
    getFundRank({ username: values.username, password: values.password })
      .then((res) => {
        window.sessionStorage.setItem("Token", res.data.data);
        requestDynamicRouting().then((res) => {
          console.log(res);
          const router = JSON.stringify(res.data.data);
          window.sessionStorage.setItem("router", router);
          setRoutes(flatten(res.data.data));
          // console.log(res.data.data);
        });
        navigate("/system/user");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Backimg className="w-[100%] h-[695px] flex justify-center">
        <div className="w-[350px] h-[365px] bg-white m-auto rounded-[4px]">
          <h1 className="w-[350px] text-[18px] font-black text-center h-[70px] leading-[70px] text-[#707070] flex justify-center">
            西藏阜康肿瘤医院 <span className="w-[10px] h-[10px ] flex"></span>
            管理系统
          </h1>
          <div>
            <Form
              onFinish={OnFinish}
              onFinishFailed={onFinishFailed}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="username"
                className="ml-[27px]"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  placeholder="账号"
                  className="border-[1px] rounded-[5px] h-[38px] w-[300px] flex m-auto"
                  prefix={<Icon icon="mdi:account" />}
                ></Input>
              </Form.Item>
              <Form.Item
                className="ml-[27px]"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  placeholder="密码"
                  className=" border-[1px] rounded-[5px] h-[38px] w-[300px] m-auto flex"
                  type="password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item className="w-[500px]">
                <div className="flex h-[28px] ">
                  <Input
                    placeholder="验证码"
                    className=" rounded-[5px] h-[38px] w-[189px] flex ml-[27px]"
                  ></Input>
                  <div className="w-[100px] border-[1px] h-[38px] rounded-[5px] ml-[8px]"></div>
                </div>
              </Form.Item>
              <Form.Item className="text-[#409EFF] h-[23px] ml-[27px]">
                <Form.Item>
                  <Checkbox className="text-[#409EFF]">记住密码</Checkbox>
                </Form.Item>
              </Form.Item>
              <Form.Item className="ml-[27px]">
                <Button
                  htmlType="submit"
                  className="m-auto w-[300px] flex bg-blue-400 login-form-button justify-center  "
                  type="primary"
                >
                  <span>提交</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Backimg>
    </>
  );
};
export default Index;
