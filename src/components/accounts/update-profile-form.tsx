"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UpdateMeBody,
  UpdateMeBodyType,
} from "@/schema-validation/account-schema";
import {
  useAccountQuery,
  useUpdateAccountMutation,
} from "../../hooks/use-account";
import { useRef, useState, useEffect, useMemo } from "react";
import { ShineBorder } from "../magicui/shine-border";
import { useUploadAvatarMutation } from "@/hooks/use-media";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
export default function UpdateProfileForm() {
  const avatarRefInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data, refetch } = useAccountQuery();
  const uploadAvatar = useUploadAvatarMutation();
  const updateMe = useUpdateAccountMutation();
  const form = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });
  const avatar = form.watch("avatar");
  const name = form.watch("name");

  useEffect(() => {
    const name = data?.payload.data?.name ?? "";
    const avatar = data?.payload.data?.avatar ?? "";
    if (data) {
      form.reset({
        name,
        avatar: avatar ?? undefined,
      });
    }
  }, [form, data]);
  const previewAvatar = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return avatar;
  }, [file, avatar]);
  const onSubmit = async (values: UpdateMeBodyType) => {
    try {
      let body = values;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const imageResponse = await uploadAvatar.mutateAsync(formData);
        const imageUrl = imageResponse.payload.data;
        body = {
          ...values,
          avatar: imageUrl ?? undefined,
        };
      }
      const res = await updateMe.mutateAsync(body);
      if (res.payload) {
        toast.success("Update profile successfully", {
          position: "top-right",
          style: {
            background: "#4ade80",
            color: "#fff",
            fontWeight: "semibold",
            fontSize: "16px",
          },
          duration: 2000,
        });
        refetch();
      }
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  const reset = () => {
    form.reset();
    setFile(null);
  };
  return (
    <Form {...form}>
      <form
        noValidate
        onReset={reset}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid auto-rows-max items-start gap-4 md:gap-8 "
      >
        <Card
          x-chunk="dashboard-07-chunk-0"
          className="bg-[#141414] relative  w-full overflow-hidden"
        >
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
                        <AvatarImage src={previewAvatar} />
                        <AvatarFallback className="rounded-none">
                          {name}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={avatarRefInput}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                          }
                        }}
                      />
                      <button
                        onClick={() => avatarRefInput.current?.click()}
                        className="flex cursor-pointer aspect-square w-[100px] items-center justify-center rounded-md border border-dashed"
                        type="button"
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-3">
                      <Label htmlFor="name">Tên</Label>
                      <Input
                        id="name"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className=" items-center gap-2 md:ml-auto flex">
                <Button variant="outline" size="sm" type="reset">
                  Hủy
                </Button>
                <Button size="sm" type="submit">
                  Lưu thông tin
                </Button>
              </div>
            </div>
          </CardContent>
          <ShineBorder
            duration={8}
            borderWidth={1}
            shineColor={[
              "#ffffff", // trắng
              "#cccccc", // xám sáng
              "#666666", // xám đậm
              "#000000", // đen
              "#cccccc", // xám sáng
              "#ffffff", // trắng
              // "#ffffff",
              // "#e0e0e0",
              // "#b0b0b0",
              // "#707070",
              // "#e0e0e0",
              // "#ffffff",
            ]}
          />
        </Card>
      </form>
    </Form>
  );
}
