import authApi from "@/apis/auth";
import { LoginBodyType } from "@/schema-validation/auth-schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;
  console.log("🚀 ~ POST ~ body:", body);
  const cookiesStore = cookies();
  try {
    const res = await authApi.sLogin(body);
    const accessToken = res.payload.data.accessToken;
    const refreshToken = res.payload.data.refreshToken;
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodedRefreshToken = jwt.decode(refreshToken) as { exp: number };
    (await cookiesStore).set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });
    (await cookiesStore).set("refreshToken", refreshToken, {
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
