"use server";

import {  revalidateTag } from "next/cache";

export async function onUpdateItem(id?: number) {
  if (id) revalidateTag(`item-${id}`);
  revalidateTag("rank");
}

export async function onUpdateUser(id: string) {
  if (id) revalidateTag(id);
  revalidateTag("rank");
}

export async function onLogin(id: string) {
  if (id) revalidateTag(id);
}

export async function onLogout(id?: string) {
  if (id) revalidateTag(id);
}
