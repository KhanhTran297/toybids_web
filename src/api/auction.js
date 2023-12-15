import UseCallApi from "../hook/useCallApi";

const { UsePost, UseGet } = UseCallApi();
export const getListUpcomingAuctionApi = (time) => {
  const url = `/v1/auction/list-client?status=1&fromBidTime=${time.queryKey[1]}`;
  return UseGet({ url });
};
export const getListAuctioningApi = (time) => {
  const url = `/v1/auction/list-client?status=1&now=${time.queryKey[1]}`;
  return UseGet({ url });
};
export const getListAuctionWinApi = () => {
  const url = `/v1/auction/list-by-winner`;
  return UseGet({ url, requiredToken: true });
};
export const getAuctionByIdApi = (id) => {
  const url = `/v1/auction/get/${id}`;
  return UseGet({ url, requiredToken: true });
};
