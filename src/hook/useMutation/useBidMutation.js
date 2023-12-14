import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "../../api/category";
import { message } from "antd";
import { createBidApi } from "../../api/bid";

function useBidMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: createBid } = useMutation({
    mutationKey: ["creatBid"],
    mutationFn: createBidApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["bidHistory"]);
      message.success("Create bid successfully");
    },
  });

  return { createBid };
}
export default useBidMutation;
