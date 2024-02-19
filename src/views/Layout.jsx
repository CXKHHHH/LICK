import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { requestDynamicRouting } from "@/service";
// import Add from "@/utils/dynamic";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const Department = () => {
  let [longt, setCount] = useState(null);
  let a = 6;
  useEffect(() => {
    requestDynamicRouting()
      .then((res) => {
        console.log(res);
        const router = JSON.stringify(res.data.data);
        window.sessionStorage.setItem("router", router);
        // console.log(router);
        setCount(
          res.data.data?.map((item, index) => {
            // console.log(res.data.data)
            return getItem(
              item.meta.title,
              `${item.path}`,
              <Icon icon="bx:palette" />,
              item.children.map((items) => {
                console.log(items.children);
                return getItem(
                  items.meta.title,
                  `${items.path}`,
                  <Icon icon="bx:palette" />,
                  items?.children?.map((add) => {
                    console.log();
                    return getItem(add.meta.title, `${add.path}`);
                  })
                );
              })
            );
          })
        );
      })
      .catch((err) => console.log(err));
  }, [a]);
  const addet = [getItem("首页", 20)];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const push = useNavigate();
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "red",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={addet}
          className="bg-[#304156]"
        />
        <Menu
          theme="dark"
          // defaultSelectedKeys={["1"]}
          mode="inline"
          items={longt}
          onClick={(e) => {
            if (e.keyPath[0].indexOf("/") === 0) {
              push(e.keyPath[1] + e.keyPath[0]);
            } else {
              push(e.keyPath[1] + "/" + e.keyPath[0]);
            }
            // console.log(e.keyPath[1] + "1" + e.keyPath[0]);
          }}
          className="bg-[#304156]"
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex w-[1000px] h-[50px] items-center l">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="w-[800px] h-[50px] ">
              <Breadcrumb
                items={[
                  { title: "首页" },
                  { title: "部门管理", href: "#" },
                  { title: "角色管理", href: "#" },
                ]}
                className="mt-[12px]"
              />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 560,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="mt-[30px]"
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Department;
