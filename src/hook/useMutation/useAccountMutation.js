import { useMutation } from "@tanstack/react-query";
import {
  checkOtpApi,
  createNewPasswordApi,
  sentOtpApi,
} from "../../api/account";

function useAccountMutation() {
  const { mutateAsync: sendOtp, isLoading: loadingSentOtp } = useMutation({
    mutationFn: sentOtpApi,
    onSuccess: () => {},
  });
  const { mutateAsync: checkOtp, isLoading: loadingCheckOtp } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: () => {},
  });
  const {
    mutateAsync: createNewPassword,
    isLoading: loadingCreateNewPassword,
    isSuccess: successCreateNewPassword,
  } = useMutation({
    mutationFn: createNewPasswordApi,
    onSuccess: () => {},
  });
  return {
    sendOtp,
    loadingSentOtp,
    checkOtp,
    loadingCheckOtp,
    createNewPassword,
    loadingCreateNewPassword,
    successCreateNewPassword,
  };
}
export default useAccountMutation;
