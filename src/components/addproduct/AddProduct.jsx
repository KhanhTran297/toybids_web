import { Input, Modal, Select, Upload, DatePicker, InputNumber } from "antd";
import React, { useState } from "react";
const { TextArea } = Input;
const { RangePicker } = DatePicker;

import { PlusOutlined } from "@ant-design/icons";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddProduct = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto pb-10">
      <div className="w-[50%] flex-col gap-6 flex">
        <div className="w-full h-auto text-4xl font-bold text-black ">
          Add item
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-auto font-bold text-black text-bold">
            Item title:
          </div>
          <Input placeholder="Please enter name's product" size="large" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full h-auto font-bold text-black text-bold">
            {" "}
            Images (Maximum 4 pictures)
          </div>
          <div>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-auto font-bold text-black text-bold">
            Item category:
          </div>
          <Select
            placeholder="Please select item category"
            className="w-[50%]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-auto font-bold text-black text-bold">
            Description:
          </div>
          <TextArea
            showCount
            maxLength={2000}
            onChange={onChange}
            placeholder="Please enter description"
            style={{
              height: 300,
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-auto font-bold text-black text-bold">Bid</div>

          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col gap-2 ">
              <div className="font-medium text-gray-500">Starting bid </div>
              <InputNumber
                addonBefore="+"
                addonAfter="VNĐ"
                className="w-[50%]"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <div className="font-medium text-gray-500">Time: </div>
              <RangePicker showTime className="w-[50%]" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
