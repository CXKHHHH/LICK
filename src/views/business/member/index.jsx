import {
  Input,
  Form,
  Button,
  Space,
  Select,
  DatePicker,
  Modal,
  Table,
} from "antd";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import {
  requestBodyparts,
  requestAddbodyparts,
  requestDeletebodyparts,
} from "@/service";
import { Stepper } from "antd-mobile";
const { RangePicker } = DatePicker;

const columns = [
  {
    title: <div className=" text-center">ID</div>,
    dataIndex: "ID",
  },
  {
    title: <div className=" text-center">部位</div>,
    dataIndex: "age",
  },
  {
    title: <div className=" text-center">排序ID</div>,
    dataIndex: "address",
  },
  {
    title: <div className=" text-center">添加时间</div>,
    dataIndex: "time",
  },
  {
    title: <div className=" text-center">操作</div>,
    dataIndex: "cao",
  },
];

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const longr = (value) => {
    requestAddbodyparts({ id: 0, bodypart: value.bu, orderNum: 0 })
      .then((res) => {
        console.log(res);
        func();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [data, setCount] = useState(null);
  const func = () => {
    requestBodyparts().then((res) => {
      console.log("add", res.data.data.result);
      let add = res.data.data.result;
      let uit = [];
      for (let i = 0; i < add.length; i++) {
        uit.push({
          key: i,
          ID: <div className=" text-center">{add[i].id}</div>,
          age: <div className=" text-center">{add[i].bodypart}</div>,
          address: <div className=" text-center">0</div>,
          time: <div className=" text-center">{add[i].create_time}</div>,
          cao: (
            <div className="  text-center cursor-pointer  text-[#8BB9FF] text-[10px] font-extralight flex justify-center">
              <span className="w-[55px] flex ">
                <span className="w-[20px] flex justify-center items-center">
                  <Icon icon="solar:pen-2-bold-duotone" />
                </span>
                <span>修改 </span>
              </span>
              <span
                className="w-[55px] flex "
                onClick={() => {
                  let ade = add[i].id;
                  console.log(add[i].id);
                  requestDeletebodyparts(ade)
                    .then((res) => {
                      console.log(res);
                      func();
                    })
                    .catch((err) => console.log(err));
                }}
              >
                <span className="w-[20px] flex justify-center items-center">
                  <Icon icon="iconoir:key-back" rotate={1} />
                </span>
                <span type="primary">重置 </span>
              </span>
            </div>
          ),
        });
      }
      setCount(uit);
    });
  };
  useEffect(() => {
    func();
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <Form className="flex font-bold">
        <Form.Item label="手机">
          <Input className=" border-1px rounded-[4px] w-[200px]" />
        </Form.Item>
        <Form.Item label="昵称" className="ml-[10px]">
          <Input className=" border-1px rounded-[4px] w-[200px]" />
        </Form.Item>
        <Form.Item label="地区" className="ml-[10px]">
          <Space wrap>
            <Select
              style={{
                width: 200,
              }}
              placeholder="请选择"
              options={[
                {
                  value: "男",
                  label: "男子",
                },
              ]}
            />
          </Space>
        </Form.Item>
        <Form.Item className="time ml-[10px]" label="创建时间">
          <Space size={12} direction="vertical">
            <RangePicker />
          </Space>
        </Form.Item>
      </Form>
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
      <div className=" flex justify-between mt-[20px] w-[340px]">
        <Button
          className="flex text-[#1BC7CB] bg-[#E7F9F9] border-[#B3EBEB]"
          onClick={showModal}
        >
          <Icon
            icon="material-symbols-light:add"
            className="text-[20px] mt-[1px]"
          />
          <span>新增</span>
        </Button>
        <Modal title="添加" open={isModalOpen} footer={[<></>]}>
          <Form onFinish={longr}>
            <Form.Item label="部位" name="bu" rules={[{ required: true }]}>
              <Input placeholder="请输入部位" />
            </Form.Item>
            <Form.Item label="排序ID" name="pai">
              <Stepper
                key={1}
                onChange={(value) => {
                  console.log(value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleCancel}>取消</Button>
              <Button htmlType="">确定</Button>
            </Form.Item>
          </Form>
        </Modal>
        <Button className="flex text-[#B3E1BB] bg-[#F0F9EB] border-[#E4F4DC]">
          <Icon
            icon="solar:pen-2-linear"
            hFlip={true}
            className="text-[16px] mt-[2px]"
          />
          <span>修改</span>
        </Button>
        <Button className="flex text-[#A8E0E3] bg-[#E7F9F9] border-[#DFF7F7]">
          <Icon
            icon="material-symbols:delete-outline"
            hFlip={true}
            className="text-[20px] mt-[1px]"
          />
          <span>删除</span>
        </Button>
        <Button className="flex text-[#F56F98] bg-[#FEF0F0] border-[#FBC4C4]">
          <Icon
            icon="material-symbols-light:download-sharp"
            className="text-[20px] mt-[1px]"
          />
          <span>导出</span>
        </Button>
      </div>
      <Table
        className="mt-[20px]"
        rowSelection={rowSelection}
        bordered
        columns={columns}
        dataSource={data}
      />
    </>
  );
};
export default Index;
