"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function onUpdateItem(id: number) {
  if (id) revalidateTag(`item-${id}`);
  redirect(id ? "/items/" + id : "/");
}

export async function onCreateItem(id: string) {
  redirect(id ? "/users/" + id : "/");
}

export async function onUpdateUser(id: string) {
  if (id) revalidateTag(id);
  redirect(id ? "/users/" + id : "/");
}

export async function onLogin(id: string) {
  if (id) revalidateTag(id);
  redirect("/");
}

export async function onLogout(id?: string) {
  if (id) revalidateTag(id);
  redirect("/login");
}
