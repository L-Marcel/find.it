"use client";

import useAuth from "@/context/auth";
import Button from ".";
import { SignOut } from "@phosphor-icons/react/dist/ssr";

export default function LogoutButton() {
  const { logout } = useAuth();

  return <Button onClick={logout} icon={SignOut} theme="default-fill" />;
}
