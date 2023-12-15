import UseCallApi from "../hook/useCallApi";

const { UsePost } = UseCallApi();
export const createTransactionApi = (params) => {
  const url = `/v1/transaction/create`;
  return UsePost({ url, requiredToken: true, params });
};
