import { useEffect, useState } from "react";
import { requestPersonalCenter, requestModifyinformation } from "@/service";
import { Icon } from "@iconify/react";
import { ApartmentOutlined } from "@ant-design/icons";
import { Tabs, Input, Form, Radio, Button, Image } from "antd";

const onFinish = (value) => {
  console.log(value);
  requestModifyinformation({
    userId: 1,
    userName: value.username,
    nickName: value.username,
    email: value.email,
    remark: value.radio,
    phonenumber: value.phone,
    sex: 0,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const items = [
  {
    key: "1",
    label: "基本资料",
    children: (
      <div>
        <Form onFinish={onFinish}>
          <Form.Item
            label="用户昵称"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone" className="ml-[24px]">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" className="ml-[38px]">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="radio" className="ml-[38px]">
            <Radio.Group>
              <Radio value={"男"}>男</Radio>
              <Radio value={"女"}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="ml-[78px] ">
            <Button
              htmlType="保存"
              className="bg-[#13C2C2] text-white w-[60px] h-[27px] text-[10px] leading-[19px] "
            >
              保存
            </Button>
            <Button className="bg-[#F56C6C] ml-[10px] text-white w-[60px] h-[27px] text-[10px]  leading-[19px] ">
              关闭
            </Button>
          </Form.Item>
        </Form>
      </div>
    ),
  },
  {
    key: "2",
    label: "修改密码",
    children: "Content of Tab Pane 2",
  },
];
const Health = () => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    requestPersonalCenter()
      .then((res) => {
        setCount(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="flex">
        <div className="bg-[#FFFFFF] w-[300px] h-[490px] border-[2px] border-[#EFF1F5] rounded-[5px] shadow-xl">
          <h1 className="text-[20px] w-[300px] h-[60px] leading-[60px] border-b-[1px] pl-[20px]">
            个人信息
          </h1>
          <span className="w-[300px] h-[150px] flex justify-center items-center">
            <Image
              width={120}
              className=""
              // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              src="https://img0.baidu.com/it/u=2608552038,2566026826&fm=253&fmt=auto&app=138&f=PNG?w=343&h=341"
            />
          </span>
          <div>
            <ul className="w-[260px] m-auto">
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <Icon icon="bi:person-fill" className="mt-[13px]" />
                  用户名称
                </span>
                <span> {count?.user.userName}</span>
              </li>
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <Icon icon="mdi:cellphone" className="mt-[13px]" />
                  手机号码
                </span>
                <span> {count?.user.phonenumber}</span>
              </li>
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <Icon icon="akar-icons:envelope" className="mt-[13px]" />
                  邮箱
                </span>
                <span> {count?.user.phonenumber}</span>
              </li>
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <ApartmentOutlined className="mt-[3px]" />
                  所属部门
                </span>
                <span> {count?.user.deptName}</span>
              </li>
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <Icon
                    icon="f7:person-2-fill"
                    hFlip={true}
                    className="mt-[13px]"
                  />
                  所属角色
                </span>
                <span> {count?.roles[0]}</span>
              </li>
              <li className="flex justify-between h-[40px] border-b-[1px] leading-[40px]">
                <span className="flex">
                  <Icon
                    icon="healthicons:calendar"
                    hFlip={true}
                    className="mt-[13px]"
                  />
                  创建日期
                </span>
                <span> {count?.user.createTime}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className=" bg-[#FFFFFF]  w-[900px] h-[490px] ml-[20px] border-[2px] border-[#EFF1F5] rounded-[5px]  shadow-xl">
          <h1 className="text-[20px] w-[900px] h-[60px] leading-[60px] border-b-[1px] pl-[20px]">
            基本资料
          </h1>
          <div className="ml-[10px] w-[880px] ">
            <Tabs
              defaultActiveKey="1"
              items={items}
              itemHoverColor="#ffffff"
              className=" h-[420px]"
            />
            ;
          </div>
        </div>
      </div>
    </>
  );
};
export default Health;
