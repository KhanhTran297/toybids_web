import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getListAccount } from "../../api/account";
import queryString from "query-string";
const DescriptionItem = ({ title, content }) => (
  <div className=" mb-[7px] text-[14px] leading-[1.5715] ">
    <p className=" inline-block mr-[8px]">{title}:</p>
    {content}
  </div>
);
const AccountManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const { data: listAccount, isLoading: loadingListAccount } = useQuery({
    queryKey: ["listAccount", queryParam],
    queryFn: () =>
      getListAccount(queryParam).then((res) => {
        const modifiedData = res.data.content.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        });
        return modifiedData;
      }),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = async (values) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        // Kiểm tra xem thuộc tính có bằng undefined không
        if (values[key] === undefined) {
          // Gán thuộc tính bằng ""
          values[key] = "";
        }
      }
    }
    setSearchParams(values);
  };
  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      render: (_, record) => <Avatar src={record.avatar} />,
    },
    {
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Create date",
      dataIndex: "createDate",
      key: "createDate",
      align: "center",
      render: (_, record) => {
        const rawtime = dayjs(record.createdDate, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        var status = " ";
        var bgcss = "";
        switch (record.status) {
          case 1:
            status = "Active";
            bgcss = "bg-green-500";
            break;
          case 2:
            status = "Pending";
            bgcss = "bg-yellow-500";
            break;
          case 3:
            status = "Lock";
            bgcss = "bg-red-500";
            break;
          default:
            break;
        }
        return (
          <div
            className={`${bgcss} p-1 rounded-md place-items-center flex justify-center`}
          >
            <p>{status}</p>
          </div>
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   align: "center",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <EyeOutlined
    //         onClick={showDrawer}
    //         className=" hover:text-blue-400 cursor-pointer"
    //       />
    //     </Space>
    //   ),
    // },
  ];
  return (
    <div
      className="flex flex-col"
      style={{
        padding: 24,
        minHeight: 360,
        background: bg,
      }}
    >
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
        <Form layout="inline" onFinish={handleSearch} form={form}>
          <Form.Item label="Fullname" name="fullName">
            <Input defaultValue={searchParams.get("fullName")}></Input>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={searchParams.get("email")}></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
          <Form.Item>
            <Button
              className=" bg-red-600 text-white hover:!text-white hover:!border-none"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="">
        <Table
          dataSource={listAccount}
          columns={columns}
          bordered
          pagination={{
            defaultPageSize: 5,
          }}
          loading={loadingListAccount}
        ></Table>
        <Drawer
          width={640}
          placement="right"
          // closable={false}
          onClose={onClose}
          open={open}
          // extra={
          //   <Space>
          //     <Button onClick={onClose}>Cancel</Button>
          //   </Space>
          // }
        >
          <p
            className=" block mb-[16px] text-[16px] leading-[1.5175]"
            style={{
              marginBottom: 24,
            }}
          >
            User Profile
          </p>
          <p className="site-description-item-profile-p">Personal</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Full Name" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Account"
                content="AntDesign@example.com"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="HangZhou" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Country" content="China🇨🇳" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Birthday" content="February 2,1900" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Website" content="-" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Message"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Contacts</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
              <DescriptionItem
                title="Phone Number"
                content="+86 181 0000 0000"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Github"
                content={
                  <a href="http://github.com/ant-design/ant-design/">
                    github.com/ant-design/ant-design/
                  </a>
                }
              />
            </Col>
          </Row>
        </Drawer>
      </div>
    </div>
  );
};

export default AccountManagement;
