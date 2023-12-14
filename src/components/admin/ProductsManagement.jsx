import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Form, Input, Modal } from "antd";
import queryString from "query-string";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListProduct } from "../../api/product";
import Product from "../shared/Product";
const ProductsManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState();
  const handleSearch = async (values) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        // Kiểm tra xem thuộc tính có bằng undefined không
        if (values[key] === undefined) {
          // Gán thuộc tính bằng ""
          values[key] = "";
        }
      }
    }
    setSearchParams(values);
  };
  const handleSetproductDetail = async (product) => {
    setProductDetail(product);
  };
  const handleOpenModal = async (product) => {
    await handleSetproductDetail(product);
    showModal();
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const { data: listProduct } = useQuery({
    queryKey: ["listProduct", queryParam],
    queryFn: () =>
      getListProduct(queryParam).then((res) => {
        console.log("res", res.data.content);
        return res.data.content;
      }),
  });
  return (
    <div
      className=" relative flex flex-col h-full"
      style={{
        padding: 24,
        background: bg,
      }}
    >
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid">
        <Form layout="inline" onFinish={handleSearch} form={form}>
          <Form.Item label="Productname" name="name">
            <Input defaultValue={searchParams.get("name")}></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
          <Form.Item>
            <Button
              className=" bg-red-600 text-white hover:!text-white hover:!border-none"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="  h-full overflow-y-scroll grid grid-flow-row grid-cols-[32%_32%_32%] gap-5 ">
        {listProduct?.map((item, index) => (
          <Product
            key={index}
            id={item.id}
            mainImage={item.mainImage}
            subImage1={item.subImage1}
            subImage2={item.subImage2}
            subImage3={item.subImage3}
            name={item.name}
            bid={item.startBidPrice}
            product={item}
            eventOnClick={() => handleOpenModal(item)}
          />
        ))}
      </div>
      <Modal
        title="Product detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
      >
        <div className=" flex flex-col gap-2">
          <div className=" flex flex-col gap-2">
            <p className=" font-semibold text-2xl border-b-[1px] border-solid border-black">
              Product:
            </p>
            <div className=" flex flex-col gap-2">
              <p className=" text-base font-medium">
                Name: {productDetail?.name}
              </p>
              <p className=" text-base font-medium">
                Description: {productDetail?.description}
              </p>
              <p className=" text-base font-medium">
                Start Bid Price: {productDetail?.startBidPrice}
              </p>
              <p className=" text-base font-medium">
                Bid time: {productDetail?.bidTime}
              </p>
              <p className=" text-base font-medium">
                Created Date {productDetail?.createdDate}
              </p>
              <p className=" text-base font-medium">
                Category: {productDetail?.category?.categoryName}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className=" font-semibold text-2xl border-b-[1px] border-solid border-black">
              Seller
            </p>
            <div className=" flex flex-col gap-2">
              <Avatar src={productDetail?.seller?.avatar} size={70}></Avatar>
              <p className=" text-base font-medium">
                Fullname: {productDetail?.seller?.fullName}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsManagement;
