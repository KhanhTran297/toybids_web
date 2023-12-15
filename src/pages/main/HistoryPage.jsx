import React from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getListAuctionWinApi } from "../../api/auction";
import Product from "../../components/shared/Product";
import { useNavigate } from "react-router-dom";
const HistoryPage = (props) => {
  const { data: listAuction } = useQuery({
    queryKey: ["history"],
    queryFn: () =>
      getListAuctionWinApi().then((res) => {
        return res.data.content;
      }),
  });
  const navigate = useNavigate();
  return (
    <div className=" w-full mt-[100px] h-screen grid grid-flow-row grid-cols-[30%_30%_30%]  ">
      <div className="">
        {listAuction?.map((item, index) => {
          return (
            <Product
              key={index}
              id={item.product.id}
              mainImage={item.product.mainImage}
              subImage1={item.product.subImage1}
              subImage2={item.product.subImage2}
              subImage3={item.product.subImage3}
              name={item.product.name}
              bid={item.product.startBidPrice}
              product={item}
              eventOnClick={() => navigate(`/checkout/${item.id}`)}
            />
          );
        })}
      </div>
    </div>
  );
};

HistoryPage.propTypes = {};

export default HistoryPage;
