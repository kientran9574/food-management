import authApi from "@/apis/auth";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;
  cookiesStore.delete("accessToken");
  cookiesStore.delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return new Response("Not accessToken and refreshToken", { status: 200 });
  }
  try {
    const res = await authApi.sLogout({
      accessToken,
      refreshToken,
    });
    if (!res.payload) {
      return new Response("Logout failed", { status: res.status });
    }
    return Response.json(res.payload);
  } catch (error) {
    console.error("Error during logout:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
