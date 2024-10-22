import { z } from "zod";
import { notFound } from "next/navigation";

//#region Schemas
export const userSchema = z
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
    picture: z.string(),
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
    picture: z.string(),
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

export type User = z.infer<typeof userSchema>;

export async function getUser(
  id: string | null,
  token: string | null,
  errors: boolean = true
) {
  if (!id || !token) {
    return null;
  }

  return await fetch(`${process.env.API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    next: {
      tags: [id],
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json() as Promise<User & { id: string }>;
    } else if (errors && res.status === 404) {
      notFound();
    } else {
      return null;
    }
  });
}
