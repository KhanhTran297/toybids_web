import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet, UseDelete, UseEdit } = UseCallApi();
export const getListCategory = (params) => {
  const url = "/v1/category/list?kind=1";
  return UseGet({ url, params, requiredToken: true });
};
export const deleteCategoryApi = (id) => {
  const url = `/v1/category/delete/${id}`;
  return UseDelete({ url, requiredToken: true });
};
export const editCategoryApi = (params) => {
  const url = `/v1/category/update`;
  return UseEdit({ url, params, requiredToken: true });
};
export const createCategoryApi = (params) => {
  const url = `/v1/category/create`;
  return UsePost({ url, params, requiredToken: true });
};
