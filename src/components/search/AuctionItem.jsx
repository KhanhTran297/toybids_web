import React, { useEffect } from 'react';
import currentPriceImg from "../../assets/dollar.png";
import minPriceImg from "../../assets/auction.png";
import startTimeImg from "../../assets/starttime.png";
import overTimeImg from "../../assets/overtime.png";

const AuctionItem = ({ item }) => {
  const {
    product: {
      category,
      name,
      
    },
    currentPrice,
    minBidPrice,
    startDate,
    endDate
  } = item;
  const test = () =>{
    console.log(item)
  }
  
  return (
    <div className="w-3/4 mt-4 bg-[#52AB98] rounded-3xl p-4 flex">
      {/* Image */}
      <div className="w-1/5 bg-white rounded-xl flex justify-center items-center">
        <img
          src={item.product.mainImage}
          alt=""
          className="w-full object-fit rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="w-4/5 ml-8 rounded-xl px-2">
        <h1 className="ml-8 font-bold text-3xl text-white">{name}</h1>
        <h3 className="ml-8 text-black font-semibold ">
          Category: &nbsp;&emsp;&emsp;&emsp;{" "}
          <span className="text-white">{category.categoryName}</span>
        </h3>
        <div className="mt-1 flex items-center">
          <img src={currentPriceImg} alt="" className="w-6 h-6" />
          <h3 className="ml-2 text-black font-semibold">
            Current Price: &ensp; &emsp;
            <span className="text-white">{currentPrice} VND</span>
          </h3>
        </div>
        <div className="mt-2 flex items-center">
          <img src={minPriceImg} alt="" className="w-6 h-6" />
          <h3 className="ml-2 text-black font-semibold">
            Min Bid Price: &ensp; &emsp;
            <span className="text-white">{minBidPrice} VND</span>
          </h3>
        </div>
        <div className="mt-2 flex items-center">
          <img src={startTimeImg} alt="" className="w-6 h-6" />
          <h3 className="ml-2 text-black font-semibold">
            Start Time: &emsp;&emsp;&emsp;
            <span className="text-white">{startDate}</span>
          </h3>
        </div>
        <div className="mt-2 flex items-center">
          <img src={overTimeImg} alt="" className="w-6 h-6" />
          <h3 className="ml-2 text-black font-semibold">
            End Time: &ensp;&emsp;&emsp;&emsp;
            <span className="text-white">{endDate}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
