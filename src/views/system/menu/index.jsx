import { Form, Input, Space, Select, Button, Table } from "antd";

import { requestMenudata, requestSeedetails } from "@/service";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const columns = [
  {
    title: "菜单名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "图标",
    dataIndex: "age",
    key: "age",
    render: (text, row, index) => (
      <span onClick={() => handleExpand(row)}>
        <Icon icon="arcticons:apex-legends" className="ml-[20px]" />
      </span>
    ),
  },
  {
    title: "类型",
    dataIndex: "lei",
    key: "lei",
  },
  {
    title: "排序",
    dataIndex: "pai",
    key: "pai",
  },
  {
    title: "权限标识",
    dataIndex: "quan",
    key: "quan",
  },
  {
    title: "路由地址",
    dataIndex: "quan",
    key: "quan",
  },
  {
    title: "组件路径",
    dataIndex: "path",
    key: "path",
  },
  {
    title: "显示",
    dataIndex: "lu",
    key: "lu",
  },
  {
    title: "状态",
    dataIndex: "xian",
    key: "xian",
  },
  {
    title: "操作",
    dataIndex: "zhuang",
    key: "zhuang",
  },
];
const handleExpand = (index) => {
  // 根据index决定展示哪个嵌套表格组件，或者根据其他条件动态决定。
  console.log(index.pai);
  requestSeedetails()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // 例如，你可以根据index来返回不同的嵌套表格组件。
};
const Index = () => {
  const [reuslet, setCount] = useState(null);
  useEffect(() => {
    requestMenudata()
      .then((res) => {
        console.log(res.data.data);
        let add = res.data.data;

        let conet = [];
        for (let i = 0; i < 5; i++) {
          conet.push({
            key: i + 1,
            name: add[i]?.menuName,
            age: <Icon icon="arcticons:apex-legends" />,
            lei: (
              <Button className="bg-[#F0F9EB] text-[#97CA53] border-[#E1F3D8]">
                目录
              </Button>
            ),
            pai: add[i]?.menuId,
            quan: "",
            path: "/" + add[i]?.path,
            lu: "显示",
            xian: (
              <Button className="bg-[#E7F9F9] text-[#59CED7] border-[#D7F5F5]">
                正常
              </Button>
            ),
            zhuang: (
              <div className="text-[10px] flex text-[#23C4C3] cursor-pointer">
                <span className="flex">
                  <Icon icon="solar:pen-2-linear" className="mt-[2px]" />
                  <span>修改</span>
                </span>
                <span className="ml-[10px] flex">
                  <Icon
                    icon="material-symbols-light:add"
                    className="mt-[2px]"
                  />
                  <span>新增</span>
                </span>
                <span className="ml-[10px] flex">
                  <Icon icon="arcticons:trashcan" className="mt-[2px]" />
                  <span>删除</span>
                </span>
              </div>
            ),
          });
        }
        setCount(conet);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const expandedRowRender = () => {
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        path: "2014-12-24 23:12:00",
        name: "This is production name",
        zhuang: "Upgraded: 56",
      });
    }
    return (
      <Table columns={columns} bordered dataSource={data} pagination={false} />
    );
  };

  return (
    <>
      <div>
        <Form className="flex font-bold">
          <Form.Item label="带单名称">
            <Input
              className=" border-1px rounded-[4px] w-[200px]"
              placeholder="请输入菜单名称"
            />
          </Form.Item>
          <Form.Item label="状态" className="ml-[10px]">
            <Space wrap>
              <Select
                className=" rounded-[4px]"
                placeholder="菜单状态"
                style={{
                  width: 200,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                ]}
              />
            </Space>
          </Form.Item>
          <Form.Item className="ml-[20px]">
            <div className=" flex w-[168px] justify-between">
              <Button
                type="primary"
                htmlType=""
                className="bg-[#13C2C2] flex justify-around"
              >
                <Icon
                  icon="gravity-ui:magnifier"
                  className=" text-center text-white flex m-auto text-[15px] w-[20px]"
                />
                <span>搜索</span>
              </Button>
              <Button className="flex  bg-white">
                <Icon
                  icon="material-symbols-light:change-circle-outline"
                  className="mt-[1px] text-[20px]  w-[20px]"
                />
                <span>重置</span>
              </Button>
            </div>
          </Form.Item>
        </Form>
        <div>
          <Button
            onClick={() => {
              console.log(reuslet);
            }}
            className="flex  bg-[#E7F9F9] border-[#B8EDED] text-[#65CCD6]"
          >
            <Icon
              icon="material-symbols-light:add"
              className="text-[20px] mt-[1px]"
            />
            <span>新增</span>
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            expandable={{
              expandedRowRender,
            }}
            bordered
            dataSource={reuslet}
          />
        </div>
      </div>
    </>
  );
};
export default Index;
