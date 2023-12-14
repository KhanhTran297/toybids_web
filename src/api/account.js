import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet } = UseCallApi();
export const getListAccount = (params) => {
  const url = "/v1/account/list";
  return UseGet({ url, params });
};
