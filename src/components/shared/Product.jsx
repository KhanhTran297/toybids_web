import PropTypes from "prop-types";
import { Image } from "antd";

const Product = (props) => {
  return (
    <div className=" relative flex flex-col w-full gap-2 p-3 pt-4 bg-slate-300 shadow-xl hover:bg-slate-700 rounded-2xl cursor-pointer ">
      <div className="Picture w-full flex justify-center">
        <Image.PreviewGroup
          items={[
            props.mainImage,
            props.subImage1,
            props.subImage2,
            props.subImage3,
          ]}
        >
          <Image width={280} src={props.mainImage} className=" rounded-2xl" />
        </Image.PreviewGroup>
      </div>
      <div
        className="flex flex-col gap-1 cursor-pointer"
        onClick={props.eventOnClick}
      >
        <p className=" text-base font-medium ">{props.name}</p>
        <p className=" text-sm ">Start Bid Price: {props.bid}</p>
      </div>
    </div>
  );
};

Product.propTypes = {};

export default Product;
