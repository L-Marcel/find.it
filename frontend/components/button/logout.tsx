"use client";

import useAuth from "@/context/auth";
import Button from ".";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useIsLoading } from "@/context/loading";

export default function LogoutButton() {
  const loading = useIsLoading();
  const { logout } = useAuth();

  return (
    <Button
      disabled={loading}
      onClick={logout}
      icon={SignOut}
      theme="default-fill"
    />
  );
}
