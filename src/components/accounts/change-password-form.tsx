"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schema-validation/account-schema";
import { BorderBeam } from "../magicui/border-beam";
import { useChangePasswordMutation } from "@/hooks/use-account";
import { toast } from "sonner";
import {
  handleErrorApi,
  setAccessTokenLocalStorage,
  setRefreshTokenLocalStorage,
} from "@/lib/utils";
import { set } from "zod";

export default function ChangePasswordForm() {
  const changePassword = useChangePasswordMutation();
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: ChangePasswordBodyType) => {
    try {
      const res = await changePassword.mutateAsync(values);
      console.log("🚀 ~ onSubmit ~ res:", res);
      setAccessTokenLocalStorage(res.payload.data.accessToken);
      setRefreshTokenLocalStorage(res.payload.data.refreshToken);
      toast.success("Change password successfully", {
        position: "top-right",
        style: {
          background: "#4ade80",
          color: "#fff",
          fontWeight: "semibold",
          fontSize: "16px",
        },
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid auto-rows-max items-start gap-4 md:gap-8"
      >
        <Card
          className="overflow-hidden relative bg-[#141414]"
          x-chunk="dashboard-07-chunk-4"
        >
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="oldPassword">Mật khẩu cũ</Label>
                      <Input
                        id="oldPassword"
                        autoComplete="current-password"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="password">Mật khẩu mới</Label>
                      <Input
                        id="password"
                        autoComplete="new-password"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="confirmPassword">
                        Nhập lại mật khẩu mới
                      </Label>
                      <Input
                        id="confirmPassword"
                        autoComplete="new-password"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className=" items-center gap-2 md:ml-auto flex">
                <Button variant="outline" size="sm">
                  Hủy
                </Button>
                <Button size="sm">Lưu thông tin</Button>
              </div>
            </div>
            <BorderBeam duration={8} size={100} />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
