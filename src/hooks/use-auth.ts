// export const useloginMutation = () => {
//   const queryClient = useQueryClient();
//   const { mutateAsync, isPending } = useMutation({
//     mutationFn: (body: LoginBodyType) => authApi.login(body),
//     onSuccess: (data) => {
//       queryClient.setQueryData(["user"], data.user);
//       queryClient.setQueryData(["accessToken"], data.accessToken);
//       queryClient.setQueryData(["refreshToken"], data.refreshToken);
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });

//   return { mutateAsync, isPending };
// }