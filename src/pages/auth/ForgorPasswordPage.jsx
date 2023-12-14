import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, message } from "antd";
import SubmitButton from "../../shared/SubmitButton";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import useAccountMutation from "../../hook/useMutation/useAccountMutation";
const ForgorPasswordPage = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {
    sendOtp,
    checkOtp,
    createNewPassword,
    loadingCheckOtp,
    loadingCreateNewPassword,
    loadingSentOtp,
    successCreateNewPassword,
  } = useAccountMutation();
  const [isCheckOtp, setIsCheckOtp] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [email, setEmail] = useState("");
  const onFinish = (values) => {
    if (isCheckOtp) {
      if (isChangePassword) {
        const newValues = {
          email: email,
          newPassword: values.newPassword,
        };
        createNewPassword(newValues);
      } else {
        console.log(email);
        const newValues = {
          otp: values.otp,
          email: email,
        };
        checkOtp(newValues).then((data) => {
          if (data?.result == false) {
            message.error("incorrect code");
          } else {
            setIsChangePassword(true);
          }
          setIsChangePassword(true);
        });
      }
    } else {
      sendOtp(values).then((res) => {
        if (res.code == "ERROR-ACCOUNT-001") {
          message.error("Email does not exist");
        } else {
          setEmail(values.email);
          setIsCheckOtp(true);
        }
      });
    }
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6 bg-[#F6FBF9] pl-10 pr-10 pt-20 pb-20 rounded-2xl w-[1000px] ">
        <div className=" justify-center flex flex-col gap-6 items-center ">
          <div className=" relative w-[150px] h-[150px] rounded-full">
            <img
              src={logo}
              alt=""
              className=" absolute w-full h-full rounded-full"
            />
          </div>
          {/* <img src={logo} alt="" /> */}
          <div className=" flex items-center gap-4 self-stretch relative justify-center">
            <div
              className=" absolute left-0 flex w-10 h-10 p-[10px] flex-col justify-center items-center gap-[10px] cursor-pointer"
              onClick={() => history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_734_5257"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_734_5257)">
                  <path
                    d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z"
                    fill="#1F1F1F"
                  />
                </g>
              </svg>
            </div>

            {isCheckOtp ? (
              isChangePassword ? (
                successCreateNewPassword ? (
                  <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                    Update password successfully
                  </p>
                ) : (
                  <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                    Reset new password
                  </p>
                )
              ) : (
                <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                  We sent you a code
                </p>
              )
            ) : (
              <p className="  dark:text-white lg:dark:text-black md:dark:text-black font-roboto xl:text-[32px] xl:leading-10 xl:font-normal">
                Find your account
              </p>
            )}
          </div>
        </div>
        <div className=" self-stretch text-center font-roboto text-base font-normal text-[#1F1A1C]">
          {isCheckOtp
            ? isChangePassword
              ? "Enter a new password"
              : `We have sent you a verification code to “${email}”. Please enter the verification code to change password.`
            : " Enter the email that used to create your account. We will send you a verification code to trigger changing password process."}
        </div>
        {successCreateNewPassword ? (
          <div className=" flex gap-6 flex-col">
            <div className=" self-stretch text-center font-roboto text-base font-normal text-[#1F1A1C]">
              Your password has been updated. Please retry log in to your
              account
            </div>
            <Button
              onClick={() => navigate("/")}
              className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-[#8FD1D1] text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
            >
              Go to log-in
            </Button>
          </div>
        ) : (
          <Form
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className=" relative "
          >
            {isCheckOtp ? (
              isChangePassword ? (
                <div className="">
                  <Form.Item
                    hasFeedback
                    name="newPassword"
                    validateFirst
                    rules={[
                      {
                        min: 8,
                        message: "Password is at least 8 characters",
                      },
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="New password"
                      className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] "
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    name="confirm password"
                    dependencies={["newPassword"]} // This makes the validation depend on the 'password' field
                    validateDebounce={1000}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords do not match"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="Confirm password"
                      className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3 rounded-[12px] border-solid border-[1px] border-[#504348] "
                      size="large"
                    />
                  </Form.Item>
                </div>
              ) : (
                <Form.Item
                  hasFeedback
                  name="otp"
                  validateFirst
                  rules={[
                    {
                      required: true,
                      message: "Please input otp",
                    },
                  ]}
                  className=" relative  w-full"
                >
                  <Input
                    placeholder="Verification code"
                    className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3 rounded-[12px] border-solid border-[1px] border-[#504348] w-full"
                    size="large"
                  />
                </Form.Item>
              )
            ) : (
              <Form.Item
                hasFeedback
                name="email"
                validateFirst
                rules={[
                  {
                    type: "email",
                    message:
                      "Invalid email! Please type the email you used to create account!",
                  },
                  {
                    required: true,
                    message: "Please input your email! address",
                  },
                ]}
                className=" relative w-full"
              >
                <Input
                  prefix={
                    <div className=" flex justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <mask
                          id="mask0_903_12198"
                          style={{ maskType: "alpha" }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_903_12198)">
                          <path
                            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
                            fill="#504348"
                          />
                        </g>
                      </svg>
                    </div>
                  }
                  placeholder="Email"
                  className=" flex h-[56px] pt-2 pb-2 pl-3 pr-3  rounded-[12px] border-solid border-[1px] border-[#504348] w-full "
                  size="large"
                />
              </Form.Item>
            )}

            <Form.Item className=" mb-[0px]">
              {successCreateNewPassword ? (
                <Button
                  onClick={() => navigate("/")}
                  className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-button-submit-light text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
                >
                  Go to log-in
                </Button>
              ) : (
                <SubmitButton
                  form={form}
                  content={isCheckOtp ? "Confirm" : "Continue"}
                  isLoading={
                    isCheckOtp
                      ? isChangePassword
                        ? loadingCreateNewPassword
                        : loadingCheckOtp
                      : loadingSentOtp
                  }
                  className=" w-full xl:h-[40px] xl:pr-4 xl:pl-4 xl:rounded-[36px] bg-[#8FD1D1] text-white font-roboto text-[14px] leading-5 font-medium hover:!border-none hover:!text-white"
                />
              )}
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

ForgorPasswordPage.propTypes = {};

export default ForgorPasswordPage;
