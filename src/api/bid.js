import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet, UseEdit } = UseCallApi();
export const getBidHistoryById = (id) => {
  const url = `/v1/bid-history/list?auctionId=${id.queryKey[1]}`;
  return UseGet({ url });
};
export const createBidApi = (params) => {
  const url = `/v1/bid-history/create`;
  return UsePost({ url, params, requiredToken: true });
};
export const updateStatusApi = (params) => {
  const url = `/v1/auction/update`;
  return UseEdit({ url, params, requiredToken: true });
};
