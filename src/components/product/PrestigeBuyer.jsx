import React from "react";
import { useNavigate } from "react-router-dom";

const PrestigeBuyer = (props) => {
  const { idSeller, name, avt } = props;
  const navigate = useNavigate();
  return (
    <div className="flex w-[1225px] h-[200px] items-start gap-6 p-6 relative rounded-[30px] overflow-hidden border border-solid border-black">
      <div className="relative flex flex-col items-start self-stretch w-1/2 gap-6 px-0">
        <div className="inline-flex items-start gap-[8px] relative flex-[0_0_auto]">
          <img
            className="relative w-[80px] h-[80px] rounded-full"
            alt="Ellipse"
            src={avt}
          />
          <div className="flex flex-col w-[318px] items-start gap-[8px]  relative">
            <div className="relative w-fit mt-[-1.00px]  font-bold text-black text-xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
              {name}
            </div>
            <button
              className="flex w-[216px] h-[52px] items-start gap-[10px] px-[45px] py-[17px] relative bg-[#52ab98] rounded-[16px] cursor-pointer"
              onClick={() => navigate(`/guestprofile/${idSeller}`)}
            >
              <div className="relative flex-1 self-stretch mt-[-1.00px]  font-bold text-white text-[14px] text-center tracking-[0] leading-[normal]">
                Visit profile
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestigeBuyer;
