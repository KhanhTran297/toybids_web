import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "../../api/category";
import { message } from "antd";

function useCategoryMutation() {
  const queryClient = useQueryClient();
  const { mutateAsync: createCategory } = useMutation({
    mutationKey: ["creatCategory"],
    mutationFn: createCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["listCategory"]);
      message.success("Create category successfully");
    },
  });

  return { createCategory };
}
export default useCategoryMutation;
