import http from "@/lib/http";
import {
  AccountResType,
  ChangePasswordBodyType,
  ChangePasswordV2ResType,
  UpdateMeBodyType,
} from "@/schema-validation/account-schema";

const accountRequestApi = {
  me: () => http.get<AccountResType>("/accounts/me"),
  updateMe: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),
  changePassword: (body: ChangePasswordBodyType) =>
    http.put<AccountResType>("/accounts/change-password", body),
  sChangePasswordV2: (body: ChangePasswordBodyType, accessToken: string) =>
    http.put<ChangePasswordV2ResType>("/accounts/change-password-v2", body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  changePasswordV2: (body: ChangePasswordBodyType) =>
    http.put<ChangePasswordV2ResType>(
      "/api/accounts/change-password-v2",
      body,
      {
        baseUrl: "",
      }
    ),
};
export default accountRequestApi;
