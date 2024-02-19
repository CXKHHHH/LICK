import { Input, Form, Space, Select, Button, Table, Modal, Upload } from "antd";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { requestExpertmanagement } from "@/service";
import styled from "styled-components";
import { Stepper } from "antd-mobile";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const Crent = styled.div`
  text-align: center;
`;
const columns = [
  {
    title: <Crent>ID</Crent>,
    dataIndex: "ID",
  },
  {
    title: <Crent>专家名称</Crent>,
    dataIndex: "name",
  },
  {
    title: <Crent>职称</Crent>,
    dataIndex: "duty",
  },
  {
    title: <Crent>医生代码</Crent>,
    dataIndex: "dai",
  },
  {
    title: <Crent>排序ID</Crent>,
    dataIndex: "sortID",
  },
  {
    title: <Crent>头像</Crent>,
    dataIndex: "photo",
  },
  {
    title: <Crent>科室</Crent>,
    dataIndex: "department",
  },
  {
    title: <Crent>操作</Crent>,
    dataIndex: "operate",
  },
];
const Index = () => {
  const [imgsrc, setImg] = useState(null);
  console.log(imgsrc);
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setTimeout(() => {
      setImg(newFileList[0].thumbUrl);
      console.log(newFileList[0]);
      const a = newFileList[0].originFileObj;
      console.log(a);
      const form = new FormData();
      form.append("key", uuidv4());
      form.append("token", JSON.parse(localStorage.getItem("ok")).uploadToken);
      form.append("file", newFileList[0].originFileObj);
      axios.post("https://upload-z2.qiniup.com ", form).then((res) => {
        console.log(res);
      });
    }, 500);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onFinish = () => {
    console.log(JSON.parse(localStorage.getItem("ok"))?.baseURL);
    // console.log(value);
    // requestAddexperts({
    //   id: 99,
    //   doctorName: value.doctorName,
    //   introduction: value.introduction,
    //   title: value.title,
    //   skilled: value.skilled,
    //   images: imgsrc,
    //   deptid: 199,
    //   orderNum: value.orderNum,
    //   doctorCode: 1929,
    // })
  };
  const [data, setCount] = useState(null);
  useEffect(() => {
    requestExpertmanagement()
      .then((res) => {
        let add = res.data.data.result.sort((a, b) => a.id - b.id);
        console.log(res);
        let uit = [];
        for (let i in add) {
          uit.push({
            // key: 1 + i,
            ID: <Crent>{add[i].id}</Crent>,
            name: <Crent>{add[i].doctorName}</Crent>,
            duty: <Crent className="w-[100px] m-auto">{add[i].title}</Crent>,
            dai: <Crent>{add[i].doctorCode}</Crent>,
            sortID: <Crent>{add[i].orderNum}</Crent>,
            photo: (
              <Crent>
                <img src={add[i]?.images} alt="" className="w-[100px] m-auto" />
              </Crent>
            ),
            department: <Crent>{add[i].skilled}</Crent>,
            operate: (
              <div className="  text-center cursor-pointer  text-[#8BB9FF] text-[10px] font-extralight flex justify-center">
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
                  <span type="primary">删除 </span>
                </span>
              </div>
            ),
          });
        }
        setCount(uit);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    axios
      .get("http://192.168.68.174:8081/upload/token")
      .then((res) => {
        console.log(res.data.result.baseURL);
        console.log(res.data.result.uploadToken);
        let Token = JSON.stringify(res.data.result);
        console.log(Token);
        window.localStorage.setItem("ok", Token);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Form className="flex font-bold">
        <Form.Item label="专家名称">
          <Input className=" border-1px rounded-[4px] w-[200px]" />
        </Form.Item>
        <Form.Item label="医生代码" className="ml-[10px]">
          <Input className=" border-1px rounded-[4px] w-[200px]" />
        </Form.Item>
        <Form.Item label="科室" className="ml-[10px]">
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
          <div className=" flex w-[168px] justify-between">
            <Button
              key="1"
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
            <Button key="2" className="flex  bg-white">
              <Icon
                icon="material-symbols-light:change-circle-outline"
                className="mt-[1px] text-[20px]  w-[20px]"
              />
              <span>重置</span>
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={showModal}
        className="flex text-[#B3E1BB] bg-[#F0F9EB] border-[#E4F4DC]"
      >
        <Icon
          icon="solar:pen-2-linear"
          hFlip={true}
          className="text-[16px] mt-[2px]"
        />
        <span>新增</span>
      </Button>

      <Modal
        title="添加医生"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="专家名称"
            name="doctorName"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="职称" className="ml-[40px]" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="医生代码" className="ml-[13px]" name="doctorCode">
            <Input />
          </Form.Item>
          <Form.Item label="擅长" className="ml-[40px]" name="skilled">
            <Input />
          </Form.Item>
          <Form.Item label="排序ID" className="ml-[30px]" name="orderNum">
            <Stepper
              key={1}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </Form.Item>
          <Form.Item label="头像" className="ml-[40px]" name="images">
            <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item label="科室" className="ml-[40px]" name="deptid">
            <Input />
          </Form.Item>
          <Form.Item label="简介" className="ml-[40px]" name="introduction">
            <Input />
          </Form.Item>
          <Form.Item className="ml-[40px]">
            <Button htmlType="" className="bg-pink-100">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Index;
