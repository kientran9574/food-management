"use client";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShinyButton } from "@/components/magicui/shiny-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schema-validation/auth-schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { handleErrorApi } from "@/lib/utils";
const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLoginMutation();
  const onSubmit = async (data: LoginBodyType) => {
    if (loginMutation.isPending) return toast.info("Logging in...");
    try {
      await loginMutation.mutateAsync(data);
      toast.success("Login successful!");
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    }
  };
  return (
    <Card className="relative w-[350px] overflow-hidden -top-60 dark:bg-[#0a0a0a] shadow-lg">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormControl>
                  <div className="flex flex-col space-y-1.5">
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormControl>
                  <div className="flex flex-col space-y-1.5">
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              )}
            />
            <div className="flex justify-between">
              <ShinyButton className="cursor-pointer bg-[#0a0a0a] dark:bg-[#ffffff] ">
                <span className="text-white dark:text-[#0a0a0a]/90 dark:font-medium ">
                  Oauth 2.0
                </span>
              </ShinyButton>
              <ShinyButton>
                <span className="font-bold dark:font-semibold">Login</span>
              </ShinyButton>
            </div>
          </form>
        </Form>
        <BorderBeam duration={8} size={100} />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
