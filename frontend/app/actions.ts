"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function onLogin(id: string) {
  revalidateTag(id);
  redirect("/");
}

export async function onLogout(id?: string) {
  if (id) revalidateTag(id);
  redirect("/login");
}
