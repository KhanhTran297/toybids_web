import UseCallApi from "../hook/useCallApi";

const { UsePost, UseEdit } = UseCallApi();
export const createTransactionApi = (params) => {
  const url = `/v1/transaction/create`;
  return UsePost({ url, requiredToken: true, params });
};
export const sendMailApi = (params) => {
  const url = `/v1/transaction/success`;
  return UseEdit({ url, requiredToken: true, params });
};
