import { z } from "zod";
import { notFound } from "next/navigation";
import Unauthorized from "@/errors/Unauthorized";
import Unexpected from "@/errors/Unexpected";

//#region Schemas
export const userCreateSchema = z
  .object({
    name: z
      .string()
      .min(1, "É necessário informar um nome!")
      .min(8, "Nome pequeno demais!")
      .max(90, "Nome muito grande!"),
    email: z
      .string()
      .min(1, "É necessário informar um e-mail!")
      .email("Formato inválido de e-mail!")
      .max(80, "E-mail grande demais!"),
    phone: z
      .string()
      .min(1, "É necessário informar um telefone!")
      .regex(/^\d+$/gm, "Utilize apenas números!")
      .regex(/^(\d{2}[9]?\d{8}|\d{10})$/g, "Telefone inválido!"),
    contact: z.enum(["NONE", "BOTH", "EMAIL", "PHONE"]),
    picture: z.optional(z.string()),
    whatsapp: z.boolean(),
    password: z
      .string()
      .min(1, "É necessário informar uma senha!")
      .max(24, "Senha grande demais!")
      .min(8, "Senha pequena demais!"),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    { message: "Senhas não coincidem!", path: ["passwordConfirmation"] }
  );

export const userUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, "É necessário informar um nome!")
      .min(8, "Nome pequeno demais!")
      .max(90, "Nome muito grande!"),
    email: z
      .string()
      .min(1, "É necessário informar um e-mail!")
      .email("Formato inválido de e-mail!")
      .max(80, "E-mail grande demais!"),
    phone: z
      .string()
      .min(1, "É necessário informar um telefone!")
      .regex(/^\d+$/gm, "Utilize apenas números!")
      .regex(/^(\d{2}[9]?\d{8}|\d{10})$/g, "Telefone inválido!"),
    contact: z.enum(["NONE", "BOTH", "EMAIL", "PHONE"]),
    picture: z.string().optional(),
    whatsapp: z.boolean(),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    { message: "Senhas não coincidem!", path: ["passwordConfirmation"] }
  );
//#endregion

//#region Types
export type CreateUserData = z.infer<typeof userCreateSchema>;
export type UpdateUserData = z.infer<typeof userUpdateSchema>;

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  contact: "NONE" | "BOTH" | "EMAIL" | "PHONE";
  picture?: string;
  whatsapp: boolean;
  donated: number;
  recovered: number;
  finds: number;
  updatedAt: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  contact: "NONE" | "BOTH" | "EMAIL" | "PHONE";
  picture?: string;
  whatsapp: boolean;
  donated: number;
  recovered: number;
  finds: number;
  updatedAt: string;
};

export type UsersRank = {
  byFinds: PublicUser[];
  byRecovereds: PublicUser[];
  byDonateds: PublicUser[];
};
//#endregion

export async function getUser(id: string | null, token: string | null) {
  if (!id) notFound();
  else if (!token) throw new Unauthorized();
  return await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    // cache: "default",
    // next: {
    //   tags: [id],
    // },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<User>;
    } else if (res.status === 404) {
      notFound();
    } else if (res.status === 401) {
      throw new Unauthorized();
    } else {
      throw new Unexpected(res.status.toString());
    }
  });
}

export async function getPublicUser(id: string | null) {
  if (!id) notFound();
  return await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    // cache: "default",
    // next: {
    //   tags: [id],
    // },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<PublicUser>;
    } else if (res.status === 404) {
      notFound();
    } else {
      throw new Unexpected(res.status.toString());
    }
  });
}

export async function getUsersRank() {
  return await fetch(`${process.env.API_URL}/users/rank`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "default",
    // next: {
    //   tags: ["rank"],
    // },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<UsersRank>;
    } else {
      throw new Unexpected(res.status.toString());
    }
  });
}
