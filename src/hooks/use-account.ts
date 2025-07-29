import accountRequestApi from "@/apis/account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccountQuery = () => {
  return useQuery({
    queryKey: ["account-profile"],
    queryFn: accountRequestApi.me,
    staleTime: 1000 * 60 * 3, // 3 minutes - best practice for account data
    retry: false,
  });
};
export const useUpdateAccountMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountRequestApi.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-profile"] });
    },
  });
};
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: accountRequestApi.changePasswordV2,
  });
};
