import { Table, Tabs, DatePicker } from "antd";
import React from "react";
const { RangePicker } = DatePicker;

const TransactionHistory = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Final amount",
      dataIndex: "finalamount",
      key: "finalamount",
      sorter: (a, b) => a.finalamount - b.finalamount,
    },
    {
      title: "Purchase date",
      dataIndex: "purchasedate",
      key: "purchasedate",
    },
    {
      title: "Exp. Delivery",
      dataIndex: "delivery",
      key: "delivery",
    },
  ];
  const data = [
    {
      key: "1",
      image:
        "https://hoanglongmobile.vn/uploads/2023/08/S22_Ultra_Carousel_GroupKV_MO.jpg",
      productname: "Samsung Galaxy S20 Ultra",
      finalamount: "900.000",
      purchasedate: "May 3rd, 2021",
      delivery: "Delivery to SPKT",
    },
    {
      key: "2",
      image:
        "https://hoanglongmobile.vn/uploads/2023/08/S22_Ultra_Carousel_GroupKV_MO.jpg",
      productname: "Samsung Galaxy S20 Ultra",
      finalamount: "800.000",
      purchasedate: "May 21th, 2021",
      delivery: "Delivery to SPKT",
    },
    {
      key: "3",
      image:
        "https://hoanglongmobile.vn/uploads/2023/08/S22_Ultra_Carousel_GroupKV_MO.jpg",
      productname: "Samsung Galaxy S20 Ultra",
      finalamount: "700.000",
      purchasedate: "May 21th, 2021",
      delivery: "Delivery to SPKT",
    },
  ];
  const items = [
    {
      key: "1",
      label: "BID",
      children: <Table columns={columns} dataSource={data} bordered />,
    },
    {
      key: "2",
      label: "SOLD",
      children: <Table columns={columns} dataSource={data} bordered />,
    },
  ];
  return (
    <div className="flex flex-col w-full items-center ">
      <div className="w-[60%] flex flex-col items-center">
        <RangePicker showTime className="w-[50%]" bordered />
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
          className="w-full"
          centered
          size="large"
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
