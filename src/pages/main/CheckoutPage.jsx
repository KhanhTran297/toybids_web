import React from "react";
import CheckOut from "../../components/checkout/CheckOut";
import { useQuery } from "@tanstack/react-query";
import { getAuctionByIdApi } from "../../api/auction";
import { useParams } from "react-router-dom";

const CheckOutPage = () => {
  const { auctionId } = useParams();
  const { data: AuctionDetail } = useQuery({
    queryKey: ["getAuctionById", auctionId],
    queryFn: () =>
      getAuctionByIdApi(auctionId).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="w-full">
      <CheckOut auction={AuctionDetail}></CheckOut>
    </div>
  );
};

export default CheckOutPage;
