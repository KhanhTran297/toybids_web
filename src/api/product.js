import UseCallApi from "../hook/useCallApi";

const { UseGet } = UseCallApi();
export const getListProduct = (params) => {
  const url = "/v1/product/list";
  return UseGet({ url, params, requiredToken: true });
};
