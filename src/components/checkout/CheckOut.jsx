import React, { useState } from "react";
import vnpayImg from "../../assets/vnpay.png";
import vangoghImg from "../../assets/vangogh.png";

const CheckOut = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-full p-12 mt-24 flex ">
      {/* Information CheckOut */}
      <div className="w-1/2">
        {/* Chọn phương thức thanh toán */}
        <div>
          <h1 className="font-bold text-2xl text-black">Pay with</h1>
          <label className="mt-8 inline-flex items-center">
          <span
              className={`relative inline-block w-7 h-7 border-2 border-black rounded-full transition duration-300 ease-in-out ${
                isChecked ? "bg-green-500" : "bg-white"
              }`}
            >
              <input
                type="checkbox"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleCheckboxChange}
              />
              <span className="absolute inset-0 flex items-center justify-center text-white rounded-full">
                &#10003;
              </span>
            </span>
            <img src={vnpayImg} alt="" className=" ml-8 w-36 h-12" />
          </label>
        </div>

        {/* Địa chỉ ship tới */}
        <div className="mt-12 flex">
          <div className="w-1/2">
            <h2 className="font-bold text-2xl text-black">Ship to</h2>
            <p className="text-gray-500 font-medium text-md mt-4">Address</p>
            <p className="text-gray-500 font-medium text-md mt-1">City</p>
            <p className="text-gray-500 font-medium text-md mt-1">Phone</p>
          </div>

          <div className="w-1/2">
            <h2 className="font-bold text-2xl text-black">Delivery</h2>
            <p className="text-gray-500 font-medium text-md mt-4">Nhà vận chuyển</p>
            <p className="text-gray-500 font-medium text-md mt-1">Tiền ship</p>
            
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
              Ly Hong Khanh
            </span>
          </p>

          <div className="h-40 flex items-center">
            <div className="h-full">
              <img src={vangoghImg} alt="" className="h-full" />
            </div>

            <div className="h-full ml-8">
              <h2 className="mb-4 text-xl font-bold text-black">
                Glasgow All Stars
              </h2>
              <h2 className="mb-4 text-xl font-bold text-black">2400000 VND</h2>
              <p className="mb-4 text-black font-medium text-md">
                Quantity:{" "}
                <span className="text-gray-500 font-medium text-md ml-1">
                  1
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Payment Form */}
      <div className="w-1/2 h-1/2 flex justify-center">
          <div className="bg-[#F5F2FB] w-4/5 shadow-xl rounded-xl px-12 py-8">
              <div className="flex justify-between">
                  <h2 className="font-semibold text-black ">Subtotal </h2>
                  <h2 className="font-semibold text-gray-500">200000 VND</h2>
              </div>
              <div className="flex justify-between mt-2">
                  <h2 className="font-semibold text-black ">Shipping </h2>
                  <h2 className="font-semibold text-gray-500">20000 VND</h2>
              </div>

              <div className="flex justify-between mt-6">
                  <h2 className="font-semibold text-xl text-black ">Order Total </h2>
                  <h2 className="font-semibold text-xl text-black">220000 VND</h2>
              </div>
              
              <div className="w-full ">
              <button
              className={`w-full h-12 mb-4 font-semibold rounded-2xl mt-4 ${
                isChecked ? "bg-black text-white" : "bg-[#403c3c] text-white cursor-not-allowed"
              }`}
              disabled={!isChecked}
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
