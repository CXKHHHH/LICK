import {
  Button,
  // Switch,
  Form,
  Input,
  Col,
  Row,
  Modal,
  Tree,
  Space,
  DatePicker,
  Checkbox,
} from "antd";
import { Icon } from "@iconify/react";
import {} from "react-router-dom";
import { Select } from "antd";
import { requestGetUsers, requestIncrease } from "@/service";
import { useState, useEffect } from "react";
import { Switch } from "antd-mobile";

const treeData = [
  {
    title: "总院",
    key: "0",
    children: [
      {
        title: "财务部",
        key: "0-0",
        // disabled: true,
      },
      {
        title: "收费室",
        key: "0-1",
        // disableCheckbox: true,
      },
      {
        title: "信息科",
        key: "0-2",
        // disableCheckbox: true,
      },
    ],
  },
];
const { RangePicker } = DatePicker;
const onFinish = (values) => {
  console.log("Success:", values);
};
const handleChange = (value) => {
  console.log(value);
};
const tiem = (data) => {
  console.log(data);
};
const onFailed = (value) => {
  console.log("onFailed:", value);
  requestIncrease({
    create_time: "2024-01-22T08:36:16.650Z",
    userId: "3",
    userName: "张三",
    nickName: "管理员",
    avatar: "蔡徐坤",
    email: "2096520886@qq.com",
    phonenumber: "2096520886qq",
    password: "123456",
    // srcstring: "sadada",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const User = () => {
  let [userdatas, setCount] = useState(null);
  // console.log(userdatas);
  useEffect(() => {
    requestGetUsers()
      .then((res) => {
        setCount(res.data.data.result);
        console.log();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex">
        <div className="w-[300px] h-[300px] ">
          <Form>
            <Form.Item>
              <Input
                placeholder="请输入部门名称"
                prefix={<Icon icon="gravity-ui:magnifier" />}
              />
            </Form.Item>
            <Tree
              defaultSelectedKeys={["0-1"]}
              defaultExpandAll
              treeData={treeData}
              blockNode
            />
          </Form>
        </div>
        <div className="w-[100%] h-[300px]  ml-[10px] ">
          <div className="w-[500px] h-[60px] flex ">
            <Form
              onFinish={onFinish}
              autoComplete="off"
              className="flex font-black h-[100px] flex-col"
            >
              <div className="w-[900px] flex">
                <Form.Item label="用户名称" name="nede">
                  <Input placeholder="请输入用户名称" className="w-[193px]" />
                </Form.Item>
                <Form.Item label="手机号码" name="phone" className="ml-[80px]">
                  <Input placeholder="请输入手机号码" className="w-[193px]" />
                </Form.Item>

                <Form.Item label="状态" className="ml-[80px]">
                  <Space wrap>
                    <Select
                      onChange={handleChange}
                      style={{
                        width: 200,
                      }}
                      placeholder="请选择用户状态"
                      options={[
                        {
                          value: "男",
                          label: "男子",
                        },
                      ]}
                    />
                  </Space>
                </Form.Item>
              </div>
              <div className="flex">
                <Form.Item className="time" label="创建时间">
                  <Space size={12}>
                    <RangePicker
                      onChange={tiem}
                      renderExtraFooter={() => "extra footer"}
                    />
                  </Space>
                </Form.Item>
                <Form.Item className="ml-[60px]">
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
              </div>
            </Form>
          </div>
          <div className="w-[100%] h-[30px] flex justify-between mt-[50px]">
            <Button
              className="flex text-white bg-[#13C2C2]"
              onClick={showModal}
            >
              <Icon
                icon="material-symbols-light:add"
                className="text-[20px] mt-[1px]"
              />
              <span>新增</span>
            </Button>
            <Modal
              boder-raduis={"1px"}
              width={550} // className="border-[1px] rounded-[1px]"
              className=" font-black text-[#cccccc]"
              title="添加部门"
              open={isModalOpen}
              footer={[
                <Button key="sumbit" type="primary" className="bg-[#13C2C2]">
                  确认
                </Button>,
                <Button key="back" onClick={handleCancel}>
                  取消
                </Button>,
              ]}
            >
              <div className="w-[100%] h-[340px] ">
                <Form onFinish={onFailed}>
                  <Form.Item>
                    <Button htmlType="">111</Button>
                  </Form.Item>
                  <div className="flex ml-[13px]">
                    <Form.Item label="用户名" name="username">
                      <Input
                        className="w-[150px]"
                        placeholder="请输入用户名(用于登录) "
                      />
                    </Form.Item>
                    <Form.Item
                      className="ml-[9px]"
                      label="用户密码"
                      name="password"
                    >
                      <Input.Password className="w-[150px] " />
                    </Form.Item>
                  </div>
                  <div className="flex">
                    <Form.Item label="用户昵称" name="nickName">
                      <Input
                        className="w-[150px]"
                        placeholder="请输入用户昵称"
                      />
                    </Form.Item>
                    <Form.Item
                      className="ml-[9px]"
                      label="归属部门"
                      name="deptName"
                    >
                      <Space wrap>
                        <Select
                          style={{
                            width: 150,
                          }}
                          placeholder="请选择用户状态"
                          options={[
                            {
                              value: "财务部",
                              label: "财务部",
                            },
                            {
                              value: "收费室",
                              label: "收费室",
                            },
                            {
                              value: "信息科",
                              label: "信息科",
                            },
                          ]}
                        />
                      </Space>
                    </Form.Item>
                  </div>
                  <div className="flex ml-[10px]">
                    <Form.Item label="手机号码" name="phonenumber">
                      <Input
                        className="w-[150px] "
                        placeholder="请输手机号码"
                      />
                    </Form.Item>
                    <Form.Item
                      className="ml-[20px]"
                      label="电子邮箱"
                      name="email"
                    >
                      <Input
                        className="w-[150px] "
                        placeholder="请输入电子邮箱"
                      />
                    </Form.Item>
                  </div>
                  <div className="flex  ml-[10px]">
                    <Form.Item label="用户性别" name="">
                      <Space wrap>
                        <Select
                          style={{
                            width: 150,
                          }}
                          placeholder="请选择性别"
                          options={[
                            {
                              value: "男",
                              label: "男",
                            },
                            {
                              value: "女",
                              label: "女",
                            },
                          ]}
                        />
                      </Space>
                    </Form.Item>
                    <Form.Item className="ml-[23px]" label="显示排序">
                      <div>
                        <span>
                          <input type="radio" name="a" value={"正常"} />
                          <span className="ml-[5px] font-serif">正常</span>
                        </span>
                        <span className="ml-[20px]">
                          <input type="radio" name="a" value={"停用"} />
                          <span className="ml-[5px] font-serif">停用</span>
                        </span>
                      </div>
                    </Form.Item>
                  </div>
                  <Form.Item label="角色" name="" className="ml-[37px]">
                    <Space wrap>
                      <Select
                        style={{
                          width: 150,
                        }}
                        placeholder="请选择角色"
                        options={[
                          {
                            value: "公",
                            label: "公",
                          },
                          {
                            value: "王",
                            label: "王",
                          },
                        ]}
                      />
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </Modal>
            <div className="flex w-[50px] justify-between">
              <span className="w-[20px] h-[20px] border-[1px] border--[#CCCCCC]   rounded-[50px] flex">
                <Icon
                  icon="gravity-ui:magnifier"
                  className=" text-center text-[#A8A4C7] flex m-auto text-[10px]"
                />
              </span>
              <span className="w-[20px] h-[20px] border-[1px] border--[#CCCCCC]   rounded-[50px] flex">
                <Icon
                  icon="material-symbols:autorenew-rounded"
                  className=" text-center text-[#A8A4C7] flex m-auto text-[10px]"
                />
              </span>
            </div>
          </div>
          <div className="mt-[10px]">
            <Row className=" font-black text-[rgb(204,204,204)]">
              <Col span={1} className=" text-center">
                <Checkbox />
              </Col>
              <Col span={2} className="text-center ">
                用户编号
              </Col>
              <Col span={2} className=" text-center">
                用户名称
              </Col>
              <Col span={2} className="text-center">
                用户昵称
              </Col>
              <Col span={3} className=" text-center">
                头像
              </Col>
              <Col span={2} className="  text-center">
                部门
              </Col>
              <Col span={2} className="  text-center">
                手机号码
              </Col>
              <Col span={2} className="  text-center">
                用户状态
              </Col>
              <Col span={4} className="  text-center">
                创建时间
              </Col>
              <Col span={4} className="  text-center">
                操作
              </Col>
            </Row>
            {userdatas?.map((item) => {
              console.log(userdatas);
              return (
                <Row className="  text-[rgb(204,204,204)] h-[90px] leading-[90px]">
                  <Col span={1} className=" text-center">
                    <Checkbox />
                  </Col>
                  <Col span={2} className="text-center ">
                    {item.userId}
                  </Col>
                  <Col span={2} className=" text-center">
                    {item.userName}
                  </Col>
                  <Col span={2} className="text-center">
                    {item.nickName}
                  </Col>
                  <Col span={3} className=" text-center">
                    头像
                  </Col>
                  <Col span={2} className="  text-center">
                    {item.deptName}
                  </Col>
                  <Col span={2} className="  text-center"></Col>
                  <Col span={2} className="  text-center">
                    <Switch
                      defaultChecked
                      handleBg="#2c2c2c"
                      style={{
                        "--checked-color": "#00b578",
                        "--height": "20px",
                        "--width": "35px",
                      }}
                    />
                  </Col>
                  <Col span={4} className="  text-center">
                    {item.createTime}
                  </Col>
                  <Col
                    span={4}
                    className="  text-center cursor-pointer  text-[#8BB9FF] text-[10px] font-extralight flex justify-center"
                  >
                    <span className="w-[55px] flex ">
                      <span className="w-[20px] flex justify-center items-center">
                        <Icon icon="solar:pen-2-bold-duotone" />
                      </span>
                      <span>修改 </span>
                    </span>
                    <span className="w-[55px] flex ">
                      <span className="w-[20px] flex justify-center items-center">
                        <Icon icon="iconoir:key-back" rotate={1} />
                      </span>
                      <span type="primary">重置 </span>
                    </span>
                  </Col>
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
