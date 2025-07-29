import authApi from "@/apis/auth";
import { LoginBodyType } from "@/schema-validation/auth-schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ChangePasswordV2BodyType } from "@/schema-validation/account-schema";
import accountRequestApi from "@/apis/account";
export async function PUT(request: Request) {
  const body = (await request.json()) as ChangePasswordV2BodyType;
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const res = await accountRequestApi.sChangePasswordV2(body, accessToken);
    // Navigation to "/manage/dashboard" should be handled on the client side after successful login.
    const decodedAccessToken = jwt.decode(res.payload.data.accessToken) as {
      exp: number;
    };
    const decodedRefreshToken = jwt.decode(res.payload.data.refreshToken) as {
      exp: number;
    };
    cookiesStore.set("accessToken", res.payload.data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    cookiesStore.set("refreshToken", res.payload.data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedRefreshToken.exp * 1000),
    });

    return Response.json(res.payload);
  } catch (error) {
    console.error("Error during login:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
