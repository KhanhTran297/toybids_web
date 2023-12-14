import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet } = UseCallApi();
export const getBidHistoryById = (id) => {
  const url = `/v1/bid-history/list?auctionId=${id.queryKey[1]}`;
  return UseGet({ url });
};
