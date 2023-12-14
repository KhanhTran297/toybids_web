import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet, UseEdit } = UseCallApi();
export const getListAccount = (params) => {
  const url = "/v1/account/list";
  return UseGet({ url, params, requiredToken: true });
};
//sendOtp
export const sentOtpApi = (params) => {
  const url = "/v1/account/send-otp-code";
  return UsePost({ url, params });
};
//checkOtp
export const checkOtpApi = (params) => {
  const url = "/v1/account/check-otp-code";
  return UseEdit({ url, params });
};
//createNewPass
export const createNewPasswordApi = (params) => {
  const url = "/v1/account/change-password-forgot";
  return UseEdit({ url, params });
};
