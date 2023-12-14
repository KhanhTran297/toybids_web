import { useState } from "react";
import { Input, Select, Button, DatePicker, Upload, message } from "antd";
import axios from "axios";
import "./AddProductPage.css";
import dayjs from "dayjs";

const { Option } = Select;

const AddProductPage = () => {
  const [imageData, setImageData] = useState([]);
  const [formData, setFormData] = useState({
    bidTime: "",
    description: "",
    name: "",
    categoryId: null,
    startBidPrice: null,
    minBidPrice: 10000,
    status: 1,
    startDate: null,
    mainImage: "",
    subImage1: "",
    subImage2: "",
    subImage3: "",
  });
  const dateFormat = "DD/MM/YYYY";
  //XỬ LÍ THAY ĐỔI DỮ LIỆU TRONG FORM
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = `${dateString} 00:00:00`;
    console.log(formattedDate);
    setFormData({ ...formData, startDate: formattedDate });
  };
  //HÀM LẤY TOKEN TỪ LOCALSTRONGE
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("userToken"); // Thay your_token_key bằng key bạn đã sử dụng để lưu token trong localStorage
  };
  //HÀM XỬ LÍ VÀ UPLOAD ẢNH

  const handleImageUpload = async (file, key) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("type", "avatar");
    const data = { file: file, type: "avatar" };
    try {
      const response = await axios.post(
        "https://e-auction-api.up.railway.app/v1/file/upload/s3",
        formData,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`, // Sử dụng token từ localStorage
          },
        }
      );
      const imageUrl = response.data.data.filePath;
      console.log(imageUrl);
      setImageData((prevImageData) => [...prevImageData, { [key]: imageUrl }]);
      message.success("Upload ảnh thành công!");
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Đã xảy ra lỗi khi upload ảnh!");
    }
  };
  console.log("hello", imageData);
  //HÀM XỬ LÍ KHI NHẤN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi formData lên server hoặc thực hiện các hành động cần thiết ở đây
    try {
      //LẤY HÌNH ẢNH UPLOAD
      const mainImageUrl = imageData[0].subImageupload;
      const subImageUrl = [
        imageData[1].subImageupload,
        imageData[2].subImageupload,
        imageData[3].subImageupload,
      ].filter((url) => !!url); //danh sách ảnh phụ

      // Tạo dữ liệu sản phẩm với các URL hình ảnh đã được upload
      const productData = {
        bidTime: formData.bidTime,
        description: formData.description,
        name: formData.name,
        categoryId: formData.categoryId,
        startBidPrice: formData.startBidPrice,
        status: formData.status,
        startDate: formData.startDate,
        mainImage: mainImageUrl,
        subImage1: subImageUrl.length > 0 ? subImageUrl[0] : "",
        subImage2: subImageUrl.length > 1 ? subImageUrl[1] : "",
        subImage3: subImageUrl.length > 2 ? subImageUrl[2] : "",
      };

      //TẠO SẢN PHẨM
      const productResponse = await axios.post(
        "https://e-auction-api.up.railway.app/v1/product/create",
        productData,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      console.log("Sản phẩm đã được tạo:", productResponse.data.data.id);
      message.success("Tạo sản phẩm thành công!");
      //SỬ DỤNG RESPONSE API ĐỂ LẤY ID TỪ PRODUCT
      const productId = productResponse.data.data.id;
      //TẠO ĐẤU GIÁ VỚI ID VỪA LẤY CỦA SẢN PHẨM
      const auctionData = {
        maxBidders: 100,
        minBidPrice: 10000,
        productId: productId,
        startDate: formData.startDate,
      };
      const auctionResponse = await axios.post(
        "https://e-auction-api.up.railway.app/v1/auction/create",
        auctionData,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        }
      );
      console.log("đấu giá đã được tạo: ", auctionResponse.data);
      message.success("Tạo đấu giá thành công!");
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm hoặc đấu giá:", error);
      message.error("Đã xảy ra lỗi khi tạo sản phẩm hoặc đấu giá!");
    }
  };

  const customRequest = async ({ file, onSuccess }) => {
    const key =
      file.uid === "-1" ? "mainImage" : `subImage${file.uid.split("-")[1]}`;
    await handleImageUpload(file, key);
    onSuccess("ok");
  };

  return (
    <div className="container">
      <div className="container_info">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Tên Sản Phẩm"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
          <Input.TextArea
            placeholder="Thông Tin"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Giá Khởi Điểm"
            value={formData.startBidPrice}
            onChange={(e) => handleChange("startBidPrice", e.target.value)}
            required
          />
          {/* <Input
            type="number"
            placeholder="Min Bid Price"
            value={formData.minBidPrice}
            onChange={(e) => handleChange("minBidPrice", e.target.value)}
            required
          /> */}
          <Input
            type="number"
            placeholder="Thời Gian Bid"
            value={formData.bidTime}
            onChange={(e) => handleChange("bidTime", e.target.value)}
            required
          />
          <Select
            style={{ width: "100%" }}
            value={formData.categoryId}
            onChange={(value) => handleChange("categoryId", value)}
            required
          >
            <Option value={1}>Anime</Option>
            <Option value={2}>Guldam</Option>
          </Select>
          <DatePicker
            placeholder="Ngày Bắt Đầu Bid"
            onChange={handleDateChange}
            style={{ width: "100%" }}
            required
            defaultValue={dayjs("01/01/2023", dateFormat)}
            format={dateFormat}
          />

          <Upload
            customRequest={customRequest}
            listType="picture-card"
            accept="image/*"
            maxCount={4}
          >
            <Button type="default">Upload Ảnh</Button>
          </Upload>

          <Button type="default" htmlType="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
