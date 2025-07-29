"use client";

import { getAccessTokenLocalStorage } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu", // underfine đăng nhập hay là chưa đăng nhập thì đều cho hiển thị
    authRequired: undefined,
  },
  {
    title: "Đơn hàng",
    href: "/orders", // đăng nhập rồi mới hiển thị
    authRequired: true,
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false, // chưa đăng nhập mới hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true, // đăng nhập rồi mới hiển thị
  },
];

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenLocalStorage()));
  }, []);
  return menuItems.map((item) => {
    if (
      (item.authRequired === false && isAuth) ||
      (item.authRequired === true && !isAuth)
    )
      return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
