import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Popconfirm, Table, message } from "antd";
import dayjs from "dayjs";
import queryString from "query-string";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  createCategoryApi,
  deleteCategoryApi,
  editCategoryApi,
  getListCategory,
} from "../../api/category";
import TextArea from "antd/es/input/TextArea";
const CategoryManagement = (props) => {
  const { bg } = props;
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isEdit, setIsEdit] = useState(false);
  const [categoryId, setCategoryId] = useState();
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
  const queryClient = useQueryClient();
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalConfirm = (categoryId) => {
    setCategoryId(categoryId);
    setIsModalConfirmOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkConfirm = () => {
    setIsModalConfirmOpen(false);
    deleteCategory(categoryId);
  };
  const handleCancelConfirm = () => {
    setIsModalConfirmOpen(false);
  };
  const handleCancel = () => {
    setIsEdit(false);
    editForm.resetFields();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    if (isEdit) {
      const editData = {
        id: categoryId,
        categoryDescription: values.categoryDescription,
        categoryImage: "",
        categoryName: values.categoryName,
        categoryOrdering: 1,
        status: 1,
      };
      editCategory(editData).then(() => {
        handleCancel();
      });
    } else {
      const data = {
        categoryDescription: values.categoryDescription,
        categoryImage: "",
        categoryKind: 1,
        categoryName: values.categoryName,
        categoryOrdering: 1,
        parentId: null,
        status: 1,
      };
      createCategory(data).then(() => {
        handleCancel();
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCheckEdit = async () => {
    setIsEdit(true);
    showModal();
  };

  const handleSetFormEditModal = async (
    categoryName,
    categoryDescription,
    categoryId
  ) => {
    await handleCheckEdit();
    setCategoryId(categoryId);
    editForm.setFieldsValue({
      categoryName: categoryName,
      categoryDescription: categoryDescription,
    });
  };
  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["creatCategory"],
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listCategory", queryParam]);
      message.success("Create category successfully");
    },
  });
  const { mutateAsync: deleteCategory } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listCategory", queryParam]);
      message.success("Delete category successfully");
    },
  });
  const { mutateAsync: editCategory } = useMutation({
    mutationKey: ["EditCategory"],
    mutationFn: editCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listCategory", queryParam]);
      message.success("Edit category successfully");
    },
  });
  const { data: listCategory, isLoading: loadingCategory } = useQuery({
    queryKey: ["listCategory", queryParam],
    queryFn: () =>
      getListCategory(queryParam).then((res) => {
        const modifiedData = res.data.content.map((item, index) => {
          return {
            ...item,
            key: index,
          };
        });
        return modifiedData;
      }),
  });
  const handleReset = () => {
    setSearchParams({});
    form.resetFields();
  };
  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
    },
    {
      title: "Category Description",
      dataIndex: "categoryDescription",
      key: "categoryDescription",
      align: "center",
    },
    {
      title: "Create date",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (_, record) => {
        const rawtime = dayjs(record.createdDate, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => {
        var status = " ";
        var bgcss = "";
        switch (record.status) {
          case 1:
            status = "Active";
            bgcss = "bg-green-500";
            break;
          case 2:
            status = "Pending";
            bgcss = "bg-yellow-500";
            break;
          case 3:
            status = "Lock";
            bgcss = "bg-red-500";
            break;
          default:
            break;
        }
        return (
          <div
            className={`${bgcss} p-1 rounded-md place-items-center flex justify-center`}
          >
            <p>{status}</p>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex flex-row gap-2">
          <Button
            onClick={() =>
              handleSetFormEditModal(
                record.categoryName,
                record.categoryDescription,
                record.id
              )
            }
          >
            Edit
          </Button>
          <Button danger onClick={() => showModalConfirm(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div
      className="flex flex-col h-full"
      style={{
        padding: 24,
        background: bg,
      }}
    >
      <div className=" mb-2 pb-2 border-b-[1px] border-black border-solid flex flex-row justify-between">
        <Form layout="inline" onFinish={handleSearch} form={form}>
          <Form.Item label="Category Name" name="name">
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
        <Button onClick={() => showModal()}>Create</Button>
      </div>
      <div className="">
        <Table
          dataSource={listCategory}
          columns={columns}
          bordered
          pagination={{
            defaultPageSize: 5,
          }}
          loading={loadingCategory}
        ></Table>
      </div>
      <Modal
        title={isEdit ? "Edit Category" : "Create Category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {" "}
        <Form
          name="basic"
          form={editForm}
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="categoryName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category Description"
            name="categoryDescription"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <TextArea />
          </Form.Item>
          <div className=" flex justify-end flex-row w-full">
            <Form.Item className=" flex flex-row justify-end">
              <Button type="default" htmlType="submit">
                {isEdit ? "Edit" : "Create"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Confirm modal"
        open={isModalConfirmOpen}
        onOk={handleOkConfirm}
        onCancel={handleCancelConfirm}
        okType="danger"
      >
        <p>Are you sure to delete this category?</p>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
