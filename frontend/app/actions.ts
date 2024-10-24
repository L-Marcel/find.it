"use server";

import { revalidateTag } from "next/cache";

export async function onUpdateItem(id: number) {
  if (id) revalidateTag(`item-${id}`);
  return Response.json({ success: true });
}

export async function onUpdateUser(id: string) {
  if (id) revalidateTag(id);
  return Response.json({ success: true });
}

export async function onLogin(id: string) {
  if (id) revalidateTag(id);
  return Response.json({ success: true });
}

export async function onLogout(id?: string) {
  if (id) revalidateTag(id);
  return Response.json({ success: true });
}
