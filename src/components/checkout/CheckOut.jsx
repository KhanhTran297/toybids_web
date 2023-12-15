import React, { useState } from "react";
import vnpayImg from "../../assets/vnpay.png";
import ncbImg from "../../assets/ncb.jpg";
import visa from "../../assets/visa.png";
import mastercard from "../../assets/mastercard.png";
import { Radio, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createTransactionApi } from "../../api/transaction";
import { createpaymentApi } from "../../api/payment";
import { redirect, useNavigate } from "react-router-dom";

const CheckOut = (props) => {
  const [bankCode, setBankCode] = useState("NCB");
  const navigate = useNavigate();
  const { mutateAsync: createTransaction } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: createTransactionApi,
    onSuccess: (res) => {
      message.success("Create Transaction succeessfully");
    },
  });
  const { mutateAsync: createPayment } = useMutation({
    mutationKey: ["createpayment"],
    mutationFn: createpaymentApi,
    onSuccess: (res) => {
      message.success("Create payment succeessfully");
    },
  });
  const onChange = (e) => {
    setBankCode(e.target.value);
  };
  const [address, setAddress] = useState("");
  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  const handleCalculateTotal = (currentPrice) => {
    return currentPrice + 20000;
  };
  const totalPrice = handleCalculateTotal(
    parseFloat(props?.auction?.currentPrice)
  );
  const handleCreatePayment = async () => {
    const data = {
      address: address,
      auctionId: props?.auction?.id,
      paymentMethodId: 2,
    };
    createTransaction(data).then((res) => {
      const dataPayment = {
        transactionId: res?.data?.auction?.id,
        paymentPrice: totalPrice,
        bankCode: bankCode,
      };
      createPayment(dataPayment).then((res) => {
        console.log(res);
        window.location.href = res.data;
      });
    });
  };
  return (
    <div className="w-full p-12 mt-24 flex ">
      {/* Information CheckOut */}
      <div className="w-1/2">
        {/* Chọn phương thức thanh toán */}
        <div>
          <h1 className="font-bold text-2xl text-black">Pay with</h1>
          <Radio.Group onChange={onChange} value={bankCode}>
            <Radio value={"NCB"}>
              <img src={ncbImg} alt="" className="h-12" />
            </Radio>
            <Radio value={"VISA"}>
              <img src={visa} alt="" className="h-12" />
            </Radio>
            <Radio value={"MasterCard"}>
              <img src={mastercard} alt="" className="h-12" />
            </Radio>
          </Radio.Group>
        </div>

        {/* Địa chỉ ship tới */}
        <div className="mt-12 flex flex-row gap-4">
          <div className="w-1/2">
            <h2 className="font-bold text-2xl text-black">Ship to</h2>
            <div className="">
              <p className="text-gray-500 font-medium text-md mt-4">Address</p>
              <input
                placeholder="Input address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className=" border-solid border-[1px] border-gray-300 rounded-xl w-full h-12 px-4 mt-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
              ></input>
            </div>
          </div>

          <div className="w-1/2">
            <h2 className="font-bold text-2xl text-black">Delivery</h2>
            <p className="text-gray-500 font-medium text-md mt-4">
              Nhà vận chuyển: AhaMove
            </p>
            <p className="text-gray-500 font-medium text-md mt-1">
              Tiền ship: 20000 VND
            </p>
          </div>
        </div>

        {/* Xem review sản phẩm và shipping */}
        <div className="mt-12">
          <h2 className="font-bold text-2xl text-black">
            Review item and shipping
          </h2>
          <p className="text-black font-medium text-md my-4">
            Seller:{" "}
            <span className="text-gray-500 font-medium text-md ">
              {" "}
              {props.auction?.seller?.fullName}
            </span>
          </p>

          <div className="h-40 flex items-center">
            <div className="h-full">
              <img
                src={props?.auction?.product?.mainImage}
                alt=""
                className="h-full"
              />
            </div>

            <div className="h-full ml-8">
              <h2 className="mb-4 text-xl font-bold text-black">
                {props?.auction?.product?.name}
              </h2>
              <h2 className="mb-4 text-xl font-bold text-black">
                {props?.auction?.currentPrice} VND
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Payment Form */}
      <div className="w-1/2 h-1/2 flex justify-center">
        <div className="bg-[#F5F2FB] w-4/5 shadow-xl rounded-xl px-12 py-8">
          <div className=" mb-3">
            <img src={vnpayImg} alt="" className="h-12" />
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold text-black ">Subtotal </h2>
            <h2 className="font-semibold text-gray-500">
              {" "}
              {props?.auction?.currentPrice} VND
            </h2>
          </div>
          <div className="flex justify-between mt-2">
            <h2 className="font-semibold text-black ">Shipping </h2>
            <h2 className="font-semibold text-gray-500">20000 VND</h2>
          </div>

          <div className="flex justify-between mt-6">
            <h2 className="font-semibold text-xl text-black ">Order Total </h2>
            <h2 className="font-semibold text-xl text-black">
              {totalPrice}
              VND
            </h2>
          </div>

          <div className="w-full ">
            <button
              className="w-full h-12 mb-4 font-semibold rounded-2xl mt-4  bg-black text-white"
              onClick={() => handleCreatePayment()}
            >
              Confirm and Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
