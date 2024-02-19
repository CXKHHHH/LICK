import { Input, Form, Button } from "antd";
import { Icon } from "@iconify/react";
const Index = () => {
  return (
    <>
      <Form className="flex font-bold">
        <Form.Item label="带单名称">
          <Input
            className=" border-1px rounded-[4px] w-[200px]"
            placeholder="请输入菜单名称"
          />
        </Form.Item>
        <Form.Item label="状态" className="ml-[10px]">
          <Input
            className=" border-1px rounded-[4px] w-[200px]"
            placeholder="请输入菜单名称"
          />
        </Form.Item>
        <Form.Item className="ml-[20px]">
          <div className=" flex w-[168px] justify-between">
            <Button
              type="primary"
              htmlType=""
              className="bg-[#188FFF] flex justify-around"
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
      <Button className="flex text-white bg-[#E8F4FF]">
        <Icon
          icon="material-symbols-light:add"
          className="text-[20px] mt-[1px]"
        />
        <span className="text-[#1991FF]">新增</span>
      </Button>
    </>
  );
};
export default Index;
