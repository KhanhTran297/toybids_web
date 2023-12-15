import UseCallApi from "../hook/useCallApi";

const { UsePost } = UseCallApi();
export const createpaymentApi = (params) => {
  const url = `/v1/payment/pay`;
  return UsePost({ url, requiredToken: true, params });
};
