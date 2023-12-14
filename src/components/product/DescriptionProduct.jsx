import { Table, Tabs } from "antd";
import React from "react";
import { getBidHistoryById } from "../../api/bid";
import { useQuery } from "@tanstack/react-query";

const DescriptionProduct = (props) => {
  const { des, idAuction } = props;
  const onChange = (key) => {
    console.log(key);
  };
  const { data: bidHistory } = useQuery({
    queryKey: ["bidHistory", idAuction],
    queryFn: getBidHistoryById,
    enabled: !!idAuction,
  });
  const columns = [
    {
      title: "Bidder",
      dataIndex: "bidder",
      key: "bidder",
      render: (text) => (
        <span>
          {text.charAt(0)}**{text.charAt(text.length - 1)}
        </span>
      ),
    },
    {
      title: "Bid Amount",
      dataIndex: "bidamount",
      key: "bidamount",
    },
    {
      title: "Bid Time",
      dataIndex: "bidtime",
      key: "bidtime",
    },
  ];

  const bidHistoryData = bidHistory?.data?.content
    ? bidHistory.data.content
        .map((bid, index) => ({
          key: index,
          bidder: bid.bidder.fullName,
          bidamount: bid.bidPrice,
          bidtime: 1,
        }))
        .reverse()
    : [];
  const items = [
    {
      key: "1",
      label: "Description",
      children: <div dangerouslySetInnerHTML={{ __html: des }} />,
    },
    {
      key: "2",
      label: "Bid history",
      children: (
        <Table
          columns={columns}
          dataSource={bidHistoryData}
          pagination={false}
        />
      ),
    },
  ];

  return (
    <div className="flex w-[1225px] h-auto items-start gap-6 p-6 relative rounded-[30px] overflow-hidden border border-solid border-black">
      <Tabs className="" onChange={onChange} type="card" items={items} />
    </div>
  );
};

export default DescriptionProduct;
