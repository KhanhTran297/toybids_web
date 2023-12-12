import { Avatar } from "antd";
import React from "react";
import KT from "../../assets/KT.jpg";
import AB from "../../assets/AB.jpg";
import LK from "../../assets/LK.jpg";
import Ton from "../../assets/Ton.jpg";

const AboutUsPage = () => {
  return (
    <div className="pt-[120px] w-full items-center justify-center flex flex-col gap-6">
      <h1 className="text-5xl font-semibold text-[#52AB98]">About Us</h1>
      <div className="w-[1000px]  text-center text-xl font-normal">
        Welcome to our "About Us" page! We are the 147 Team, where we take pride
        in introducing you to a unique and exciting e-commerce auction
        experience. We're not just your typical auction website; we are a
        destination for those who have a passion for toy models.
      </div>
      <h2 className="text-3xl font-semibold ">Group 147</h2>
      <div className="flex flex-row justify-between px-8 py-6 border-2 border-solid border-[#2B6777] w-[1000px] h-[300px]">
        <div className="bg-[#C8E8D4] w-[150px] h-full flex flex-col justify-center items-center gap-4 p-4 ">
          <Avatar shape="circle" src={KT} size="large"></Avatar>
          <div className="text-lg font-medium text-center">
            Tran Minh Gia Khanh
          </div>
          <div className="text-lg text-center text-[#736F6F]">FE dev</div>
        </div>
        <div className="bg-[#C8E8D4] w-[150px] h-full flex flex-col justify-center items-center  p-4 gap-4">
          <Avatar shape="circle" src={AB} size="large"></Avatar>
          <div className="text-lg font-medium text-center">Bui Ngoc Anh</div>
          <div className="text-lg text-center text-[#736F6F]">FE dev</div>
        </div>
        <div className="bg-[#C8E8D4] w-[150px] h-full flex flex-col justify-center items-center gap-4 p-4">
          <Avatar shape="circle" src={LK} size="large"></Avatar>
          <div className="text-lg font-medium text-center">Ly Hong Khanh</div>
          <div className="text-lg text-center text-[#736F6F]">Team leader</div>
        </div>
        <div className="bg-[#C8E8D4] w-[150px] h-full flex flex-col justify-center items-center gap-4 p-4">
          <Avatar shape="circle" src={KT} size="large"></Avatar>
          <div className="text-lg font-medium text-center">
            Pham Vu Dang Khoa
          </div>
          <div className="text-lg text-center text-[#736F6F]">
            Database design
          </div>
        </div>
        <div className="bg-[#C8E8D4] w-[150px] h-full flex flex-col justify-center items-center gap-4 p-4">
          <Avatar shape="circle" src={Ton} size="large"></Avatar>
          <div className="text-lg font-medium text-center">
            Nguyen Huynh Thanh Toan
          </div>
          <div className="text-lg text-center text-[#736F6F]">BE dev</div>
        </div>
      </div>
      <h2 className="text-3xl font-semibold ">ToyBids</h2>
      <div className="flex flex-col gap-[1px] w-[1000px] justify-start">
        <h3 className="font-bold">Our Mission:</h3>
        <div>
          {" "}
          We ensure that everyone, especially those passionate about toys and
          models, can experience the joy of owning unique and rare products
          through our auction system. Our mission is to connect the toy and
          model enthusiast community, creating an online space where they can
          share their passion and shop for new treasures.
        </div>
      </div>
      <div className="flex flex-col gap-[1px] w-[1000px] justify-start">
        <h3 className="font-bold">Community Engagement:</h3>
        <div>
          {" "}
          We carefully review every partner and product supplier to ensure that
          we are bringing the highest quality products to our community.
        </div>
      </div>
      <div className="flex flex-col gap-[1px] w-[1000px] justify-start">
        <h3 className="font-bold">Operating Philosophy:</h3>
        <div>
          {" "}
          We are committed to providing a safe, transparent, and fair auction
          platform for all members. We prioritize integrity and build a
          community where everyone can enjoy the thrill of shopping and
          collecting toy models.
        </div>
      </div>
      <div className="w-[1000px] mb-6">
        Join us in experiencing a unique e-commerce auction space where your
        passion and excitement become a reality. Thank you for being part of
        ToyBids Community!
      </div>
    </div>
  );
};

export default AboutUsPage;
